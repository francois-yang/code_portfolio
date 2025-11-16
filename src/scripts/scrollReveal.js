// scrollReveal.ts
export function initScrollReveal() {
    const elements = document.querySelectorAll('[data-scroll-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target as HTMLElement;
                const delay = parseFloat(element.dataset.delay || '0');
                
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

// Auto-init au chargement
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        initScrollReveal();
    }

    // Reinit après navigation Astro
    document.addEventListener('astro:page-load', initScrollReveal);
}
