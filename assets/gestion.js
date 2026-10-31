// Initium³ — l'espace de gestion d'Olivier (LocWeb, 2026-10-28).
// Un code a 8 chiffres, puis quatre onglets : les acces a valider, les
// clients pro, les demandes de commande et le catalogue (fonction in-gestion).
(function () {
  'use strict';
  var CFG = window.LOCWEB_CONFIG || {};
  var FN = CFG.supabaseUrl + '/functions/v1/in-gestion';
  var app = document.getElementById('app');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var euros = function (c) { return c == null ? '—' : (c / 100).toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' }); };
  var date = function (d) { return d ? new Date(d).toLocaleString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'; };
  var jeton = null; try { jeton = localStorage.getItem('in-gestion'); } catch (e) {}
  var donnees = null, onglet = 'attente';

  function appel(action, extra) {
    return fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign({ action: action, jeton: jeton }, extra || {})) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 401 && action !== 'connexion') { sortir(); }
        if (!r.ok) throw new Error(j.refus || j.error || 'Erreur serveur');
        return j;
      }); });
  }
  function sortir() { jeton = null; try { localStorage.removeItem('in-gestion'); } catch (e) {} ecranCode(); }

  function ecranCode(msg) {
    app.innerHTML = '<form class="g-code" data-code><p class="g-marque">INITIUM<sup>3</sup></p><h1>Gestion</h1><p>Tapez votre code à 8 chiffres.</p>' +
      '<input inputmode="numeric" maxlength="9" autocomplete="off" placeholder="•••• ••••" data-champ aria-label="Code"><button class="bouton" type="submit">Entrer</button><p class="g-err">' + esc(msg || '') + '</p></form>';
    $('[data-champ]').focus();
    $('[data-code]').addEventListener('submit', function (e) {
      e.preventDefault();
      appel('connexion', { code: $('[data-champ]').value }).then(function (j) {
        jeton = j.jeton; try { localStorage.setItem('in-gestion', jeton); } catch (x) {} charger();
      }).catch(function (x) { $('.g-err').textContent = x.message; });
    });
  }

  function charger() {
    return appel('tableau').then(function (j) { donnees = j; dessiner(); }).catch(function (x) { if (jeton) alert(x.message); });
  }

  var ONGLETS = [['attente', 'Accès à valider'], ['clients', 'Clients pro'], ['demandes', 'Demandes de commande'], ['catalogue', 'Catalogue']];
  function dessiner() {
    var attente = donnees.acces.filter(function (a) { return a.statut === 'en_attente'; });
    var nonTraitees = donnees.demandes.filter(function (d) { return !d.traitee; });
    var compte = { attente: attente.length, demandes: nonTraitees.length };
    app.innerHTML = '<header class="g-tete"><p class="g-marque">INITIUM<sup>3</sup> <span>Gestion</span></p><button type="button" class="pro-lien" data-sortir>Se déconnecter</button></header>' +
      '<nav class="g-onglets">' + ONGLETS.map(function (o) {
        return '<button type="button" data-onglet="' + o[0] + '"' + (onglet === o[0] ? ' class="on"' : '') + '>' + o[1] + (compte[o[0]] ? ' <b>' + compte[o[0]] + '</b>' : '') + '</button>';
      }).join('') + '</nav><main class="g-zone" data-zone></main>';
    var z = $('[data-zone]');
    if (onglet === 'attente') z.innerHTML = vueAttente(attente);
    if (onglet === 'clients') z.innerHTML = vueClients();
    if (onglet === 'demandes') z.innerHTML = vueDemandes();
    if (onglet === 'catalogue') z.innerHTML = vueCatalogue();
  }

  /* ---------- acces ---------- */
  function viesTexte(a) {
    if (!a.vies) return 'Numéro non vérifiable automatiquement';
    return a.vies.valide ? '✓ TVA valide (' + esc(a.vies.tva) + ')' + (a.vies.nom ? ' : ' + esc(a.vies.nom) : '') : '✗ Numéro de TVA non reconnu (' + esc(a.vies.tva) + ')';
  }
  function fiche(a) {
    return '<p><b>' + esc(a.societe) + '</b> · ' + esc(a.numero) + '</p><p class="g-gris">' + esc(a.nom) + ' · <a href="mailto:' + esc(a.email) + '">' + esc(a.email) + '</a>' + (a.telephone ? ' · ' + esc(a.telephone) : '') + (a.activite ? ' · ' + esc(a.activite) : '') + '</p>' +
      (a.message ? '<p class="g-message">' + esc(a.message) + '</p>' : '');
  }
  function vueAttente(l) {
    return '<p class="g-aide">Les demandes dont le numéro de TVA est reconnu par le registre européen (VIES) sont ouvertes automatiquement. Celles-ci attendent votre décision.</p>' +
      (l.length ? l.map(function (a) {
        return '<article class="g-carte">' + fiche(a) + '<p class="g-gris">' + viesTexte(a) + ' · reçue le ' + date(a.cree_le) + '</p>' +
          '<div class="g-actions"><button type="button" class="bouton" data-accepter="' + a.id + '">Accepter</button><button type="button" class="pro-lien" data-refuser="' + a.id + '">Refuser</button></div></article>';
      }).join('') : '<p class="g-vide">Aucune demande en attente.</p>');
  }
  var STATUTS = { actif: 'Actif', coupe: 'Coupé', refuse: 'Refusé', en_attente: 'En attente' };
  function vueClients() {
    var l = donnees.acces.filter(function (a) { return a.statut !== 'en_attente'; });
    return '<div class="g-barre"><p class="g-aide">Couper un accès retire aussitôt les prix au client. « Nouveau code » remplace l’ancien (code perdu ou partagé).</p><button type="button" class="bouton" data-creer>+ Créer un accès</button></div>' +
      (l.length ? '<div class="g-table"><table><thead><tr><th>Société</th><th>Contact</th><th>Ouvert</th><th>Dernière visite</th><th>État</th><th></th></tr></thead><tbody>' + l.map(function (a) {
        return '<tr><td><b>' + esc(a.societe) + '</b><br><small>' + esc(a.numero) + '</small></td><td>' + esc(a.nom) + '<br><small>' + esc(a.email) + '</small></td>' +
          '<td>' + date(a.cree_le) + '<br><small>' + (a.source === 'vies' ? 'automatique (TVA)' : a.source === 'gestion' ? 'créé par vous' : 'validé par vous') + '</small></td><td>' + date(a.vu_le) + '</td>' +
          '<td><span class="g-etat g-' + a.statut + '">' + STATUTS[a.statut] + '</span></td><td class="g-boutons">' +
          (a.statut === 'actif' ? '<button type="button" class="pro-lien" data-couper="' + a.id + '">Couper</button>'
            : a.statut === 'coupe' ? '<button type="button" class="pro-lien" data-reactiver="' + a.id + '">Réactiver</button>'
            : '<button type="button" class="pro-lien" data-accepter="' + a.id + '">Accepter</button>') +
          ' <button type="button" class="pro-lien" data-nouveau="' + a.id + '">Nouveau code</button></td></tr>';
      }).join('') + '</tbody></table></div>' : '<p class="g-vide">Aucun client pro pour l’instant.</p>');
  }
  function montrerCode(code, a) {
    var lien = 'mailto:' + encodeURIComponent(a && a.email || '') + '?subject=' + encodeURIComponent('Votre accès professionnel Initium³') +
      '&body=' + encodeURIComponent('Bonjour,\n\nVotre accès à notre espace professionnel est ouvert. Votre code personnel : ' + code + '\n\nConnectez-vous sur https://initium3.com/espace-pro/ pour voir vos prix et nous envoyer vos demandes.\n\nÀ bientôt,\nInitium³');
    var f = document.createElement('div'); f.className = 'pro-fond g-fond';
    f.innerHTML = '<div class="g-modale"><h2>Code du client</h2><p class="pro-code">' + code.slice(0, 4) + ' ' + code.slice(4) + '</p><p class="g-gris">Envoyez-le au client : il ne s’affichera plus ensuite.</p>' +
      '<div class="g-actions">' + (a && a.email ? '<a class="bouton" href="' + lien + '">Envoyer par e-mail</a>' : '') + '<button type="button" class="pro-lien" data-ok>Fermer</button></div></div>';
    document.body.appendChild(f);
    f.addEventListener('click', function (e) { if (e.target === f || e.target.closest('[data-ok]')) f.remove(); });
  }

  /* ---------- demandes de commande ---------- */
  function vueDemandes() {
    var par = {}; donnees.acces.forEach(function (a) { par[a.id] = a; });
    return donnees.demandes.length ? donnees.demandes.map(function (d) {
      var a = par[d.acces_id] || {}, total = d.lignes.reduce(function (t, l) { return t + (l.prix_pro_cents || 0) * l.qte; }, 0);
      return '<article class="g-carte' + (d.traitee ? ' g-traitee' : '') + '"><p><b>' + esc(a.societe || 'Client supprimé') + '</b> · ' + date(d.cree_le) + (a.numero ? ' · ' + esc(a.numero) : '') + '</p>' +
        '<p class="g-gris">' + esc(a.nom || '') + (a.email ? ' · <a href="mailto:' + esc(a.email) + '">' + esc(a.email) + '</a>' : '') + (a.telephone ? ' · ' + esc(a.telephone) : '') + '</p>' +
        '<ul class="pro-lignes">' + d.lignes.map(function (l) { return '<li><span>' + l.qte + ' × ' + esc(l.nom) + (l.reference ? ' <small>' + esc(l.reference) + '</small>' : '') + '</span><span>' + euros(l.prix_pro_cents == null ? null : l.prix_pro_cents * l.qte) + '</span></li>'; }).join('') + '</ul>' +
        '<p class="pro-total"><span>Total HT (prix pro)</span><b>' + euros(total) + '</b></p>' + (d.message ? '<p class="g-message">' + esc(d.message) + '</p>' : '') +
        '<label class="g-case"><input type="checkbox" data-traitee="' + d.id + '"' + (d.traitee ? ' checked' : '') + '> Traitée</label></article>';
    }).join('') : '<p class="g-vide">Aucune demande de commande pour l’instant.</p>';
  }

  /* ---------- catalogue ---------- */
  var recherche = '';
  function vueCatalogue() {
    var q = recherche.toLowerCase();
    var l = donnees.produits.filter(function (p) { return !q || (p.nom + ' ' + p.reference + ' ' + p.details).toLowerCase().indexOf(q) !== -1; });
    return '<div class="g-barre"><input type="search" class="pro-recherche" placeholder="Rechercher un produit…" value="' + esc(recherche) + '" data-recherche><button type="button" class="bouton" data-produit="">+ Nouveau produit</button></div>' +
      '<div class="g-produits">' + l.map(function (p) {
        return '<button type="button" class="g-produit' + (p.visible ? '' : ' g-masque') + '" data-produit="' + p.id + '">' +
          '<span class="g-vignette">' + (p.urls[0] ? '<img src="' + esc(p.urls[0]) + '" alt="" loading="lazy">' : '') + '</span>' +
          '<span class="g-produit-txt"><b>' + esc(p.nom) + '</b><small>' + euros(p.prix_public_cents) + ' · pro ' + euros(p.prix_pro_cents) + (p.visible ? '' : ' · masqué') + '</small></span></button>';
      }).join('') + '</div>';
  }

  // Une photo : reduite dans le navigateur (1600 px, JPEG) avant l'envoi.
  function reduire(fichier) {
    return new Promise(function (ok, ko) {
      var img = new Image(), url = URL.createObjectURL(fichier);
      img.onload = function () {
        var k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement('canvas');
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        ok(c.toDataURL('image/jpeg', 0.86).split(',')[1]);
      };
      img.onerror = function () { ko(new Error('Photo illisible.')); };
      img.src = url;
    });
  }

  function editer(id) {
    var p = donnees.produits.filter(function (x) { return x.id === id; })[0] || { nom: '', details: '', reference: '', prix_public_cents: null, prix_pro_cents: null, photos: [], urls: [], visible: true };
    var photos = p.photos.map(function (ch, i) { return { chemin: ch, url: p.urls[i] }; });
    var en = function (c) { return c == null ? '' : (c / 100).toFixed(2); };
    var f = document.createElement('div'); f.className = 'pro-fond';
    f.innerHTML = '<form class="pro-panneau formulaire" data-fiche><div class="pro-panneau-tete"><h2>' + (id ? 'Modifier le produit' : 'Nouveau produit') + '</h2><button type="button" class="pro-lien" data-fermer>Fermer</button></div>' +
      '<div class="g-photos" data-photos></div><label class="g-ajout-photo">+ Ajouter une photo<input type="file" accept="image/*" multiple data-fichier hidden></label>' +
      '<label>Nom<input name="nom" required value="' + esc(p.nom) + '"></label>' +
      '<label>Détails (dimensions, matériaux, tissu…)<textarea name="details" rows="5">' + esc(p.details) + '</textarea></label>' +
      '<label>Référence<input name="reference" value="' + esc(p.reference) + '"></label>' +
      '<div class="deux"><label>Prix public HT (€)<input name="public" type="number" step="0.01" min="0" value="' + en(p.prix_public_cents) + '"></label>' +
      '<label>Prix pro HT (€)<input name="pro" type="number" step="0.01" min="0" value="' + en(p.prix_pro_cents) + '"></label></div>' +
      '<button type="button" class="pro-lien" data-remise>Prix pro = prix public − 45 %</button>' +
      '<label class="g-case"><input type="checkbox" name="visible"' + (p.visible ? ' checked' : '') + '> Visible dans l’espace pro</label>' +
      '<div class="g-actions"><button class="bouton" type="submit">Enregistrer</button>' + (id ? '<button type="button" class="pro-lien g-danger" data-supprimer>Supprimer ce produit</button>' : '') + '</div></form>';
    document.body.appendChild(f);
    var form = $('[data-fiche]', f);
    function majPhotos() {
      $('[data-photos]', f).innerHTML = photos.map(function (ph, i) {
        return '<span class="g-photo"><img src="' + esc(ph.url) + '" alt="">' + (i ? '<button type="button" data-premiere="' + i + '" title="Mettre en premier">★</button>' : '<em>Principale</em>') +
          '<button type="button" data-enlever="' + i + '" title="Retirer">×</button></span>';
      }).join('') || '<p class="g-gris">Aucune photo.</p>';
    }
    majPhotos();
    f.addEventListener('click', function (e) {
      var t = e.target;
      if (t === f || t.closest('[data-fermer]')) { f.remove(); return; }
      var en1 = t.closest('[data-enlever]'); if (en1) { photos.splice(+en1.getAttribute('data-enlever'), 1); majPhotos(); return; }
      var pr = t.closest('[data-premiere]'); if (pr) { photos.unshift(photos.splice(+pr.getAttribute('data-premiere'), 1)[0]); majPhotos(); return; }
      if (t.closest('[data-remise]')) { var v = parseFloat(form.public.value); if (v > 0) form.pro.value = (v * 0.55).toFixed(2); return; }
      if (t.closest('[data-supprimer]')) {
        if (!confirm('Supprimer « ' + p.nom + ' » du catalogue ? Les demandes déjà reçues le gardent.')) return;
        appel('produit_supprimer', { id: id }).then(function () { f.remove(); charger(); }).catch(function (x) { alert(x.message); });
      }
    });
    $('[data-fichier]', f).addEventListener('change', function (e) {
      var l = [].slice.call(e.target.files); e.target.value = '';
      var lab = $('.g-ajout-photo', f); lab.firstChild.textContent = 'Envoi…';
      l.reduce(function (pr, fi) {
        return pr.then(function () { return reduire(fi); }).then(function (b64) { return appel('photo', { type: 'image/jpeg', donnees: b64 }); })
          .then(function (j) { photos.push({ chemin: j.url, url: j.url }); majPhotos(); });
      }, Promise.resolve()).catch(function (x) { alert(x.message); }).then(function () { lab.firstChild.textContent = '+ Ajouter une photo'; });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var c = function (v) { return v === '' ? null : Math.round(parseFloat(v) * 100); };
      appel('produit_enregistrer', { id: id || '', nom: form.nom.value, details: form.details.value, reference: form.reference.value,
        prix_public_cents: c(form.public.value), prix_pro_cents: c(form.pro.value), visible: form.visible.checked, photos: photos.map(function (x) { return x.chemin; }) })
        .then(function () { f.remove(); charger(); }).catch(function (x) { alert(x.message); });
    });
  }

  function creerAcces() {
    var f = document.createElement('div'); f.className = 'pro-fond';
    f.innerHTML = '<form class="pro-panneau formulaire" data-creation><div class="pro-panneau-tete"><h2>Créer un accès</h2><button type="button" class="pro-lien" data-fermer>Fermer</button></div>' +
      '<p class="g-aide">Pour un client que vous connaissez : son code est créé tout de suite.</p>' +
      '<label>Société<input name="societe" required></label><label>Numéro d’entreprise ou de TVA<input name="numero"></label>' +
      '<label>Nom du contact<input name="nom"></label><label>E-mail<input name="email" type="email"></label><label>Téléphone<input name="telephone"></label>' +
      '<button class="bouton" type="submit">Créer le code</button></form>';
    document.body.appendChild(f);
    var form = $('form', f);
    f.addEventListener('click', function (e) { if (e.target === f || e.target.closest('[data-fermer]')) f.remove(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = { societe: form.societe.value, numero: form.numero.value, nom: form.nom.value, email: form.email.value, telephone: form.telephone.value };
      appel('acces_creer', d).then(function (j) { f.remove(); montrerCode(j.code, d); onglet = 'clients'; charger(); }).catch(function (x) { alert(x.message); });
    });
  }

  app.addEventListener('click', function (e) {
    var t = e.target, b;
    if (t.closest('[data-sortir]')) { if (confirm('Se déconnecter sur cet appareil ?')) sortir(); return; }
    if ((b = t.closest('[data-onglet]'))) { onglet = b.getAttribute('data-onglet'); dessiner(); return; }
    var acces = function (id) { return donnees.acces.filter(function (a) { return a.id === id; })[0]; };
    if ((b = t.closest('[data-accepter]'))) { var id = b.getAttribute('data-accepter'); appel('acces_accepter', { id: id }).then(function (j) { montrerCode(j.code, acces(id)); charger(); }).catch(function (x) { alert(x.message); }); return; }
    if ((b = t.closest('[data-nouveau]'))) {
      var id2 = b.getAttribute('data-nouveau');
      if (!confirm('Créer un nouveau code ? L’ancien ne fonctionnera plus.')) return;
      appel('acces_nouveau_code', { id: id2 }).then(function (j) { montrerCode(j.code, acces(id2)); charger(); }).catch(function (x) { alert(x.message); }); return;
    }
    if ((b = t.closest('[data-refuser]'))) { if (confirm('Refuser cette demande ?')) appel('acces_refuser', { id: b.getAttribute('data-refuser') }).then(charger); return; }
    if ((b = t.closest('[data-couper]'))) { if (confirm('Couper cet accès ? Le client ne verra plus les prix.')) appel('acces_couper', { id: b.getAttribute('data-couper') }).then(charger); return; }
    if ((b = t.closest('[data-reactiver]'))) { appel('acces_reactiver', { id: b.getAttribute('data-reactiver') }).then(charger); return; }
    if (t.closest('[data-creer]')) { creerAcces(); return; }
    if ((b = t.closest('[data-produit]'))) { editer(b.getAttribute('data-produit')); return; }
  });
  app.addEventListener('change', function (e) {
    var c = e.target.closest('[data-traitee]');
    if (c) appel('demande_traitee', { id: c.getAttribute('data-traitee'), valeur: c.checked }).then(charger);
  });
  app.addEventListener('input', function (e) {
    if (!e.target.matches('[data-recherche]')) return;
    recherche = e.target.value;
    var pos = e.target.selectionStart; dessiner();
    var r = $('[data-recherche]'); r.focus(); r.setSelectionRange(pos, pos);
  });

  if (jeton) charger(); else ecranCode();
})();
