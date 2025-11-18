// /public/scripts/main.js
import { initProjectSwitcher } from './projectSwitcher.js';
import { animateHeroSVGs } from './heroAnimations.js';
import { initLineAnimations } from './lineAnimations.js';
import { initSVGAnimations } from './svgAnimations.js';

function init() {
    console.log('🚀 Initializing all animations...');
    
    initProjectSwitcher();
    animateHeroSVGs();
    initLineAnimations();
    
    // Attendre que ScrollReveal soit prêt avant d'initialiser les SVG
    setTimeout(() => {
        initSVGAnimations();
    }, 500);
    
    console.log('✅ All animations initialized');
}

// Init au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Réinit après navigation Astro (si tu utilises View Transitions)
document.addEventListener('astro:page-load', init);
