// ===================================================================
//  Initium³ — generateur de l'apercu (LocWeb, 2026-09-17). Node, sans
//  dependance :  node build.mjs
//
//  Organisation et rythme inspires de la reference donnee par le client
//  (grande image plein ecran, navigation centree par univers, intro
//  aeree, bande sable avec les univers, pieces signature en carrousel),
//  refaits de zero avec l'identite d'Initium³ : leur nom, leurs visuels,
//  leurs couleurs. Aucun code, texte ni element graphique repris.
//
//  Les liens sont relatifs : le site marche sous github.io comme sur
//  le futur domaine.
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';

const ICI = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const URL_SITE = 'https://shigyn.github.io/initium/';
const NOM = 'Initium³';
const PHOTOS = JSON.parse(fs.readFileSync(path.join(ICI, '_source', 'photos.json'), 'utf8'));

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const img = (r, id, alt, { grand = false, eager = false, classe = '' } = {}) => {
  const p = PHOTOS[id];
  return `<img${classe ? ` class="${classe}"` : ''} src="${r}photos/${id}${grand ? '' : '-800'}.webp" alt="${esc(alt)}" width="${p.l}" height="${p.h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};

/* ---------- le catalogue de l'apercu ----------
   Les noms sont DESCRIPTIFS, en attendant les vrais noms de modeles du
   client (seul « OLWEN » est connu). */
const UNIVERS = [
  { slug: 'exterieur', nom: 'Extérieur', titre: 'Mobilier d’extérieur',
    intro: 'Canapés, salons lounge et tables pensés pour la terrasse, le jardin et le bord de piscine. Des assises profondes, des tissus techniques et du teck massif, qui traversent les saisons.',
    couverture: 'v03',
    pieces: [
      ['v03', 'Salon d’angle sur socle teck'], ['v24', 'Canapé trois places, teck et assise noire'], ['v01', 'Canapé courbe bouclette'],
      ['v08', 'Canapé d’angle, velours sauge'], ['v37', 'Salon lounge teck et assises noires'], ['v18', 'Canapé modulable gris perle'],
      ['v26', 'Ensemble courbe et tables rondes'], ['v09', 'Table à manger et fauteuils tressés'], ['v19', 'Poufs galets bouclette'],
      ['v21', 'Canapé d’angle, terrasse urbaine'], ['v34', 'Canapé bouclette et table teck'], ['v39', 'Table de jardin et chaises tressées'],
    ] },
  { slug: 'interieur', nom: 'Intérieur', titre: 'Mobilier d’intérieur',
    intro: 'Les mêmes lignes, à l’intérieur. Des pièces conçues pour passer du salon à la terrasse sans rien perdre de leur allure : c’est tout le sens du mobilier hybride.',
    couverture: 'v16',
    pieces: [
      ['v16', 'Salon face à la mer'], ['v02', 'Canapé bouclette à accoudoirs teck'], ['v23', 'Canapé gris et table basse ronde'],
      ['v15', 'Canapé d’angle sur socle teck'], ['v11', 'Fauteuils lounge et guéridon teck'], ['v25', 'Canapé courbe et table basse teck'],
      ['v07', 'Canapé bouclette, détail accoudoir'], ['v20', 'Canapé trois places, cadre teck'],
    ] },
  { slug: 'olwen', nom: 'OLWEN', titre: 'Collection OLWEN',
    intro: 'Des modules aux formes pleines, un tissu chiné et une ligne de passepoil : OLWEN se compose en canapé, en angle ou en méridienne, dedans comme dehors.',
    couverture: 'v33',
    pieces: [
      ['v33', 'OLWEN, composition d’angle'], ['v13', 'OLWEN, canapé modulable'], ['v14', 'OLWEN, fauteuil'],
      ['v28', 'OLWEN, bord de piscine'], ['v12', 'OLWEN, module d’angle'], ['v30', 'OLWEN, fauteuil gris chiné'],
    ] },
];
const SIGNATURE = [['v20', 'Canapé cadre teck', 'Intérieur · Extérieur'], ['v11', 'Fauteuils lounge', 'Extérieur'], ['v14', 'Fauteuil OLWEN', 'Collection OLWEN'],
  ['v25', 'Canapé courbe', 'Intérieur'], ['v15', 'Canapé sur socle teck', 'Intérieur · Extérieur'], ['v07', 'Canapé bouclette', 'Intérieur']];

/* ---------- gabarit ---------- */

const MENU = UNIVERS.map((u) => ({ url: `${u.slug}/`, texte: u.nom }));

function page({ chemin, titre, description, corps, clair = false, jsonld = [] }) {
  const r = '../'.repeat(chemin.split('/').filter(Boolean).length);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(titre)}</title>
<meta name="description" content="${esc(description)}">
<!-- APERCU DE PRESENTATION (2026-09-17) : noindex tant que le site n'est pas
     livre sur le domaine du client. -->
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${URL_SITE}${chemin}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${NOM}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${URL_SITE}photos/v03.webp">
<meta name="theme-color" content="#1c1b19">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/style.css?v=1">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body class="${clair ? 'entete-clair' : ''}">
<a class="evitement" href="#contenu">Aller au contenu</a>
<header class="entete" data-entete>
  <a class="marque" href="${r}" aria-label="${NOM}, accueil">INITIUM<sup>3</sup></a>
  <nav class="nav-univers" aria-label="Univers">${MENU.map((m) => `<a href="${r}${m.url}">${m.texte}</a>`).join('')}</nav>
  <button class="burger" type="button" aria-expanded="false" aria-controls="panneau" aria-label="Ouvrir le menu"><span></span><span></span></button>
</header>
<div class="panneau" id="panneau" hidden>
  <nav aria-label="Menu">
    ${MENU.map((m) => `<a href="${r}${m.url}">${m.texte}</a>`).join('')}
    <a href="${r}showroom/">Showroom</a>
    <a href="${r}espace-pro/">Espace pro</a>
    <a href="${r}contact/">Contact</a>
  </nav>
</div>
<main id="contenu">
${corps(r)}
</main>
<footer class="pied">
  <div class="pied-grille">
    <div>
      <p class="pied-marque">INITIUM<sup>3</sup></p>
      <p class="pied-devise">Belgian house of hybrid furniture<br>design &amp; manufacturing</p>
    </div>
    <nav aria-label="Univers">${MENU.map((m) => `<a href="${r}${m.url}">${m.texte}</a>`).join('')}</nav>
    <nav aria-label="Informations"><a href="${r}showroom/">Showroom</a><a href="${r}espace-pro/">Espace pro</a><a href="${r}contact/">Contact</a></nav>
  </div>
  <p class="pied-bas">© 2026 ${NOM} · Bruxelles</p>
</footer>
<script>
  window.LOCWEB_CONFIG = {
    supabaseUrl: 'https://ibqawtgnucakzdldnitj.supabase.co',
    supabaseAnonKey: 'sb_publishable_rpLrUo4Cqnfl8zSohDqO0A_Q5Vkj2Hk',
    clientId: '',
    ga4Id: ''
  };
</script>
<script src="${r}assets/site.js?v=1" defer></script>
<script src="${r}mesure.js" defer></script>
</body>
</html>
`;
}

