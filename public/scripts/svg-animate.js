// Global SVG stroke-draw animator
// Usage: add class "animate-stroke" to any <svg> you want to animate.
// Optional data-duration (ms) on the <svg> to set animation duration per-svg.

(function () {
  const SELECTOR = 'svg.animate-stroke';

  function prepareSVG(svg) {
    const duration = svg.dataset.duration ? parseInt(svg.dataset.duration, 10) : 1200;
    const paths = svg.querySelectorAll('path, line, polyline, polygon, circle, rect');

    paths.forEach((p) => {
      try {
        const len = p.getTotalLength();
        // set dash array/offset so the path is hidden
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
        p.style.willChange = 'stroke-dashoffset, opacity';
        // ensure no fill if it's meant to be a stroke animation
        if (!p.getAttribute('fill') || p.getAttribute('fill') === 'none') {
          // leave as-is
        }
      } catch (err) {
        // Some shapes (e.g., <g>) may not support getTotalLength
        // ignore silently
      }
    });
  }

  function playSVG(svg) {
    const paths = svg.querySelectorAll('path, line, polyline, polygon, circle, rect');
    paths.forEach((p) => {
      // trigger paint
      requestAnimationFrame(() => (p.style.strokeDashoffset = '0'));
    });
  }

  function init() {
    const svgs = document.querySelectorAll(SELECTOR);
    if (!svgs.length) return;

    svgs.forEach((svg) => prepareSVG(svg));

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playSVG(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    svgs.forEach((svg) => io.observe(svg));
  }

  // Init on first load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run after Astro navigation events
  document.addEventListener('astro:page-load', () => {
    // small timeout to allow new DOM to mount
    setTimeout(init, 60);
  });
})();
