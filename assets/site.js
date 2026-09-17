// Initium³ : entete, menu plein ecran, diaporama d'ouverture, parallaxe
// douce, carrousel des pieces, apparitions, formulaires de l'apercu.
(function () {
  'use strict';
  var calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* l'entete devient blanche des qu'on quitte l'image d'ouverture */
  var entete = document.querySelector('[data-entete]');
  var ouverture = document.querySelector('[data-ouverture]');
  var majEntete = function () {
    if (!entete) return;
    var seuil = ouverture ? ouverture.offsetHeight - 100 : 40;
    if (window.scrollY > seuil || document.body.classList.contains('entete-clair')) entete.setAttribute('data-plein', '');
    else entete.removeAttribute('data-plein');
  };
  if (!ouverture && !document.body.classList.contains('entete-clair')) {
    // pages d'univers : image en tete, meme comportement avec un seuil court
    ouverture = document.querySelector('.tete-univers');
  }
  window.addEventListener('scroll', majEntete, { passive: true });
  majEntete();

  /* menu plein ecran */
  var burger = document.querySelector('.burger');
  var panneau = document.getElementById('panneau');
  if (burger && panneau) {
    burger.addEventListener('click', function () {
      var ouvert = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', ouvert ? 'false' : 'true');
      burger.setAttribute('aria-label', ouvert ? 'Ouvrir le menu' : 'Fermer le menu');
      panneau.hidden = ouvert;
      document.body.classList.toggle('menu-ouvert', !ouvert);
      document.body.style.overflow = ouvert ? '' : 'hidden';
    });
  }

  /* diaporama d'ouverture : fondu lent toutes les 6 secondes */
  var diapos = [].slice.call(document.querySelectorAll('.diapo'));
  if (ouverture && ouverture.hasAttribute('data-ouverture')) {
    requestAnimationFrame(function () { requestAnimationFrame(function () { ouverture.classList.add('pret'); }); });
    if (diapos.length > 1 && !calme) {
      var i = 0;
      setInterval(function () {
        if (document.hidden) return;
        diapos[i].classList.remove('active');
        i = (i + 1) % diapos.length;
        diapos[i].classList.add('active');
      }, 6000);
    }
  }

  /* parallaxe douce de l'image pleine largeur */
  var plein = document.querySelector('[data-plein]');
  if (plein && !calme) {
    var image = plein.querySelector('.plein-image');
    var prevu = false;
    var peindre = function () {
      prevu = false;
      var r = plein.getBoundingClientRect();
      var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      image.style.transform = 'translate3d(0,' + (p * -8).toFixed(2) + '%,0)';
    };
    window.addEventListener('scroll', function () { if (!prevu) { prevu = true; requestAnimationFrame(peindre); } }, { passive: true });
    peindre();
  }

  /* carrousel : fleches + glisser a la souris */
  document.querySelectorAll('[data-carrousel]').forEach(function (c) {
    var piste = c.querySelector('.carrousel-piste');
    var pas = function () { var p = piste.querySelector('.piece'); return p ? p.offsetWidth + 24 : 300; };
    c.querySelector('[data-prec]').addEventListener('click', function () { piste.scrollBy({ left: -pas(), behavior: 'smooth' }); });
    c.querySelector('[data-suiv]').addEventListener('click', function () { piste.scrollBy({ left: pas(), behavior: 'smooth' }); });
    var x0 = 0, s0 = 0, tire = false;
    piste.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      tire = true; x0 = e.clientX; s0 = piste.scrollLeft; piste.classList.add('tire'); piste.setPointerCapture(e.pointerId);
    });
    piste.addEventListener('pointermove', function (e) { if (tire) piste.scrollLeft = s0 - (e.clientX - x0); });
    var lacher = function () { if (!tire) return; tire = false; piste.classList.remove('tire'); };
    piste.addEventListener('pointerup', lacher);
    piste.addEventListener('pointercancel', lacher);
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

  /* formulaires de l'apercu : pas encore relies, on le dit */
  document.querySelectorAll('[data-apercu]').forEach(function (f) {
    var piece = new URLSearchParams(location.search).get('piece');
    var message = f.querySelector('[data-message]');
    if (piece && message) message.value = 'Bonjour, je souhaite des informations sur : ' + piece + '.';
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      f.querySelector('[data-note]').hidden = false;
    });
  });
})();