const tuile = (r, u) => `<a class="tuile reveler" href="${r}${u.slug}/">
  <span class="tuile-photo">${img(r, u.couverture, u.titre)}</span>
  <span class="tuile-nom">${u.nom}</span>
</a>`;

const pages = [];

/* ---------- accueil ---------- */
pages.push({
  chemin: '',
  titre: `${NOM} — Mobilier hybride intérieur & extérieur, Bruxelles`,
  description: 'Initium³, maison belge de design et de fabrication de mobilier hybride : canapés, salons lounge et collections pensés pour l’intérieur comme pour l’extérieur. Showroom près de Bruxelles.',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'FurnitureStore', name: NOM, alternateName: ['Initium3', 'Outlet Design In Out'],
    url: URL_SITE, image: `${URL_SITE}photos/v03.webp`, areaServed: 'Belgique',
    address: { '@type': 'PostalAddress', addressRegion: 'Bruxelles', addressCountry: 'BE' },
    sameAs: ['https://www.facebook.com/outletdesigninout'] }],
  corps: (r) => `
<section class="ouverture" data-ouverture>
  <div class="ouverture-images">
    ${['v03', 'v24', 'v16', 'v01'].map((id, i) => `<div class="diapo${i === 0 ? ' active' : ''}">${img(r, id, '', { grand: true, eager: i === 0 })}</div>`).join('')}
  </div>
  <div class="ouverture-voile"></div>
  <div class="ouverture-texte">
    <p class="ouverture-sur">Hybrid living · Indoor &amp; outdoor</p>
    <h1 class="ouverture-titre">Conçu pour dehors.<br>Pensé pour dedans.</h1>
  </div>
  <a class="fleche" href="#intro" aria-label="Découvrir"><span></span></a>
</section>

<section class="intro" id="intro">
  <div class="intro-grille">
    <h2 class="intro-titre reveler">Hybrid living — un mobilier qui ne choisit pas entre le salon et la terrasse.</h2>
    <div class="intro-texte reveler">
      <p class="grand">Initium³ dessine et fabrique des pièces pensées pour vivre partout : des canapés aux assises profondes, des cadres en teck massif et des tissus qui supportent le soleil comme la vie de tous les jours.</p>
      <p>Chaque modèle naît d’un même principe : la même exigence de confort et de finition, qu’il soit posé au bord d’une piscine ou au cœur d’un séjour. Une maison belge, un regard méditerranéen, et des collections qui se composent selon l’espace.</p>
      <a class="lien-trait" href="${r}showroom/">Découvrir la maison</a>
    </div>
  </div>
</section>

<section class="bande">
  <div class="bande-tete">
    <p class="bande-phrase reveler">Initium³ : la rigueur du design,<br>la liberté du dehors.</p>
    <a class="bouton reveler" href="${r}contact/">Prendre contact</a>
  </div>
  <div class="tuiles">${UNIVERS.map((u) => tuile(r, u)).join('')}</div>
</section>

<section class="plein" data-plein>
  <div class="plein-image">${img(r, 'v37', 'Salon lounge en teck face à la mer', { grand: true })}</div>
  <div class="plein-texte reveler">
    <p class="plein-sur">100 % hybrid</p>
    <p class="plein-phrase">Des tissus techniques, du teck massif et des mousses à séchage rapide : la même pièce, du printemps à l’hiver.</p>
  </div>
</section>

<section class="signature">
  <div class="signature-tete">
    <h2 class="reveler">Notre signature se lit dans chaque ligne, chaque matière.</h2>
    <p class="reveler">Des volumes généreux, des bois nobles, des coutures nettes. Nos designers dessinent en Belgique ; nos ateliers partenaires assemblent chaque pièce avec le soin d’un travail fait main.</p>
  </div>
  <div class="carrousel" data-carrousel>
    <div class="carrousel-piste">
      ${SIGNATURE.map(([id, nom, cat]) => `<figure class="piece">
        <span class="piece-photo">${img(r, id, nom)}</span>
        <figcaption><span class="piece-nom">${nom}</span><span class="piece-cat">${cat}</span></figcaption>
      </figure>`).join('')}
    </div>
    <div class="carrousel-nav">
      <button type="button" data-prec aria-label="Précédent">←</button>
      <button type="button" data-suiv aria-label="Suivant">→</button>
    </div>
  </div>
</section>

<section class="pro">
  <div class="pro-grille">
    <div class="pro-image">${img(r, 'v15', 'Canapé sur socle en teck')}</div>
    <div class="pro-texte reveler">
      <p class="plein-sur">Professionnels</p>
      <h2>Architectes, décorateurs, hôtels et restaurants</h2>
      <p>Retrouvez nos conditions et nos prix professionnels dans votre espace dédié. L’accès est personnel et vous est ouvert sur simple demande.</p>
      <div class="pro-actions">
        <a class="bouton bouton-clair" href="${r}espace-pro/">Accéder à l’espace pro</a>
        <a class="lien-trait lien-clair" href="${r}contact/">Demander un accès</a>
      </div>
    </div>
  </div>
</section>`,
});

