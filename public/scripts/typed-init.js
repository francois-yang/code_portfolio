import { typeWriterEffect } from './typeWriter.js';

document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.typewriter');
  els.forEach(el => {
    el.classList.add('typewriter-invisible'); // Cache d'office
  });
  function animateSequentially(i = 0) {
    if (i >= els.length) return;
    const el = els[i];
    const txt = el.dataset.text || el.textContent;
    el.classList.remove('typewriter-invisible'); // Montre au début de l'animation
    typeWriterEffect(el, txt, 18, 0, () => animateSequentially(i + 1));
  }
  animateSequentially();
});