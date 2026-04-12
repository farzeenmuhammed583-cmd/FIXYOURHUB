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

  /* ===== FYH Dropdown Logic ===== */
  const dropdownTriggers = navbar.querySelectorAll(".fyh-dropdown-trigger");
  const dropdownParents = navbar.querySelectorAll(".fyh-dropdown-parent");
  let dropdownCloseTimers = new Map();

  const closeAllDropdowns = () => {
    dropdownParents.forEach((parent) => {
      parent.classList.remove("is-open");
      dropdownCloseTimers.delete(parent);
    });
    dropdownTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
  };

  dropdownTriggers.forEach((trigger) => {
    const isMobile = trigger.closest(".fyh-dropdown-parent--mobile") !== null;

    if (isMobile) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parent = trigger.closest(".fyh-dropdown-parent");
        const isOpen = parent.classList.contains("is-open");

        closeAllDropdowns();

        if (!isOpen) {
          parent.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    } else {
      trigger.addEventListener("mouseenter", () => {
        const timer = dropdownCloseTimers.get(trigger.closest(".fyh-dropdown-parent"));
        if (timer) clearTimeout(timer);

        closeAllDropdowns();
        const parent = trigger.closest(".fyh-dropdown-parent");
        parent.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      });

      const parent = trigger.closest(".fyh-dropdown-parent");
      parent.addEventListener("mouseleave", () => {
        const timer = setTimeout(() => {
          parent.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
          dropdownCloseTimers.delete(parent);
        }, 150);
        dropdownCloseTimers.set(parent, timer);
      });

      const menu = parent.querySelector(".fyh-dropdown-menu");
      if (menu) {
        menu.addEventListener("mouseenter", () => {
          const timer = dropdownCloseTimers.get(parent);
          if (timer) {
            clearTimeout(timer);
            dropdownCloseTimers.delete(parent);
          }
        });

        menu.addEventListener("mouseleave", () => {
          const timer = setTimeout(() => {
            parent.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
            dropdownCloseTimers.delete(parent);
          }, 150);
          dropdownCloseTimers.set(parent, timer);
        });
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".fyh-dropdown-parent")) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAllDropdowns();
  });
  /* ===== End FYH Dropdown Logic ===== */
};