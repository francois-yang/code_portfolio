// /public/scripts/main.js
import { initProjectSwitcher } from './projectSwitcher.js';
import { animateHeroSVGs } from './heroAnimations.js';
import { initLineAnimations } from './lineAnimations.js';
import { initSVGAnimations } from './svgAnimations.js';

function init() {
    // Initialiser toutes les animations
    initProjectSwitcher();
    animateHeroSVGs();
    initLineAnimations();
    initSVGAnimations(); // ← Vérifie que c'est bien là
}

// Init au chargement
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
