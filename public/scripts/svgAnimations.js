// svgAnimations.js
export function initSVGAnimations() {
    const svgElements = document.querySelectorAll('[data-svg-animate]');
    
    console.log('🔍 SVG elements found:', svgElements.length); // ← Debug
    
    if (svgElements.length === 0) {
        console.warn('⚠️ No elements with data-svg-animate found!');
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log('👀 Element visible:', entry.isIntersecting); // ← Debug
            if (entry.isIntersecting) {
                const svgElement = entry.target.querySelector('svg');
                if (svgElement) {
                    console.log('✅ Animating SVG'); // ← Debug
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
    
    console.log('🎨 Paths to animate:', paths.length); // ← Debug
    
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
