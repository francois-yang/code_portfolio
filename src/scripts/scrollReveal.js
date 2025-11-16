// scrollReveal.js
export function initScrollReveal() {
    console.log('🔄 ScrollReveal init');
    const elements = document.querySelectorAll('[data-scroll-reveal]');
    console.log(`✅ ${elements.length} éléments trouvés`);
    
    if (elements.length === 0) {
        console.warn('⚠️ Aucun élément [data-scroll-reveal] trouvé');
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = parseFloat(element.dataset.delay || '0');
                
                console.log(`👁️ Élément visible: ${element.tagName}, delay: ${delay}s`);
                
                setTimeout(() => {
                    element.classList.add('revealed');
                }, delay * 1000);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ❌ RETIRE TOUT CE CODE (c'était le problème)
// Ne pas exécuter à l'import, laisser le Layout le faire
