// Gestion du changement de projets
let currentProject = 0;
const totalProjects = 2;
let isAnimating = false;

export function switchProject(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const currentScreen = document.getElementById(`project-${currentProject}`);
    const nextIndex = direction === "next" 
        ? (currentProject + 1) % totalProjects 
        : (currentProject - 1 + totalProjects) % totalProjects;
    const nextScreen = document.getElementById(`project-${nextIndex}`);

    if (!currentScreen || !nextScreen) return;

    // Phase 1 : Fermeture
    currentScreen.classList.add("closing");

    setTimeout(() => {
        currentScreen.classList.remove("active", "closing");
        nextScreen.classList.add("opening");

        setTimeout(() => {
            nextScreen.classList.add("active");
            nextScreen.classList.remove("opening");
            currentProject = nextIndex;
            isAnimating = false;
        }, 600);
    }, 600);
}

export function initProjectSwitcher() {
    document.getElementById("next-btn")?.addEventListener("click", () => switchProject("next"));
    document.getElementById("prev-btn")?.addEventListener("click", () => switchProject("prev"));
}
