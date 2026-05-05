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
  const BREAKPOINT = 992;

  const isMobileView = () => window.innerWidth <= BREAKPOINT;

  const closeAllDropdowns = () => {
    dropdownParents.forEach((parent) => parent.classList.remove("is-open"));
    dropdownTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
  };

  const openDropdown = (trigger) => {
    const parent = trigger.closest(".fyh-dropdown-parent");
    if (!parent) return;
    closeAllDropdowns();
    parent.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const toggleDropdown = (trigger) => {
    const parent = trigger.closest(".fyh-dropdown-parent");
    if (!parent) return;
    const isOpen = parent.classList.contains("is-open");
    if (isOpen) {
      parent.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    } else {
      openDropdown(trigger);
    }
  };

  /* Mobile: click-to-toggle, only one open at a time */
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      if (!isMobileView()) return;
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(trigger);
    });
  });

  /* Desktop: hover-based with delay */
  let dropdownCloseTimers = new Map();

  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => {
      if (isMobileView()) return;
      const parent = trigger.closest(".fyh-dropdown-parent");
      if (!parent) return;
      const timer = dropdownCloseTimers.get(parent);
      if (timer) {
        clearTimeout(timer);
        dropdownCloseTimers.delete(parent);
      }
      closeAllDropdowns();
      parent.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    });
  });

  dropdownParents.forEach((parent) => {
    parent.addEventListener("mouseleave", () => {
      if (isMobileView()) return;
      const trigger = parent.querySelector(".fyh-dropdown-trigger");
      const timer = setTimeout(() => {
        parent.classList.remove("is-open");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
        dropdownCloseTimers.delete(parent);
      }, 150);
      dropdownCloseTimers.set(parent, timer);
    });

    parent.addEventListener("mouseenter", () => {
      if (isMobileView()) return;
      const timer = dropdownCloseTimers.get(parent);
      if (timer) {
        clearTimeout(timer);
        dropdownCloseTimers.delete(parent);
      }
    });
  });

  /* Close dropdowns on outside click */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".fyh-dropdown-parent")) {
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
      closeMenu();
    }
  });
  /* ===== End FYH Dropdown Logic ===== */
};