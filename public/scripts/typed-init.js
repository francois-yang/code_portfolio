import { typeWriterEffect } from './typeWriter.js';

document.addEventListener('DOMContentLoaded', () => {
  const heroTyped = document.querySelector('.hero-typed');
  if (heroTyped) {
    const words = JSON.parse(heroTyped.dataset.words || '["Designer Web", "Communication Visuelle"]');
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const currentWord = words[wordIndex];

      if (!deleting) {
        charIndex += 1;
        heroTyped.textContent = currentWord.slice(0, charIndex);

        if (charIndex >= currentWord.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex -= 1;
        heroTyped.textContent = currentWord.slice(0, charIndex);

        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, 300);
          return;
        }
      }

      setTimeout(tick, deleting ? 35 : 80);
    }

    tick();
    return;
  }

  const els = document.querySelectorAll('.typewriter');
  els.forEach(el => {
    el.classList.add('typewriter-invisible');
  });

  function animateSequentially(i = 0) {
    if (i >= els.length) return;
    const el = els[i];
    const txt = el.dataset.text || el.textContent;
    el.classList.remove('typewriter-invisible');
    typeWriterEffect(el, txt, 18, 0, () => animateSequentially(i + 1));
  }

  animateSequentially();
});