window.setupNavbar = function setupNavbar() {
  const navbar = document.querySelector("[data-navbar]");
  if (!navbar) return;

  const toggle = navbar.querySelector("[data-menu-toggle]");
  const mobileMenu = navbar.querySelector("[data-mobile-menu]");
  const overlay = navbar.querySelector("[data-menu-overlay]");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  const setScrolledState = () => {
    if (window.innerWidth > 992) {
      navbar.classList.toggle("is-scrolled", window.scrollY > 16);
    } else {
      navbar.classList.add("is-scrolled");
    }
  };

  const closeMenu = () => {
    if (!toggle || !mobileMenu || !overlay) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector('.open').style.display = 'block';
    toggle.querySelector('.close').style.display = 'none';
    mobileMenu.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    document.body.style.position = '';
  };

  const openMenu = () => {
    if (!toggle || !mobileMenu || !overlay) return;
    toggle.setAttribute("aria-expanded", "true");
    toggle.querySelector('.open').style.display = 'none';
    toggle.querySelector('.close').style.display = 'block';
    mobileMenu.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("menu-open");
    document.body.style.position = 'fixed';
  };

  if (toggle) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  overlay?.addEventListener("click", closeMenu);

  // Close button inside menu
  const closeBtn = navbar.querySelector("[data-menu-close]");
  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
  });

  mobileLinks.forEach((link) => {
    if (link.classList.contains("fyh-dropdown-trigger")) return;
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      closeMenu();
      closeAllDropdowns();
    }
    setScrolledState();
  });

  setScrolledState();
  window.addEventListener("scroll", setScrolledState, { passive: true });

  /* ===== FYH Dropdown Logic ===== */
  const dropdownTriggers = navbar.querySelectorAll(".fyh-dropdown-trigger");
  const dropdownParents = navbar.querySelectorAll(".fyh-dropdown-parent");
  let dropdownCloseTimers = new Map();
  const isMobileView = () => window.innerWidth <= 992;

  const closeAllDropdowns = () => {
    dropdownParents.forEach((parent) => {
      parent.classList.remove("is-open");
      dropdownCloseTimers.delete(parent);
    });
    dropdownTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
  };

  dropdownTriggers.forEach((trigger) => {
    const isMobile = trigger.closest(".fyh-dropdown-parent--mobile") !== null;

    if (isMobile || isMobileView()) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parent = trigger.closest(".fyh-dropdown-parent");
        if (!parent) return;
        const isOpen = parent.classList.contains("is-open");

        if (isMobileView()) {
          closeAllDropdowns();
        }

        if (!isOpen) {
          parent.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        } else {
          parent.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
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