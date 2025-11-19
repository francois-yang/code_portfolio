export function initMenuNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  
  if (!menuToggle || !mobileMenu) return; // Protection si les éléments n'existent pas
  
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    iconOpen?.classList.toggle('hidden');
    iconClose?.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', isMenuOpen.toString());
  }

  menuToggle.addEventListener('click', toggleMenu);
  menuClose?.addEventListener('click', toggleMenu);

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      iconOpen?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      isMenuOpen = false;
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  });
}
