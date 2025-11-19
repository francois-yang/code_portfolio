// /public/scripts/svgAnimations.js
export function initSVGAnimations() {
    
    
    function animateSVGElement(el, index) {
        const svg = el.querySelector('svg');
        if (!svg) {
           
            return;
        }
        
        // Force la visibilité de l'élément
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        svg.style.opacity = '1';
        svg.style.visibility = 'visible';
        
        const shapes = svg.querySelectorAll('path, circle, line, polyline');
        
        
        shapes.forEach((shape, shapeIndex) => {
            try {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const length = shape.getTotalLength ? shape.getTotalLength() : 1000;
                        
                        
                        // Configuration initiale : ligne invisible
                        shape.style.strokeDasharray = `${length}`;
                        shape.style.strokeDashoffset = `${length}`;
                        shape.style.transition = 'none';
                        
                        // Force un reflow
                        shape.getBoundingClientRect();
                        
                        // Active la transition puis anime
                        setTimeout(() => {
                            shape.style.transition = `stroke-dashoffset ${2 + shapeIndex * 0.3}s ease-in-out`;
                            shape.style.strokeDashoffset = '0';
                            
                        }, 100 + (shapeIndex * 200));
                    });
                });
            } catch (error) {
                console.error(error);
            }
        });
    }
    
    const svgElements = document.querySelectorAll('[data-svg-animate]');
    console.log('Total elements:', svgElements.length);
    
    if (svgElements.length === 0) {
        console.warn('No elements with data-svg-animate found!');
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(svgElements).indexOf(entry.target);
                
                
                setTimeout(() => {
                    animateSVGElement(entry.target, index);
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    svgElements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        observer.observe(el);
    });
    

}
