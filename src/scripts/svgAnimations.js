// svgAnimations.js
export function initSVGAnimations() {
    const svgElements = document.querySelectorAll('[data-svg-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svgElement = entry.target.querySelector('svg');
                if (svgElement) {
                    animateSVGPaths(svgElement);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    svgElements.forEach(el => observer.observe(el));
}

function animateSVGPaths(svg) {
    const paths = svg.querySelectorAll('path, line, polyline, circle');
    
    paths.forEach((path, index) => {
        const length = path.getTotalLength ? path.getTotalLength() : 1000;
        
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.transition = `stroke-dashoffset ${1.5 + index * 0.2}s ease-in-out`;
        
        setTimeout(() => {
            path.style.strokeDashoffset = '0';
        }, index * 100);
    });
}
