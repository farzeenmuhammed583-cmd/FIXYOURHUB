window.setupNavbar = function setupNavbar() {
  const navbar = document.querySelector("[data-navbar]");
  if (!navbar) return;

  const toggle = navbar.querySelector("[data-menu-toggle]");
  const mobileMenu = navbar.querySelector("[data-mobile-menu]");
  const overlay = navbar.querySelector("[data-menu-overlay]");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  const setScrolledState = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  const closeMenu = () => {
    if (!toggle || !mobileMenu || !overlay) return;
    toggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!toggle || !mobileMenu || !overlay) return;
    toggle.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("menu-open");
  };

  if (toggle) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  overlay?.addEventListener("click", closeMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) closeMenu();
  });

  setScrolledState();
  window.addEventListener("scroll", setScrolledState, { passive: true });
};