/* ---------- univers ---------- */
for (const u of UNIVERS) {
  pages.push({
    chemin: `${u.slug}/`,
    titre: `${u.titre} — ${NOM}`,
    description: u.intro,
    corps: (r) => `
<section class="tete-univers">
  <div class="tete-univers-image">${img(r, u.couverture, u.titre, { grand: true, eager: true })}</div>
  <div class="tete-univers-voile"></div>
  <h1>${u.titre}</h1>
</section>
<section class="intro intro-univers">
  <p class="grand reveler">${u.intro}</p>
</section>
<section class="galerie">
  ${u.pieces.map(([id, nom], i) => `<figure class="galerie-piece reveler${i % 5 === 0 ? ' large' : ''}">
    <span class="piece-photo">${img(r, id, nom)}</span>
    <figcaption><span class="piece-nom">${nom}</span><a class="piece-lien" href="${r}contact/?piece=${encodeURIComponent(nom)}">Demander des informations</a></figcaption>
  </figure>`).join('')}
</section>
<section class="bande bande-simple">
  <div class="bande-tete">
    <p class="bande-phrase reveler">Envie de voir ces pièces en vrai ?</p>
    <a class="bouton reveler" href="${r}showroom/">Visiter le showroom</a>
  </div>
  <div class="tuiles">${UNIVERS.filter((x) => x !== u).map((x) => tuile(r, x)).join('')}</div>
</section>`,
  });
}

