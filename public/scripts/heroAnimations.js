// Animations spécifiques au hero
export function animateHeroSVGs() {
    const containers = document.querySelectorAll(".hero-svg-animate");

    containers.forEach((container) => {
        const delay = parseInt(container.dataset.delay || "0");
        const svg = container.querySelector("svg");
        const shouldSpin = container.classList.contains("hero-svg-spin");

        if (svg) {
            const elements = svg.querySelectorAll(".hero-path");

            elements.forEach((element, index) => {
                const length = element.getTotalLength?.() || 3000;

                element.style.strokeDasharray = `${length}`;
                element.style.strokeDashoffset = `${length}`;

                setTimeout(() => {
                    element.style.transition = "stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)";
                    element.style.strokeDashoffset = "0";
                }, delay + index * 150);
            });

            if (shouldSpin) {
                setTimeout(() => {
                    container.style.animation = "spin-slow 20s linear infinite";
                }, delay + 2500);
            }
        }
    });
}
