// Initium³ — l'espace professionnel (LocWeb, 2026-10-28).
// Sans code : les deux formulaires (se connecter, demander un acces).
// Avec un code valide : le catalogue complet avec les prix pro, et une
// demande de commande envoyee a Initium³ (fonction in-pro).
(function () {
  'use strict';
  var T = window.IN_PRO || {};
  var CFG = window.LOCWEB_CONFIG || {};
  var FN = CFG.supabaseUrl + '/functions/v1/in-pro';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var prix = function (c) { return (c / 100).toLocaleString(T.langue === 'en' ? 'en-GB' : T.langue === 'nl' ? 'nl-BE' : 'fr-BE', { style: 'currency', currency: 'EUR' }); };
  var lire = function (k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  var ecrire = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  var session = lire('in-pro'), panier = lire('in-pro-panier') || [], produits = [], filtre = '';

  // Les refus du serveur sont des codes courts, traduits ici.
  var MESSAGES = { code: T.codeFaux, trop: T.trop, champs: T.champs };
  function appel(action, extra) {
    return fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign({ action: action, jeton: session && session.jeton, langue: T.langue }, extra || {})) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 401 && action !== 'connexion') { sortir(); }
        if (!r.ok) throw new Error(MESSAGES[j.refus] || j.refus || T.erreur);
        return j;
      }); });
  }

  function accueil(visible) {
    document.querySelectorAll('[data-pro-accueil]').forEach(function (e) { e.hidden = !visible; });
    $('[data-pro-catalogue]').hidden = visible;
  }
  function sortir() {
    session = null; try { localStorage.removeItem('in-pro'); } catch (e) {}
    accueil(true);
  }
  function entrer(j) {
    session = { jeton: j.jeton, societe: j.societe }; ecrire('in-pro', session);
    charger();
  }

  /* ---------- sans code : se connecter, demander un acces ---------- */
  var fCode = $('[data-pro-code]'), fDemande = $('[data-pro-demande]');
  fCode.addEventListener('submit', function (e) {
    e.preventDefault();
    var note = $('[data-note]', fCode), b = $('button', fCode);
    b.disabled = true; note.hidden = true;
    appel('connexion', { code: fCode.code.value }).then(entrer)
      .catch(function (x) { note.textContent = x.message; note.hidden = false; })
      .then(function () { b.disabled = false; });
  });
  fDemande.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!fDemande.reportValidity()) return;
    var note = $('[data-note]', fDemande), b = $('button', fDemande), d = {};
    ['societe', 'numero', 'nom', 'telephone', 'email', 'activite', 'message'].forEach(function (k) { d[k] = fDemande[k] ? fDemande[k].value : ''; });
    b.disabled = true; note.hidden = true;
    appel('demande', d).then(function (j) {
      if (j.code) {
        note.innerHTML = '<p>' + esc(T.codeOk) + '</p><p class="pro-code">' + esc(j.code.slice(0, 4) + ' ' + j.code.slice(4)) + '</p><p>' + esc(T.codeGarder) + '</p>' +
          '<button type="button" class="bouton" data-voir>' + esc(T.voirCatalogue) + '</button>';
        $('[data-voir]', note).addEventListener('click', function () { entrer(j); });
      } else {
        note.textContent = T.attente; fDemande.reset();
      }
      note.hidden = false;
    }).catch(function (x) { note.textContent = x.message; note.hidden = false; })
      .then(function () { b.disabled = false; });
  });

  /* ---------- avec un code : le catalogue ---------- */
  var zone = $('[data-pro-catalogue]');
  function charger() {
    accueil(false);
    zone.innerHTML = '<p class="pro-attente">…</p>';
    appel('catalogue').then(function (j) {
      produits = j.produits || []; session.societe = j.societe; ecrire('in-pro', session);
      panier = panier.filter(function (l) { return produits.some(function (p) { return p.id === l.id; }); });
      dessiner();
    }).catch(function (x) { if (session) zone.innerHTML = '<p class="pro-attente">' + esc(x.message) + '</p>'; });
  }

  function dessiner() {
    zone.innerHTML =
      '<div class="pro-tete"><p>' + esc(T.bonjour) + ' <b>' + esc(session.societe) + '</b> · <button type="button" class="pro-lien" data-sortir>' + esc(T.sortir) + '</button></p>' +
        '<input type="search" class="pro-recherche" placeholder="' + esc(T.chercher) + '" data-chercher value="' + esc(filtre) + '"></div>' +
      '<div class="pro-grille-produits" data-grille></div>' +
      '<button type="button" class="pro-barre" data-ouvrir hidden></button>';
    grille();
    majBarre();
  }

  function grille() {
    var q = filtre.toLowerCase(), l = produits.filter(function (p) { return !q || (p.nom + ' ' + p.details + ' ' + p.reference).toLowerCase().indexOf(q) !== -1; });
    $('[data-grille]').innerHTML = l.length ? l.map(function (p) {
      var dans = panier.some(function (x) { return x.id === p.id; });
      return '<article class="pro-fiche">' +
        '<div class="pro-photo">' + (p.photos[0] ? '<img src="' + esc(p.photos[0]) + '" alt="' + esc(p.nom) + '" loading="lazy" data-principale>' : '') + '</div>' +
        (p.photos.length > 1 ? '<div class="pro-vignettes">' + p.photos.map(function (u, i) { return '<button type="button" data-vignette="' + esc(u) + '"' + (i ? '' : ' class="on"') + '><img src="' + esc(u) + '" alt="" loading="lazy"></button>'; }).join('') + '</div>' : '') +
        '<h3>' + esc(p.nom) + '</h3>' +
        (p.details ? '<p class="pro-details">' + esc(p.details) + '</p>' : '') +
        (p.reference ? '<p class="pro-ref">' + esc(T.ref) + ' ' + esc(p.reference) + '</p>' : '') +
        '<div class="pro-prix">' + (p.prix_pro_cents != null
          ? (p.prix_public_cents ? '<span><small>' + esc(T.public) + '</small><s>' + prix(p.prix_public_cents) + '</s></span>' : '') + '<span><small>' + esc(T.pro) + '</small><b>' + prix(p.prix_pro_cents) + '</b></span>'
          : '<span><b>' + esc(T.surDemande) + '</b></span>') + '</div>' +
        '<div class="pro-ajout"><label><span class="sr">' + esc(T.qte) + '</span><input type="number" min="1" max="999" value="1" data-qte></label>' +
          '<button type="button" class="bouton" data-ajouter="' + p.id + '">' + esc(dans ? T.ajoute + ' ✓' : T.ajouter) + '</button></div>' +
      '</article>';
    }).join('') : '<p class="pro-attente">' + esc(T.aucun) + '</p>';
  }

  function majBarre() {
    var b = $('[data-ouvrir]'); if (!b) return;
    var n = panier.reduce(function (t, l) { return t + l.qte; }, 0);
    b.hidden = !n;
    b.textContent = T.demande + ' · ' + n + ' ' + T.articles;
  }

  function ouvrirDemande() {
    var total = 0;
    var lignes = panier.map(function (l, i) {
      var p = produits.filter(function (x) { return x.id === l.id; })[0]; if (!p) return '';
      if (p.prix_pro_cents != null) total += p.prix_pro_cents * l.qte;
      return '<li><span>' + l.qte + ' × ' + esc(p.nom) + (p.reference ? ' <small>' + esc(p.reference) + '</small>' : '') + '</span>' +
        '<span>' + (p.prix_pro_cents != null ? prix(p.prix_pro_cents * l.qte) : esc(T.surDemande)) + ' <button type="button" class="pro-lien" data-retirer="' + i + '">' + esc(T.retirer) + '</button></span></li>';
    }).join('');
    var fond = document.createElement('div'); fond.className = 'pro-fond';
    fond.innerHTML = '<div class="pro-panneau" role="dialog" aria-modal="true" aria-label="' + esc(T.demande) + '">' +
      '<div class="pro-panneau-tete"><h2>' + esc(T.demande) + '</h2><button type="button" class="pro-lien" data-fermer>' + esc(T.fermer) + '</button></div>' +
      (panier.length ? '<ul class="pro-lignes">' + lignes + '</ul><p class="pro-total"><span>' + esc(T.total) + '</span><b>' + prix(total) + '</b></p>' +
        '<form class="formulaire" data-envoyer><label>' + esc(T.message) + '<textarea name="message" rows="3"></textarea></label><button class="bouton" type="submit">' + esc(T.envoyer) + '</button><p class="note" hidden data-note></p></form>'
        : '<p>' + esc(T.vide) + '</p>') + '</div>';
    document.body.appendChild(fond);
    var fermer = function () { fond.remove(); };
    fond.addEventListener('click', function (e) {
      if (e.target === fond || e.target.closest('[data-fermer]')) { fermer(); return; }
      var r = e.target.closest('[data-retirer]');
      if (r) { panier.splice(+r.getAttribute('data-retirer'), 1); ecrire('in-pro-panier', panier); fermer(); grille(); majBarre(); if (panier.length) ouvrirDemande(); }
    });
    var f = $('[data-envoyer]', fond);
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = $('button', f), note = $('[data-note]', f); b.disabled = true;
      appel('commande', { lignes: panier, message: f.message.value }).then(function () {
        panier = []; ecrire('in-pro-panier', panier); grille(); majBarre();
        $('.pro-panneau', fond).innerHTML = '<div class="pro-panneau-tete"><h2>' + esc(T.demande) + '</h2><button type="button" class="pro-lien" data-fermer>' + esc(T.fermer) + '</button></div><p>' + esc(T.envoyee) + '</p>';
      }).catch(function (x) { b.disabled = false; note.textContent = x.message; note.hidden = false; });
    });
  }

  zone.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('[data-sortir]')) { sortir(); return; }
    if (t.closest('[data-ouvrir]')) { ouvrirDemande(); return; }
    var v = t.closest('[data-vignette]');
    if (v) {
      var fiche = v.closest('.pro-fiche');
      $('[data-principale]', fiche).src = v.getAttribute('data-vignette');
      fiche.querySelectorAll('[data-vignette]').forEach(function (x) { x.classList.toggle('on', x === v); });
      return;
    }
    var a = t.closest('[data-ajouter]');
    if (a) {
      var id = a.getAttribute('data-ajouter'), qte = Math.max(1, Math.min(999, parseInt($('[data-qte]', a.parentNode).value, 10) || 1));
      var l = panier.filter(function (x) { return x.id === id; })[0];
      if (l) l.qte += qte; else panier.push({ id: id, qte: qte });
      ecrire('in-pro-panier', panier);
      a.textContent = T.ajoute + ' ✓';
      majBarre();
    }
  });
  zone.addEventListener('input', function (e) {
    if (e.target.matches('[data-chercher]')) { filtre = e.target.value; grille(); }
  });

  if (session && session.jeton) charger(); else accueil(true);
})();