/* ---------- showroom ---------- */
pages.push({
  chemin: 'showroom/',
  titre: `Showroom — ${NOM}, Bruxelles`,
  description: 'Venez découvrir les collections Initium³ dans notre showroom, en périphérie de Bruxelles.',
  corps: (r) => `
<section class="tete-univers">
  <div class="tete-univers-image">${img(r, 'v16', 'Showroom Initium³', { grand: true, eager: true })}</div>
  <div class="tete-univers-voile"></div>
  <h1>Le showroom</h1>
</section>
<section class="intro">
  <div class="intro-grille">
    <h2 class="intro-titre reveler">Asseyez-vous, touchez les matières, composez votre salon.</h2>
    <div class="intro-texte reveler">
      <p class="grand">Nos collections intérieur et extérieur sont exposées en périphérie de Bruxelles. Venez comparer les tissus, les finitions de teck et les compositions modulables, avec les conseils de notre équipe.</p>
      <dl class="infos">
        <div><dt>Adresse</dt><dd>Périphérie de Bruxelles<br><em>adresse à compléter</em></dd></div>
        <div><dt>Horaires</dt><dd><em>à compléter</em></dd></div>
        <div><dt>Contact</dt><dd><a href="${r}contact/">Prendre rendez-vous</a></dd></div>
      </dl>
    </div>
  </div>
</section>
<section class="galerie galerie-trio">
  ${['v02', 'v23', 'v11'].map((id) => `<figure class="galerie-piece reveler"><span class="piece-photo">${img(r, id, '')}</span></figure>`).join('')}
</section>`,
});

/* ---------- espace pro ---------- */
pages.push({
  chemin: 'espace-pro/',
  titre: `Espace professionnel — ${NOM}`,
  description: 'Accès réservé aux professionnels : catalogue et prix professionnels Initium³.',
  clair: true,
  corps: (r) => `
<section class="connexion">
  <div class="connexion-image">${img(r, 'v33', 'Collection OLWEN', { grand: true, eager: true })}</div>
  <div class="connexion-carte">
    <p class="plein-sur">Espace professionnel</p>
    <h1>Catalogue &amp; prix pros</h1>
    <p>Réservé aux architectes, décorateurs, revendeurs et professionnels de l’hôtellerie. Connectez-vous avec l’accès qui vous a été transmis.</p>
    <form class="formulaire" data-apercu>
      <label>E-mail<input type="email" name="email" autocomplete="email" required></label>
      <label>Mot de passe<input type="password" name="mdp" autocomplete="current-password" required></label>
      <button class="bouton" type="submit">Se connecter</button>
      <p class="note" hidden data-note>Aperçu : l’espace pro sera activé à la mise en ligne du site.</p>
    </form>
    <p class="petit">Pas encore d’accès ? <a href="${r}contact/?objet=acces-pro">Faire une demande</a></p>
  </div>
</section>`,
});

/* ---------- contact ---------- */
pages.push({
  chemin: 'contact/',
  titre: `Contact — ${NOM}`,
  description: 'Une question sur une pièce, un projet professionnel, une visite du showroom : contactez Initium³.',
  clair: true,
  corps: (r) => `
<section class="contact">
  <div class="contact-texte">
    <p class="plein-sur">Contact</p>
    <h1>Parlons de votre projet</h1>
    <p class="grand">Une pièce vous intéresse, vous aménagez une terrasse, un hôtel ou un restaurant, ou vous souhaitez un accès professionnel : écrivez-nous, nous revenons vers vous rapidement.</p>
    <p><a class="lien-trait" href="https://www.facebook.com/outletdesigninout" rel="noopener">Suivre Initium³ sur Facebook</a></p>
  </div>
  <form class="formulaire" data-apercu data-contact>
    <label>Nom<input name="nom" autocomplete="name" required></label>
    <label>E-mail<input type="email" name="email" autocomplete="email" required></label>
    <label>Vous êtes
      <select name="profil"><option>Particulier</option><option>Professionnel</option></select>
    </label>
    <label>Message<textarea name="message" rows="6" required data-message></textarea></label>
    <button class="bouton" type="submit">Envoyer</button>
    <p class="note" hidden data-note>Aperçu : le formulaire sera relié à votre boîte mail à la mise en ligne.</p>
  </form>
</section>`,
});

/* ---------- ecriture ---------- */
for (const p of pages) {
  fs.mkdirSync(path.join(ICI, p.chemin), { recursive: true });
  fs.writeFileSync(path.join(ICI, p.chemin, 'index.html'), page(p));
}
fs.writeFileSync(path.join(ICI, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${URL_SITE}sitemap.xml\n`);
fs.writeFileSync(path.join(ICI, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${URL_SITE}${p.chemin}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(pages.length, 'pages');
