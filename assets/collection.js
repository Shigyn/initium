// Initium³ — la collection publique (LocWeb, 2026-11-05), sur le modele de
// gommaire.com : toutes les fiches du catalogue, photos detourees, rubriques,
// dimensions et matieres, SANS aucun prix (ils restent dans l'espace pro).
// Les fiches viennent de la base (fonction in-pro, action 'collection') :
// quand Olivier modifie le catalogue dans sa gestion, la page suit seule.
(function () {
  'use strict';
  var zone = document.querySelector('[data-collection]');
  if (!zone) return;
  var T = window.IN_COLLECTION || {};
  var C = window.LOCWEB_CONFIG || {};
  var M = window.IN_MOTS || { texte: function (t) { return String(t || ''); }, rubrique: function (r) { return r; } };
  var lg = T.langue || 'fr';
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var produits = [], rubrique = '';

  // Une seule lecture par visite (10 min) : la page ne rappelle pas le serveur a chaque clic.
  function charger() {
    try {
      var c = JSON.parse(sessionStorage.getItem('in-collection') || 'null');
      if (c && Date.now() - c.t < 600000) return Promise.resolve(c.p);
    } catch (e) {}
    return fetch(C.supabaseUrl + '/functions/v1/in-pro', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'collection' }) })
      .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      .then(function (j) {
        try { sessionStorage.setItem('in-collection', JSON.stringify({ t: Date.now(), p: j.produits || [] })); } catch (e) {}
        return j.produits || [];
      });
  }

  // « Dimensions : W39 D40 H53 » -> ['Dimensions', 'L39 P40 H53'], traduit dans la langue de la page.
  function preparer(p) {
    var lignes = String(p.details || '').split('\n').map(function (brut) {
      var l = M.texte(brut, lg), i = l.indexOf(':');
      return { dim: /^\s*Dimensions/.test(brut), cle: i > 0 ? l.slice(0, i).trim() : '', val: (i > 0 ? l.slice(i + 1) : l).trim() };
    }).filter(function (l) { return l.val; });
    var dim = lignes.filter(function (l) { return l.dim; })[0];
    return { id: p.id, nom: M.texte(p.nom, lg), rubrique: M.rubrique(p.rubrique, lg) || '', reference: p.reference || '',
      photos: p.photos || [], lignes: lignes, sous: dim ? dim.val : '' };
  }

  /* ---------- la grille ---------- */
  function dessiner() {
    var rubs = [];
    produits.forEach(function (p) { if (p.rubrique && rubs.indexOf(p.rubrique) === -1) rubs.push(p.rubrique); });
    zone.innerHTML = (rubs.length > 1 ? '<nav class="col-rubriques" aria-label="' + esc(T.categorie) + '">' +
        [''].concat(rubs).map(function (r) { return '<button type="button" data-rub="' + esc(r) + '" aria-pressed="' + (r === rubrique) + '">' + esc(r || T.tout) + '</button>'; }).join('') +
      '</nav>' : '') + '<div class="col-grille" data-grille></div>';
    grille();
  }
  function grille() {
    var l = produits.filter(function (p) { return !rubrique || p.rubrique === rubrique; });
    zone.querySelector('[data-grille]').innerHTML = l.map(function (p) {
      return '<a class="col-carte" href="#p-' + esc(p.id) + '" data-fiche="' + esc(p.id) + '">' +
        '<span class="col-photo">' + (p.photos[0] ? '<img src="' + esc(p.photos[0]) + '" alt="' + esc(p.nom) + '" loading="lazy" decoding="async">' : '') + '</span>' +
        '<span class="col-nom">' + esc(p.nom) + '</span>' +
        '<span class="col-sous">' + esc(p.sous || p.rubrique) + '</span>' +
        '<span class="col-plus" aria-hidden="true"></span>' +
      '</a>';
    }).join('');
  }

  /* ---------- la fiche d'une piece ---------- */
  var fiche = document.createElement('dialog');
  fiche.className = 'col-fiche';
  document.body.appendChild(fiche);
  function ouvrir(id) {
    var p = produits.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var demande = p.nom + (p.reference ? ' (' + T.ref + ' ' + p.reference + ')' : '');
    fiche.setAttribute('aria-label', p.nom);
    fiche.innerHTML =
      '<button type="button" class="col-fermer" data-fermer aria-label="' + esc(T.fermer) + '"></button>' +
      '<div class="col-fiche-corps">' +
        '<div class="col-galerie">' +
          '<div class="col-galerie-grande">' + (p.photos[0] ? '<img src="' + esc(p.photos[0]) + '" alt="' + esc(p.nom) + '" data-grande>' : '') + '</div>' +
          (p.photos.length > 1 ? '<div class="col-vignettes">' + p.photos.map(function (u, i) {
            return '<button type="button" data-vignette="' + esc(u) + '" aria-pressed="' + (i === 0) + '"><img src="' + esc(u) + '" alt=""></button>';
          }).join('') + '</div>' : '') +
        '</div>' +
        '<div class="col-infos">' +
          '<p class="col-fil">' + esc(T.titre) + (p.rubrique ? ' · ' + esc(p.rubrique) : '') + '</p>' +
          '<h2>' + esc(p.nom) + '</h2>' +
          '<dl class="col-carac">' +
            (p.rubrique ? '<div><dt>' + esc(T.categorie) + '</dt><dd>' + esc(p.rubrique) + '</dd></div>' : '') +
            (p.reference ? '<div><dt>' + esc(T.ref) + '</dt><dd>' + esc(p.reference) + '</dd></div>' : '') +
            p.lignes.map(function (l) { return '<div><dt>' + esc(l.cle) + '</dt><dd>' + esc(l.val) + '</dd></div>'; }).join('') +
          '</dl>' +
          '<a class="lien-maj" href="' + esc(zone.getAttribute('data-contact')) + '?piece=' + encodeURIComponent(demande) + '">' + esc(T.infos) + '</a>' +
          '<p class="col-pro-note">' + esc(T.prixPro) + ' <a href="' + esc(zone.getAttribute('data-pro')) + '">' + esc(T.espacePro) + '</a></p>' +
        '</div>' +
      '</div>';
    if (!fiche.open) fiche.showModal();
    document.body.style.overflow = 'hidden';
    try { history.replaceState(null, '', '#p-' + id); } catch (e) {}
  }
  function fermer() { if (fiche.open) fiche.close(); }
  fiche.addEventListener('close', function () {
    document.body.style.overflow = '';
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  });
  fiche.addEventListener('click', function (e) {
    if (e.target === fiche || e.target.closest('[data-fermer]')) { fermer(); return; }
    var v = e.target.closest('[data-vignette]');
    if (v) {
      fiche.querySelector('[data-grande]').src = v.getAttribute('data-vignette');
      fiche.querySelectorAll('[data-vignette]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === v)); });
    }
  });

  zone.addEventListener('click', function (e) {
    var rb = e.target.closest('[data-rub]');
    if (rb) {
      rubrique = rb.getAttribute('data-rub');
      zone.querySelectorAll('[data-rub]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === rb)); });
      grille();
      return;
    }
    var a = e.target.closest('[data-fiche]');
    if (a) { e.preventDefault(); ouvrir(a.getAttribute('data-fiche')); }
  });

  charger().then(function (liste) {
    produits = liste.map(preparer);
    if (!produits.length) { zone.innerHTML = '<p class="pro-attente">' + esc(T.erreur) + '</p>'; return; }
    dessiner();
    var m = location.hash.match(/^#p-(.+)$/);
    if (m) ouvrir(decodeURIComponent(m[1]));
  }).catch(function () {
    zone.innerHTML = '<p class="pro-attente">' + esc(T.erreur) + '</p>';
  });
})();
