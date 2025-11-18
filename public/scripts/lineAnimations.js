// Animation des lignes
export function initLineAnimations() {
    setTimeout(() => {
        document.querySelectorAll(".line-anim").forEach((svg) => {
            svg.classList.add("revealed");
        });
    }, 300);
}
