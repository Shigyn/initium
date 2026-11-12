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

  /* Les evenements de l'accueil : la fleche de droite passe au suivant (et revient au premier a la fin), on peut aussi glisser au doigt. */
  // Glissement en CSS (transform) : le defilement doux des navigateurs ne repond pas toujours.
  document.querySelectorAll('[data-evenements]').forEach(function (s) {
    var piste = s.querySelector('[data-piste]'), prec = s.querySelector('[data-prec]'), suiv = s.querySelector('[data-suiv]');
    if (!piste || !prec || !suiv) return;
    var diapos = piste.children, n = diapos.length, i = 0, x0 = null;
    function aller(j) {
      i = (j + n) % n;
      piste.style.transform = 'translateX(' + (-100 * i) + '%)';
      prec.hidden = i === 0;
      // Les evenements caches ne se lisent pas et ne prennent pas le focus.
      for (var k = 0; k < n; k++) { if (k === i) diapos[k].removeAttribute('inert'); else diapos[k].setAttribute('inert', ''); }
      diapos[i].querySelectorAll('.reveler').forEach(function (el) { el.classList.add('vu'); });
    }
    prec.addEventListener('click', function () { aller(i - 1); });
    suiv.addEventListener('click', function () { aller(i + 1); });
    // Au doigt : glisser vers la gauche ou la droite.
    piste.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    piste.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) aller(i + (dx < 0 ? 1 : -1));
    }, { passive: true });
    aller(0);
  });

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
