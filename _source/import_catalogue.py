# Initium³ — import du catalogue Excel d'Olivier dans l'espace pro (LocWeb, 2026-10-28).
#   python -I _source/import_catalogue.py _source/olivier-2026-10-28/catalogue.xlsx
#
# Une fiche = un prix. Dans l'Excel, un ensemble (BOHO, Lungo, Calahonda...)
# porte son prix sur sa premiere ligne ; les lignes suivantes sans prix sont
# ses autres pieces : elles rejoignent la meme fiche, avec leurs photos.
# Sort les photos en webp dans photos/catalogue/ (photos produit, publiques)
# et le SQL d'import a cote de l'Excel (prix pro : jamais dans le depot).
import io, os, re, sys
import openpyxl
from PIL import Image

XLSX = sys.argv[1]
ICI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS = os.path.join(ICI, 'photos', 'catalogue')
os.makedirs(PHOTOS, exist_ok=True)

ws = openpyxl.load_workbook(XLSX, data_only=True).worksheets[0]  # data_only : la valeur des formules (prix pro)
images = {}
for im in ws._images:
    images.setdefault(im.anchor._from.row + 1, []).append(im._data())

propre = lambda v: re.sub(r'\s+', ' ', str(v or '').replace('\n', ' ')).strip()
# Un code produit (CT-34-YB, DV-O-08A-TA...) : pas de minuscule, au moins un chiffre et un tiret.
est_code = lambda s: bool(s) and not re.search(r'[a-z]', s) and re.search(r'\d', s) and '-' in s and ' ' not in s.strip()
COUPE = re.compile(r'\s(?=(W\s?\d|DIAM|Dia\s?\d|D\s?\d|\d+[*x]))', re.I)

def nom_et_dims(c, d):
    c, d = propre(c), propre(d)
    if c and not est_code(c):
        return c[:1].upper() + c[1:], d, ''
    texte = d or c
    parts = COUPE.split(texte, maxsplit=1)
    nom = parts[0].strip(' -') if parts else texte
    dims = texte[len(parts[0]):].strip() if len(parts) > 1 else ''
    nom = nom.capitalize() if nom.isupper() else nom
    return (nom or c or 'Produit').replace('Dinning', 'Dining'), dims, c if est_code(c) else ''

def cents(v):
    try: return round(float(v) * 100)
    except (TypeError, ValueError): return None

# Fautes de frappe de l'Excel, et une ligne a plusieurs codes sans nom lisible.
CORRIGE = {'Calahondalounge': 'Calahonda lounge', 'Surved center': 'Curved center', 'CALAHONDA CORNER': 'Calahonda corner', 'CALAHONDA SEATER': 'Calahonda seater', 'LUNGO 3-SEATER': 'Lungo 3-seater'}
NOM_LIGNE = {57: 'DV-R modulable (1, 2 et 3 places + pouf)', 90: 'Lampadaire solaire teck', 91: 'Lampadaire solaire teck', 92: 'Lampadaire solaire alu',
             93: 'Tapis 2 × 3 m', 94: 'Tapis 2 × 3 m', 95: 'Tapis 2 × 3 m', 97: 'Tapis 2 × 3 m', 98: 'Tapis 3 × 4 m'}

fiches, courante = [], None
for r in range(5, ws.max_row + 1):
    val = lambda col: ws[f'{col}{r}'].value
    c, d, e, f, g, h, i, k = (val(x) for x in 'CDEFGHIK')
    a_du_contenu = any(propre(x) for x in (c, d, e, f, g, h)) or cents(i)
    if a_du_contenu:
        nom, dims, ref = nom_et_dims(c, d)
        for a, b in CORRIGE.items(): nom = nom.replace(a, b)
        if r in NOM_LIGNE: nom, dims, ref = NOM_LIGNE[r], propre(d), ''
        piece = {'nom': nom, 'dims': dims, 'ref': ref, 'materiaux': propre(e), 'structure': propre(f), 'tissu': propre(g), 'cube': propre(h)}
        if cents(i) or courante is None:
            courante = {'pieces': [], 'photos': [], 'public': cents(i), 'pro': cents(k)}
            fiches.append(courante)
        courante['pieces'].append(piece)
    if courante is not None:
        for n, data in enumerate(images.get(r, []), 1):
            courante['photos'].append((r, n, data))

