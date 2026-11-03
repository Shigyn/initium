// Initium³ : entete, menu plein ecran, diaporama, apparitions,
// formulaires de l'apercu (code d'acces, demande de code, contact).
(function () {
  'use strict';
  var calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* l'entete passe en blanc des qu'on quitte l'image du haut */
  var entete = document.querySelector('[data-entete]');
  var haut = document.querySelector('[data-ouverture]') || document.querySelector('.tete-univers');
  var majEntete = function () {
    if (!entete || document.body.classList.contains('entete-clair')) return;
    var seuil = haut ? haut.offsetHeight - 90 : 30;
    if (window.scrollY > seuil) entete.setAttribute('data-plein', '');
    else entete.removeAttribute('data-plein');
  };
  window.addEventListener('scroll', majEntete, { passive: true });
  majEntete();

  /* menu plein ecran */
  var burger = document.querySelector('.burger');
  var panneau = document.getElementById('panneau');
  if (burger && panneau) {
    var libelleOuvrir = burger.getAttribute('aria-label');
    burger.addEventListener('click', function () {
      var ouvert = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', ouvert ? 'false' : 'true');
      burger.setAttribute('aria-label', ouvert ? libelleOuvrir : burger.getAttribute('data-libelle-fermer'));
      panneau.hidden = ouvert;
      document.body.classList.toggle('menu-ouvert', !ouvert);
      document.body.style.overflow = ouvert ? '' : 'hidden';
    });
  }

  /* diaporama d'ouverture */
  var diapos = [].slice.call(document.querySelectorAll('.diapo'));
  if (diapos.length > 1 && !calme) {
    var i = 0;
    setInterval(function () {
      if (document.hidden) return;
      diapos[i].classList.remove('active');
      i = (i + 1) % diapos.length;
      diapos[i].classList.add('active');
    }, 6000);
  }

  /* apparitions */
  var elements = document.querySelectorAll('.reveler');
  if ('IntersectionObserver' in window && !calme) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vu'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    elements.forEach(function (el) { obs.observe(el); });
  } else {
    elements.forEach(function (el) { el.classList.add('vu'); });
  }

  /* Le formulaire de contact : le message part dans la gestion d'Olivier (fonction in-pro). */
  document.querySelectorAll('[data-contact]').forEach(function (f) {
    var piece = new URLSearchParams(location.search).get('piece');
    var message = f.querySelector('[data-message]');
    if (piece && message) message.value = (f.getAttribute('data-prefixe') || '') + piece;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      var note = f.querySelector('[data-note]'), b = f.querySelector('button'), C = window.LOCWEB_CONFIG || {};
      b.disabled = true; note.hidden = true;
      fetch(C.supabaseUrl + '/functions/v1/in-pro', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'contact', langue: document.documentElement.lang, nom: f.nom.value, email: f.email.value, profil: f.profil.value, message: f.message.value }),
      }).then(function (r) { if (!r.ok) throw new Error(); note.textContent = f.getAttribute('data-ok'); f.reset(); })
        .catch(function () { note.textContent = f.getAttribute('data-erreur'); })
        .then(function () { note.hidden = false; b.disabled = false; });
    });
  });
})();
