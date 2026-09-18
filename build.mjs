// ===================================================================
//  Initium³ — generateur de l'apercu (LocWeb, 2026-09-17). Node, sans
//  dependance :  node build.mjs
//
//  Mise en page calquee sur la reference choisie par le client
//  (gommaire.com) : ouverture plein ecran sans texte, intro en trois
//  colonnes decalees, bande beige avec les univers, signature avec
//  quatre pieces et une grande photo. Tout est refait : textes, visuels
//  et code sont ceux d'Initium³ ; police libre (Montserrat).
//
//  Trois langues : francais a la racine, /nl/ et /en/. Les liens sont
//  relatifs : le site marche sous github.io comme sur le futur domaine.
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';

const ICI = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const URL_SITE = 'https://shigyn.github.io/initium/';
const NOM = 'Initium³';
const PHOTOS = JSON.parse(fs.readFileSync(path.join(ICI, '_source', 'photos.json'), 'utf8'));
const LANGUES = ['fr', 'nl', 'en'];
const PREFIXE = { fr: '', nl: 'nl/', en: 'en/' };

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (r, id, alt, { grand = false, eager = false } = {}) => {
  const p = PHOTOS[id];
  return `<img src="${r}photos/${id}${grand ? '' : '-800'}.webp" alt="${esc(alt)}" width="${p.l}" height="${p.h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};

/* ---------- adresses des pages, par langue ---------- */
const SLUGS = {
  exterieur: { fr: 'exterieur', nl: 'buiten', en: 'outdoor' },
  interieur: { fr: 'interieur', nl: 'binnen', en: 'indoor' },
  olwen: { fr: 'olwen', nl: 'olwen', en: 'olwen' },
  showroom: { fr: 'showroom', nl: 'showroom', en: 'showroom' },
  pro: { fr: 'espace-pro', nl: 'professionelen', en: 'trade' },
  contact: { fr: 'contact', nl: 'contact', en: 'contact' },
};
const chemin = (lg, cle) => PREFIXE[lg] + (cle ? `${SLUGS[cle][lg]}/` : '');

/* ---------- les textes ---------- */
const T = {
  fr: {
    langue: 'Français', menu: 'Menu', fermer: 'Fermer le menu', evitement: 'Aller au contenu', decouvrir: 'Découvrir',
    univers: { exterieur: 'Extérieur', interieur: 'Intérieur', olwen: 'OLWEN' },
    liens: { showroom: 'Showroom', pro: 'Espace pro', contact: 'Contact' },
    titreSite: 'Mobilier hybride intérieur & extérieur, Bruxelles',
    descSite: 'Initium³, maison belge de design et de fabrication de mobilier hybride : canapés, salons lounge et collections pensés pour l’intérieur comme pour l’extérieur.',
    introTitre: 'Hybrid living — un mobilier conçu pour le dehors et pensé pour le dedans',
    introA: 'Initium³ dessine et fabrique des pièces pensées pour vivre partout : des canapés aux assises profondes, des cadres en teck massif et des tissus qui supportent le soleil comme la vie de tous les jours.',
    introB: 'Chaque modèle naît d’un même principe : la même exigence de confort et de finition, qu’il soit posé au bord d’une piscine ou au cœur d’un séjour. Une maison belge, un regard méditerranéen, et des collections qui se composent selon l’espace.',
    lireSuite: 'Lire la suite',
    bande: 'Initium³ : la rigueur du design, la liberté du dehors',
    contacter: 'Prendre contact',
    signatureTitre: 'Notre signature se lit dans chaque ligne, chaque matière.',
    signatureTexte: 'Des volumes généreux, des bois nobles, des coutures nettes. Nos designers dessinent en Belgique ; nos ateliers partenaires assemblent chaque pièce avec le soin d’un travail fait main. Découvrez quelques-unes de nos pièces, et laissez-vous inspirer.',
    proTitre: 'Professionnels', proTexte: 'Architectes, décorateurs, revendeurs, hôtels et restaurants : accédez à nos prix professionnels avec votre code d’accès.', proBouton: 'Espace pro',
    piedDevise: 'Belgian house of hybrid furniture design & manufacturing',
    piedMaison: 'La maison', piedCatalogues: 'Collections', droits: 'Tous droits réservés',
    demanderInfos: 'Demander des informations',
    voirShowroom: 'Envie de voir ces pièces en vrai ?', visiter: 'Visiter le showroom',
    showroomTitre: 'Le showroom', showroomAccroche: 'Asseyez-vous, touchez les matières, composez votre salon.',
    showroomTexte: 'Nos collections intérieur et extérieur sont exposées en périphérie de Bruxelles. Venez comparer les tissus, les finitions de teck et les compositions modulables, avec les conseils de notre équipe.',
    adresse: 'Adresse', horaires: 'Horaires', aCompleter: 'à compléter', rdv: 'Prendre rendez-vous', peripherie: 'Périphérie de Bruxelles',
    proPageTitre: 'Espace professionnel', proPageIntro: 'Réservé aux architectes, décorateurs, revendeurs et professionnels de l’hôtellerie. Vos prix professionnels s’affichent avec votre code d’accès, et vous pouvez nous envoyer vos demandes de commande directement depuis le catalogue.',
    code: 'Code d’accès', voirPrix: 'Voir les prix', codeNote: 'Aperçu : l’accès par code sera activé à la mise en ligne.',
    demanderCode: 'Demander un code d’accès', demanderCodeTexte: 'Remplissez ce formulaire : nous vérifions votre activité et vous envoyons votre code personnel.',
    societe: 'Société', tva: 'Numéro de TVA', nom: 'Nom', email: 'E-mail', telephone: 'Téléphone', activite: 'Activité',
    activites: ['Architecte', 'Décorateur', 'Revendeur', 'Hôtel, restaurant', 'Autre'], message: 'Message', envoyer: 'Envoyer la demande',
    formNote: 'Aperçu : le formulaire sera relié à votre boîte mail à la mise en ligne.',
    contactTitre: 'Parlons de votre projet', contactTexte: 'Une pièce vous intéresse, vous aménagez une terrasse, un hôtel ou un restaurant : écrivez-nous, nous revenons vers vous rapidement.',
    vousEtes: 'Vous êtes', particulier: 'Particulier', professionnel: 'Professionnel', suivre: 'Suivre Initium³ sur Facebook',
    infosPiece: 'Bonjour, je souhaite des informations sur : ',
  },
  nl: {
    langue: 'Nederlands', menu: 'Menu', fermer: 'Menu sluiten', evitement: 'Naar de inhoud', decouvrir: 'Ontdekken',
    univers: { exterieur: 'Buiten', interieur: 'Binnen', olwen: 'OLWEN' },
    liens: { showroom: 'Showroom', pro: 'Professionelen', contact: 'Contact' },
    titreSite: 'Hybride meubelen voor binnen & buiten, Brussel',
    descSite: 'Initium³, Belgisch huis voor het ontwerp en de productie van hybride meubelen: sofa’s, loungesets en collecties voor binnen én buiten.',
    introTitre: 'Hybrid living — meubelen ontworpen voor buiten en bedacht voor binnen',
    introA: 'Initium³ ontwerpt en maakt stukken die overal thuishoren: sofa’s met diepe zitting, frames in massief teak en stoffen die zowel de zon als het dagelijkse leven aankunnen.',
    introB: 'Elk model vertrekt vanuit hetzelfde principe: dezelfde eisen aan comfort en afwerking, of het nu naast een zwembad staat of midden in een woonkamer. Een Belgisch huis, een mediterrane blik, en collecties die zich naar de ruimte laten samenstellen.',
    lireSuite: 'Lees meer',
    bande: 'Initium³: de strengheid van design, de vrijheid van buiten',
    contacter: 'Contact opnemen',
    signatureTitre: 'Onze signatuur zit in elke lijn, elk materiaal.',
    signatureTexte: 'Royale volumes, edele houtsoorten, strakke naden. Onze ontwerpers tekenen in België; onze partnerateliers assembleren elk stuk met de zorg van handwerk. Ontdek enkele van onze stukken en laat u inspireren.',
    proTitre: 'Professionelen', proTexte: 'Architecten, decorateurs, verdelers, hotels en restaurants: bekijk onze professionele prijzen met uw toegangscode.', proBouton: 'Professionelen',
    piedDevise: 'Belgian house of hybrid furniture design & manufacturing',
    piedMaison: 'Het huis', piedCatalogues: 'Collecties', droits: 'Alle rechten voorbehouden',
    demanderInfos: 'Informatie aanvragen',
    voirShowroom: 'Deze stukken in het echt bekijken?', visiter: 'Bezoek de showroom',
    showroomTitre: 'De showroom', showroomAccroche: 'Kom zitten, voel de materialen, stel uw salon samen.',
    showroomTexte: 'Onze binnen- en buitencollecties staan opgesteld in de rand rond Brussel. Vergelijk de stoffen, de teakafwerkingen en de modulaire opstellingen, met het advies van ons team.',
    adresse: 'Adres', horaires: 'Openingsuren', aCompleter: 'aan te vullen', rdv: 'Afspraak maken', peripherie: 'Rand rond Brussel',
    proPageTitre: 'Professionele ruimte', proPageIntro: 'Voorbehouden aan architecten, decorateurs, verdelers en professionals uit de horeca. Uw professionele prijzen verschijnen met uw toegangscode, en u kunt ons uw bestelaanvragen rechtstreeks vanuit de catalogus sturen.',
    code: 'Toegangscode', voirPrix: 'Prijzen bekijken', codeNote: 'Voorvertoning: de toegang met code wordt geactiveerd bij de lancering.',
    demanderCode: 'Een toegangscode aanvragen', demanderCodeTexte: 'Vul dit formulier in: wij controleren uw activiteit en sturen u uw persoonlijke code.',
    societe: 'Bedrijf', tva: 'Btw-nummer', nom: 'Naam', email: 'E-mail', telephone: 'Telefoon', activite: 'Activiteit',
    activites: ['Architect', 'Decorateur', 'Verdeler', 'Hotel, restaurant', 'Andere'], message: 'Bericht', envoyer: 'Aanvraag versturen',
    formNote: 'Voorvertoning: het formulier wordt bij de lancering aan uw mailbox gekoppeld.',
    contactTitre: 'Laten we over uw project praten', contactTexte: 'Heeft u interesse in een stuk, richt u een terras, hotel of restaurant in? Schrijf ons, wij nemen snel contact met u op.',
    vousEtes: 'U bent', particulier: 'Particulier', professionnel: 'Professional', suivre: 'Volg Initium³ op Facebook',
    infosPiece: 'Goedendag, ik wens informatie over: ',
  },
  en: {
    langue: 'English', menu: 'Menu', fermer: 'Close menu', evitement: 'Skip to content', decouvrir: 'Discover',
    univers: { exterieur: 'Outdoor', interieur: 'Indoor', olwen: 'OLWEN' },
    liens: { showroom: 'Showroom', pro: 'Trade area', contact: 'Contact' },
    titreSite: 'Hybrid indoor & outdoor furniture, Brussels',
    descSite: 'Initium³, a Belgian house of hybrid furniture design and manufacturing: sofas, lounge sets and collections made for indoors and outdoors alike.',
    introTitre: 'Hybrid living — furniture designed for outdoors and made for indoors',
    introA: 'Initium³ designs and makes pieces meant to live anywhere: deep-seated sofas, solid teak frames and fabrics that stand up to the sun as well as to everyday life.',
    introB: 'Every model starts from the same principle: the same standard of comfort and finish, whether it sits by a pool or at the heart of a living room. A Belgian house, a Mediterranean eye, and collections that adapt to your space.',
    lireSuite: 'Read more',
    bande: 'Initium³: the rigour of design, the freedom of the outdoors',
    contacter: 'Get in touch',
    signatureTitre: 'Our signature shows in every line, every material.',
    signatureTexte: 'Generous volumes, noble woods, clean seams. Our designers draw in Belgium; our partner workshops assemble every piece with the care of handmade work. Discover a few of our pieces and be inspired.',
    proTitre: 'Trade', proTexte: 'Architects, interior designers, resellers, hotels and restaurants: access our trade prices with your access code.', proBouton: 'Trade area',
    piedDevise: 'Belgian house of hybrid furniture design & manufacturing',
    piedMaison: 'The house', piedCatalogues: 'Collections', droits: 'All rights reserved',
    demanderInfos: 'Request information',
    voirShowroom: 'Want to see these pieces in person?', visiter: 'Visit the showroom',
    showroomTitre: 'The showroom', showroomAccroche: 'Sit down, feel the materials, design your living space.',
    showroomTexte: 'Our indoor and outdoor collections are on display on the outskirts of Brussels. Compare fabrics, teak finishes and modular layouts, with advice from our team.',
    adresse: 'Address', horaires: 'Opening hours', aCompleter: 'to be completed', rdv: 'Book a visit', peripherie: 'Outskirts of Brussels',
    proPageTitre: 'Trade area', proPageIntro: 'Reserved for architects, interior designers, resellers and hospitality professionals. Your trade prices appear with your access code, and you can send us order requests directly from the catalogue.',
    code: 'Access code', voirPrix: 'See prices', codeNote: 'Preview: code access will be enabled at launch.',
    demanderCode: 'Request an access code', demanderCodeTexte: 'Fill in this form: we check your business and send you your personal code.',
    societe: 'Company', tva: 'VAT number', nom: 'Name', email: 'Email', telephone: 'Phone', activite: 'Business',
    activites: ['Architect', 'Interior designer', 'Reseller', 'Hotel, restaurant', 'Other'], message: 'Message', envoyer: 'Send request',
    formNote: 'Preview: the form will be connected to your mailbox at launch.',
    contactTitre: 'Let’s talk about your project', contactTexte: 'Interested in a piece, furnishing a terrace, a hotel or a restaurant? Write to us and we will get back to you quickly.',
    vousEtes: 'You are', particulier: 'Private customer', professionnel: 'Professional', suivre: 'Follow Initium³ on Facebook',
    infosPiece: 'Hello, I would like information about: ',
  },
};

/* ---------- les univers et les pieces (noms descriptifs en attendant les vrais) ---------- */
const N = (fr, nl, en) => ({ fr, nl, en });
const UNIVERS = [
  { cle: 'exterieur', couverture: 'v03',
    titre: N('Mobilier d’extérieur', 'Buitenmeubelen', 'Outdoor furniture'),
    intro: N('Canapés, salons lounge et tables pensés pour la terrasse, le jardin et le bord de piscine. Des assises profondes, des tissus techniques et du teck massif, qui traversent les saisons.',
      'Sofa’s, loungesets en tafels voor het terras, de tuin en de rand van het zwembad. Diepe zitting, technische stoffen en massief teak die elk seizoen doorstaan.',
      'Sofas, lounge sets and tables for the terrace, the garden and the poolside. Deep seats, technical fabrics and solid teak that last through the seasons.'),
    pieces: [
      ['v03', N('Salon d’angle sur socle teck', 'Hoeksalon op teakplint', 'Corner set on teak base')],
      ['v24', N('Canapé trois places teck', 'Driezitsbank in teak', 'Three-seater teak sofa')],
      ['v01', N('Canapé courbe bouclette', 'Gebogen sofa in bouclé', 'Curved bouclé sofa')],
      ['v08', N('Canapé d’angle sauge', 'Hoeksofa salie', 'Sage corner sofa')],
      ['v37', N('Salon lounge teck', 'Teak loungeset', 'Teak lounge set')],
      ['v18', N('Canapé modulable gris perle', 'Modulaire sofa parelgrijs', 'Pearl grey modular sofa')],
      ['v26', N('Ensemble courbe et tables rondes', 'Gebogen set met ronde tafels', 'Curved set with round tables')],
      ['v09', N('Table à manger et fauteuils tressés', 'Eettafel met gevlochten stoelen', 'Dining table and woven chairs')],
      ['v19', N('Poufs galets bouclette', 'Kiezelpoefs in bouclé', 'Bouclé pebble poufs')],
      ['v34', N('Canapé bouclette et table teck', 'Bouclé sofa en teaktafel', 'Bouclé sofa and teak table')],
      ['v21', N('Canapé d’angle terrasse', 'Hoeksofa terras', 'Terrace corner sofa')],
      ['v39', N('Table de jardin tressée', 'Gevlochten tuintafel', 'Woven garden table')],
    ] },
  { cle: 'interieur', couverture: 'v16',
    titre: N('Mobilier d’intérieur', 'Binnenmeubelen', 'Indoor furniture'),
    intro: N('Les mêmes lignes, à l’intérieur. Des pièces conçues pour passer du salon à la terrasse sans rien perdre de leur allure : c’est tout le sens du mobilier hybride.',
      'Dezelfde lijnen, binnen. Stukken die van de woonkamer naar het terras gaan zonder iets van hun uitstraling te verliezen: dat is hybride meubilair.',
      'The same lines, indoors. Pieces designed to move from the living room to the terrace without losing any of their presence: that is what hybrid furniture means.'),
    pieces: [
      ['v20', N('Canapé cadre teck', 'Sofa met teakframe', 'Teak frame sofa')],
      ['v02', N('Canapé bouclette accoudoirs teck', 'Bouclé sofa met teak armleuningen', 'Bouclé sofa with teak arms')],
      ['v11', N('Fauteuils lounge', 'Loungefauteuils', 'Lounge armchairs')],
      ['v15', N('Canapé sur socle teck', 'Sofa op teakplint', 'Sofa on teak base')],
      ['v25', N('Canapé courbe', 'Gebogen sofa', 'Curved sofa')],
      ['v23', N('Canapé gris perle', 'Parelgrijze sofa', 'Pearl grey sofa')],
      ['v07', N('Canapé bouclette', 'Bouclé sofa', 'Bouclé sofa')],
      ['v16', N('Salon face à la mer', 'Salon met zeezicht', 'Sea view living room')],
    ] },
  { cle: 'olwen', couverture: 'v33',
    titre: N('Collection OLWEN', 'Collectie OLWEN', 'OLWEN collection'),
    intro: N('Des modules aux formes pleines, un tissu chiné et une ligne de passepoil : OLWEN se compose en canapé, en angle ou en méridienne, dedans comme dehors.',
      'Modules met volle vormen, een gemêleerde stof en een lijn van passepoil: OLWEN wordt een sofa, een hoek of een méridienne, binnen zoals buiten.',
      'Full-bodied modules, a mottled fabric and a piping line: OLWEN becomes a sofa, a corner or a chaise, indoors and out.'),
    pieces: [
      ['v14', N('OLWEN fauteuil', 'OLWEN fauteuil', 'OLWEN armchair')],
      ['v13', N('OLWEN canapé modulable', 'OLWEN modulaire sofa', 'OLWEN modular sofa')],
      ['v33', N('OLWEN composition d’angle', 'OLWEN hoekopstelling', 'OLWEN corner layout')],
      ['v28', N('OLWEN bord de piscine', 'OLWEN aan het zwembad', 'OLWEN poolside')],
      ['v12', N('OLWEN module d’angle', 'OLWEN hoekmodule', 'OLWEN corner module')],
      ['v30', N('OLWEN fauteuil gris chiné', 'OLWEN fauteuil gemêleerd grijs', 'OLWEN mottled grey armchair')],
    ] },
];
const SIGNATURE = [['v20', 'interieur', N('Canapé cadre teck', 'Sofa met teakframe', 'Teak frame sofa')], ['v14', 'olwen', N('Fauteuil OLWEN', 'OLWEN fauteuil', 'OLWEN armchair')],
  ['v11', 'exterieur', N('Fauteuils lounge', 'Loungefauteuils', 'Lounge armchairs')], ['v25', 'interieur', N('Canapé courbe', 'Gebogen sofa', 'Curved sofa')]];

/* ---------- gabarit ---------- */
function page(lg, cle, { titre, description, corps, clair = false, jsonld = [] }) {
  const t = T[lg];
  const ici = chemin(lg, cle);
  const r = '../'.repeat(ici.split('/').filter(Boolean).length);
  const lien = (l, c) => r + chemin(l, c);
  const univers = ['exterieur', 'interieur', 'olwen'].map((c) => `<a href="${lien(lg, c)}">${t.univers[c]}</a>`).join('');
  const alternates = LANGUES.map((l) => `<link rel="alternate" hreflang="${l}" href="${URL_SITE}${chemin(l, cle)}">`).join('\n');
  const langues = LANGUES.map((l) => l === lg ? `<span aria-current="true">${l.toUpperCase()}</span>` : `<a href="${lien(l, cle)}" hreflang="${l}" lang="${l}" title="${T[l].langue}">${l.toUpperCase()}</a>`).join('');

  return `<!DOCTYPE html>
<html lang="${lg}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(titre)}</title>
<meta name="description" content="${esc(description)}">
<!-- APERCU DE PRESENTATION (2026-09-17) : noindex tant que le site n'est pas livre. -->
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${URL_SITE}${ici}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${URL_SITE}${chemin('fr', cle)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${NOM}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${URL_SITE}photos/v03.webp">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/style.css?v=4">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body class="${clair ? 'entete-clair' : ''}">
<a class="evitement" href="#contenu">${t.evitement}</a>
<header class="entete" data-entete>
  <a class="marque" href="${lien(lg, null)}" aria-label="${NOM}">INITIUM<sup>3</sup></a>
  <nav class="nav-univers" aria-label="${t.menu}">${univers}</nav>
  <div class="entete-droite">
    <nav class="langues" aria-label="Langue / Taal / Language">${langues}</nav>
    <button class="burger" type="button" aria-expanded="false" aria-controls="panneau" aria-label="${t.menu}" data-libelle-fermer="${t.fermer}"><span></span><span></span></button>
  </div>
</header>
<div class="panneau" id="panneau" hidden>
  <nav class="panneau-grands" aria-label="${t.menu}">${univers}</nav>
  <nav class="panneau-petits" aria-label="${t.piedMaison}">
    ${['showroom', 'pro', 'contact'].map((c) => `<a href="${lien(lg, c)}">${t.liens[c]}</a>`).join('')}
  </nav>
</div>
<main id="contenu">
${corps(r, lien)}
</main>
<footer class="pied">
  <div class="pied-grille">
    <div class="pied-marque-bloc">
      <p class="pied-marque">INITIUM<sup>3</sup></p>
      <p class="pied-devise">${t.piedDevise}</p>
    </div>
    <nav aria-label="${t.piedMaison}"><p class="pied-titre">${t.piedMaison}</p>${['showroom', 'pro', 'contact'].map((c) => `<a href="${lien(lg, c)}">${t.liens[c]}</a>`).join('')}<a href="https://www.facebook.com/outletdesigninout" rel="noopener">Facebook</a></nav>
    <nav aria-label="${t.piedCatalogues}"><p class="pied-titre">${t.piedCatalogues}</p>${univers}</nav>
    <nav aria-label="Langue"><p class="pied-titre">${t.langue}</p>${LANGUES.map((l) => `<a href="${lien(l, cle)}" hreflang="${l}">${T[l].langue}</a>`).join('')}</nav>
  </div>
  <p class="pied-bas">© ${NOM} · ${t.droits}</p>
</footer>
<script>
  window.LOCWEB_CONFIG = {
    supabaseUrl: 'https://ibqawtgnucakzdldnitj.supabase.co',
    supabaseAnonKey: 'sb_publishable_rpLrUo4Cqnfl8zSohDqO0A_Q5Vkj2Hk',
    clientId: '',
    ga4Id: ''
  };
</script>
<script src="${r}assets/site.js?v=2" defer></script>
<script src="${r}mesure.js" defer></script>
</body>
</html>
`;
}

/* ---------- blocs communs ---------- */
const tuiles = (r, lien, lg, liste) => `<div class="tuiles">${liste.map((u) => `<a class="tuile reveler" href="${lien(lg, u.cle)}">
  <span class="tuile-photo">${img(r, u.couverture, u.titre[lg])}</span>
  <span class="tuile-nom">${T[lg].univers[u.cle]}</span>
</a>`).join('')}</div>`;

const pages = [];

for (const lg of LANGUES) {
  const t = T[lg];

  /* ACCUEIL */
  pages.push([lg, null, {
    titre: `${NOM} — ${t.titreSite}`,
    description: t.descSite,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'FurnitureStore', name: NOM, alternateName: ['Initium3', 'Outlet Design In Out'],
      url: URL_SITE + PREFIXE[lg], image: `${URL_SITE}photos/v03.webp`, areaServed: 'BE',
      address: { '@type': 'PostalAddress', addressRegion: 'Bruxelles', addressCountry: 'BE' }, sameAs: ['https://www.facebook.com/outletdesigninout'] }],
    corps: (r, lien) => `
<section class="ouverture" data-ouverture>
  ${['v03', 'v24', 'v16', 'v01'].map((id, i) => `<div class="diapo${i === 0 ? ' active' : ''}">${img(r, id, '', { grand: true, eager: i === 0 })}</div>`).join('')}
  <div class="ouverture-voile"></div>
  <a class="fleche" href="#intro" aria-label="${t.decouvrir}"><span></span></a>
</section>

<section class="intro" id="intro">
  <h2 class="intro-titre reveler">${t.introTitre}</h2>
  <div class="intro-colonnes">
    <div class="intro-gauche reveler">
      <p>${t.introA}</p>
      <a class="lien-maj" href="${lien(lg, 'showroom')}">${t.lireSuite}</a>
      <figure>${img(r, 'v10', '')}</figure>
    </div>
    <div class="intro-droite reveler">
      <figure>${img(r, 'v02', '')}</figure>
      <p>${t.introB}</p>
    </div>
  </div>
</section>

<section class="bande">
  <div class="bande-tete">
    <h2 class="reveler">${t.bande}</h2>
    <a class="lien-maj reveler" href="${lien(lg, 'contact')}">${t.contacter}</a>
  </div>
  ${tuiles(r, lien, lg, UNIVERS)}
</section>

<section class="signature">
  <div class="signature-tete">
    <h2 class="reveler">${t.signatureTitre}</h2>
    <p class="reveler">${t.signatureTexte}</p>
  </div>
  <div class="signature-grille">
    <div class="signature-pieces">
      ${SIGNATURE.map(([id, c, nom]) => `<a class="piece reveler" href="${lien(lg, c)}">
        <span class="piece-photo">${img(r, id, nom[lg])}</span>
        <span class="piece-nom">${nom[lg]}</span><span class="piece-cat">${t.univers[c]}</span>
      </a>`).join('')}
    </div>
    <figure class="signature-grande reveler">${img(r, 'v37', '', { grand: true })}</figure>
  </div>
</section>

<section class="pro-bande">
  <div>
    <h2 class="reveler">${t.proTitre}</h2>
    <p class="reveler">${t.proTexte}</p>
  </div>
  <a class="lien-maj reveler" href="${lien(lg, 'pro')}">${t.proBouton}</a>
</section>`,
  }]);

  /* UNIVERS */
  for (const u of UNIVERS) {
    pages.push([lg, u.cle, {
      titre: `${u.titre[lg]} — ${NOM}`,
      description: u.intro[lg],
      corps: (r, lien) => `
<section class="tete-univers">
  <div class="tete-univers-image">${img(r, u.couverture, u.titre[lg], { grand: true, eager: true })}</div>
  <div class="tete-univers-voile"></div>
  <h1>${u.titre[lg]}</h1>
</section>
<section class="univers-intro">
  <p class="reveler">${u.intro[lg]}</p>
</section>
<section class="catalogue">
  ${u.pieces.map(([id, nom]) => `<figure class="piece reveler">
    <span class="piece-photo">${img(r, id, nom[lg])}</span>
    <figcaption><span class="piece-nom">${nom[lg]}</span><span class="piece-cat">${t.univers[u.cle]}</span>
    <a class="piece-lien" href="${lien(lg, 'contact')}?piece=${encodeURIComponent(nom[lg])}">${t.demanderInfos}</a></figcaption>
  </figure>`).join('')}
</section>
<section class="bande">
  <div class="bande-tete">
    <h2 class="reveler">${t.voirShowroom}</h2>
    <a class="lien-maj reveler" href="${lien(lg, 'showroom')}">${t.visiter}</a>
  </div>
  ${tuiles(r, lien, lg, UNIVERS.filter((x) => x !== u))}
</section>`,
    }]);
  }

  /* SHOWROOM */
  pages.push([lg, 'showroom', {
    titre: `${t.showroomTitre} — ${NOM}`,
    description: t.showroomTexte,
    corps: (r, lien) => `
<section class="tete-univers">
  <div class="tete-univers-image">${img(r, 'v16', t.showroomTitre, { grand: true, eager: true })}</div>
  <div class="tete-univers-voile"></div>
  <h1>${t.showroomTitre}</h1>
</section>
<section class="signature">
  <div class="signature-tete">
    <h2 class="reveler">${t.showroomAccroche}</h2>
    <div class="reveler">
      <p>${t.showroomTexte}</p>
      <dl class="infos">
        <div><dt>${t.adresse}</dt><dd>${t.peripherie}<br><em>${t.aCompleter}</em></dd></div>
        <div><dt>${t.horaires}</dt><dd><em>${t.aCompleter}</em></dd></div>
      </dl>
      <a class="lien-maj" href="${lien(lg, 'contact')}">${t.rdv}</a>
    </div>
  </div>
</section>`,
  }]);

  /* ESPACE PRO */
  pages.push([lg, 'pro', {
    titre: `${t.proPageTitre} — ${NOM}`,
    description: t.proPageIntro,
    clair: true,
    corps: () => `
<section class="page-texte">
  <h1>${t.proPageTitre}</h1>
  <p class="page-chapo">${t.proPageIntro}</p>
</section>
<section class="pro-grille">
  <form class="formulaire carte-code" data-apercu>
    <h2>${t.code}</h2>
    <label>${t.code}<input name="code" autocomplete="off" required></label>
    <button class="bouton" type="submit">${t.voirPrix}</button>
    <p class="note" hidden data-note>${t.codeNote}</p>
  </form>
  <form class="formulaire" data-apercu>
    <h2>${t.demanderCode}</h2>
    <p class="aide">${t.demanderCodeTexte}</p>
    <div class="deux">
      <label>${t.societe}<input name="societe" autocomplete="organization" required></label>
      <label>${t.tva}<input name="tva" placeholder="BE0123456789" required></label>
    </div>
    <div class="deux">
      <label>${t.nom}<input name="nom" autocomplete="name" required></label>
      <label>${t.telephone}<input name="telephone" type="tel" autocomplete="tel"></label>
    </div>
    <label>${t.email}<input name="email" type="email" autocomplete="email" required></label>
    <label>${t.activite}<select name="activite">${t.activites.map((a) => `<option>${a}</option>`).join('')}</select></label>
    <label>${t.message}<textarea name="message" rows="4"></textarea></label>
    <button class="bouton" type="submit">${t.envoyer}</button>
    <p class="note" hidden data-note>${t.formNote}</p>
  </form>
</section>`,
  }]);

  /* CONTACT */
  pages.push([lg, 'contact', {
    titre: `Contact — ${NOM}`,
    description: t.contactTexte,
    clair: true,
    corps: () => `
<section class="page-texte">
  <h1>${t.contactTitre}</h1>
  <p class="page-chapo">${t.contactTexte}</p>
  <a class="lien-maj" href="https://www.facebook.com/outletdesigninout" rel="noopener">${t.suivre}</a>
</section>
<section class="pro-grille">
  <div></div>
  <form class="formulaire" data-apercu data-contact data-prefixe="${esc(t.infosPiece)}">
    <div class="deux">
      <label>${t.nom}<input name="nom" autocomplete="name" required></label>
      <label>${t.email}<input type="email" name="email" autocomplete="email" required></label>
    </div>
    <label>${t.vousEtes}<select name="profil"><option>${t.particulier}</option><option>${t.professionnel}</option></select></label>
    <label>${t.message}<textarea name="message" rows="6" required data-message></textarea></label>
    <button class="bouton" type="submit">${t.envoyer}</button>
    <p class="note" hidden data-note>${t.formNote}</p>
  </form>
</section>`,
  }]);
}

/* ---------- ecriture ---------- */
for (const d of ['exterieur', 'interieur', 'olwen', 'showroom', 'espace-pro', 'contact', 'nl', 'en']) {
  fs.rmSync(path.join(ICI, d), { recursive: true, force: true });
}
for (const [lg, cle, p] of pages) {
  const ici = chemin(lg, cle);
  fs.mkdirSync(path.join(ICI, ici), { recursive: true });
  fs.writeFileSync(path.join(ICI, ici, 'index.html'), page(lg, cle, p));
}
fs.writeFileSync(path.join(ICI, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${URL_SITE}sitemap.xml\n`);
fs.writeFileSync(path.join(ICI, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([lg, cle]) => `  <url><loc>${URL_SITE}${chemin(lg, cle)}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(pages.length, 'pages');