def ligne_details(p, seul):
    morceaux = [] if seul else [p['nom'] + ' :']
    if p['dims']: morceaux.append(p['dims'])
    for etiquette, cle in (('Matériaux', 'materiaux'), ('Structure', 'structure'), ('Tissu', 'tissu')):
        if p[cle] and p[cle] != '/': morceaux.append(f'{etiquette} : {p[cle]}')
    return ' · '.join(morceaux).replace(': ·', ':')

# Deux fiches au meme nom (meme modele, autre finition) : on ajoute la finition.
for fi in fiches:
    fi['nom'] = ' + '.join(list(dict.fromkeys(p['nom'] for p in fi['pieces']))[:3])
from collections import Counter
doublons = Counter(fi['nom'] for fi in fiches)
for fi in fiches:
    if doublons[fi['nom']] > 1:
        p0 = fi['pieces'][0]
        # La finition de la structure seulement : avec le tissu, les noms
        # depassaient deux lignes (« ... — Arte color 9666 / Andes Greystone 602.809 Light Reed »).
        finition = next((x for x in (p0['structure'], p0['tissu']) if x and x != '/'), '')
        if finition: fi['nom'] += ' — ' + finition

sql, n_photos = [], 0
q = lambda s: "$q$" + s.replace('$q$', '') + "$q$"
for idx, fi in enumerate(fiches):
    nom = fi['nom']
    details = '\n'.join(ligne_details(p, len(fi['pieces']) == 1) for p in fi['pieces'])
    refs = ' / '.join(dict.fromkeys(x for p in fi['pieces'] for x in (p['ref'], p['cube']) if x))
    chemins = []
    for r, n, data in fi['photos']:
        try:
            im = Image.open(io.BytesIO(data))
        except Exception:
            continue
        if len(data) < 2000 or im.width < 60: continue
        im = im.convert('RGBA') if im.mode in ('P', 'LA') else im
        if im.mode == 'RGBA':
            fond = Image.new('RGB', im.size, 'white'); fond.paste(im, mask=im.split()[3]); im = fond
        im = im.convert('RGB'); im.thumbnail((1400, 1400))
        fichier = f'cat-{r:03d}-{n}.webp'
        im.save(os.path.join(PHOTOS, fichier), 'WEBP', quality=82)
        chemins.append('catalogue/' + fichier); n_photos += 1
    tab = 'array[' + ','.join(q(x) for x in chemins) + ']::text[]' if chemins else "'{}'::text[]"
    pub = 'null' if fi['public'] is None else str(fi['public'])
    pro = 'null' if fi['pro'] is None else str(fi['pro'])
    sql.append(f"({(idx + 1) * 10}, {q(nom)}, {q(details)}, {q(refs)}, {pub}, {pro}, {tab})")

sortie = os.path.join(os.path.dirname(os.path.abspath(XLSX)), 'import-produits.sql')
with open(sortie, 'w', encoding='utf-8') as fh:
    fh.write('-- GENERE par _source/import_catalogue.py — contient les prix pro, jamais dans le depot.\n')
    fh.write('delete from in_produits;\n')
    fh.write('insert into in_produits (ordre, nom, details, reference, prix_public_cents, prix_pro_cents, photos) values\n')
    fh.write(',\n'.join(sql) + ';\n')
print(len(fiches), 'fiches,', n_photos, 'photos ->', sortie)
for fi in fiches:
    print(' -', fi['nom'][:70], '|', fi['public'], fi['pro'], '|', len(fi['photos']), 'ph')
