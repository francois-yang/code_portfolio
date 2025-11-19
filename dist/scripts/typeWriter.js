export function typeWriterEffect(element, txt, speed = 40, delay = 0, callback) {
  let i = 0;
  function type() {
    if (i <= txt.length) {
      element.textContent = txt.slice(0, i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  setTimeout(type, delay);
}

// Optionnel : déclenchement lors de l'entrée dans le viewport
export function typeOnScroll(selector, speed = 40) {
  const el = document.querySelector(selector);
  const txt = el?.dataset?.text || el?.textContent;
  el.textContent = "";
  let hasTyped = false;
  function onScroll() {
    const rect = el.getBoundingClientRect();
    if (!hasTyped && rect.top < window.innerHeight * 0.9) {
      hasTyped = true;
      typeWriterEffect(el, txt, 1);
      window.removeEventListener("scroll", onScroll);
    }
  }
  window.addEventListener("scroll", onScroll);
}
