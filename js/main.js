const componentFallbacks = {
  "components/navbar.html": `
    <nav class="site-nav" data-navbar>
      <div class="container site-nav__inner">
        <a class="brand" href="index.html" aria-label="FixYourHub home">
          <span class="brand__mark" aria-hidden="true">
            <svg class="brand__mark-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path class="brand__mark-track" d="M29.1 13.1C26.7 10.4 23.3 9 19.6 9C14.9 9 10.9 11.3 9 15.2" />
              <path class="brand__mark-track brand__mark-track--two" d="M10.9 26.9C13.3 29.6 16.7 31 20.4 31C25.1 31 29.1 28.7 31 24.8" />
              <path class="brand__mark-flow brand__mark-flow--one" d="M9.1 18.2C10 14.5 12.9 11.7 16.7 10.8C20.6 9.9 24.7 11 27.5 13.5" />
              <path class="brand__mark-flow brand__mark-flow--two" d="M30.9 21.8C30 25.5 27.1 28.3 23.3 29.2C19.4 30.1 15.3 29 12.5 26.5" />
              <path class="brand__mark-head brand__mark-head--one" d="M25.1 10.5L29.8 10.8L29.5 15.5" />
              <path class="brand__mark-head brand__mark-head--two" d="M14.9 29.5L10.2 29.2L10.5 24.5" />
              <path class="brand__mark-core" d="M16.2 20H23.8" />
              <rect class="brand__mark-node brand__mark-node--one" x="11.9" y="15.8" width="3.2" height="3.2" rx="1" transform="rotate(-12 13.5 17.4)" />
              <rect class="brand__mark-node brand__mark-node--two" x="24.9" y="20.9" width="3.2" height="3.2" rx="1" transform="rotate(-12 26.5 22.5)" />
            </svg>
          </span>
          <span class="brand__text">
            <span class="brand__name">FixYourHub</span>
            <span class="brand__meta">BUILD. LAUNCH. SCALE.</span>
          </span>
        </a>
        <div class="nav-links" aria-label="Primary">
          <a class="nav-link" data-nav-link href="web.html">Web Services</a>
          <div class="fyh-dropdown-parent">
            <a class="nav-link fyh-dropdown-trigger" href="products.html" aria-expanded="false" aria-haspopup="true">
              Products
              <svg class="fyh-dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </a>
            <div class="fyh-dropdown-menu" role="menu">
              <a class="fyh-dropdown-item" href="products.html" role="menuitem">View All Products <span class="badge badge--secondary" style="font-size: 0.65rem; padding: 2px 6px;">Coming Soon</span></a>
            </div>
          </div>
          <a class="nav-link" data-nav-link href="index.html#services">Services</a>
          <div class="fyh-dropdown-parent">
            <a class="nav-link fyh-dropdown-trigger" href="javascript:void(0)" aria-expanded="false" aria-haspopup="true">
              Company
              <svg class="fyh-dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </a>
            <div class="fyh-dropdown-menu" role="menu">
              <a class="fyh-dropdown-item" href="about.html" role="menuitem">About</a>
              <a class="fyh-dropdown-item" href="careers.html" role="menuitem">Careers</a>
              <a class="fyh-dropdown-item" href="media.html" role="menuitem">Media</a>
              <a class="fyh-dropdown-item" href="contact.html" role="menuitem">Contact</a>
            </div>
          </div>
        </div>
        <div class="nav-actions">
          <a class="button-secondary button-sm" href="login.html">Login</a>
          <a class="button" href="signup.html">Sign Up</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation menu" data-menu-toggle>
            <svg class="open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            <svg class="close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      <div class="mobile-menu__overlay" data-menu-overlay></div>
      <div class="mobile-menu" id="mobile-menu" data-mobile-menu>
        <div class="mobile-menu__links">
          <a class="nav-link" data-nav-link href="web.html">Web Services</a>
          <a class="nav-link" data-nav-link href="products.html">Products <span class="badge badge--secondary" style="font-size: 0.6rem; padding: 2px 6px;">Soon</span></a>
          <a class="nav-link" data-nav-link href="index.html#services">Services</a>
          <div class="fyh-dropdown-parent fyh-dropdown-parent--mobile">
            <a class="nav-link fyh-dropdown-trigger" href="javascript:void(0)" aria-expanded="false" aria-haspopup="true">
              Company
              <svg class="fyh-dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </a>
            <div class="fyh-dropdown-menu fyh-dropdown-menu--mobile" role="menu">
              <a class="fyh-dropdown-item" href="about.html" role="menuitem">About</a>
              <a class="fyh-dropdown-item" href="careers.html" role="menuitem">Careers</a>
              <a class="fyh-dropdown-item" href="media.html" role="menuitem">Media</a>
              <a class="fyh-dropdown-item" href="contact.html" role="menuitem">Contact</a>
            </div>
          </div>
        </div>
        <a class="button-secondary button-sm" href="login.html">Login</a>
        <a class="button" href="signup.html">Sign Up</a>
      </div>
    </nav>
  `,
  "components/footer.html": `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <a class="brand" href="index.html" aria-label="FixYourHub home">
              <span class="brand__mark" aria-hidden="true">
                <svg class="brand__mark-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <path class="brand__mark-track" d="M29.1 13.1C26.7 10.4 23.3 9 19.6 9C14.9 9 10.9 11.3 9 15.2" />
                  <path class="brand__mark-track brand__mark-track--two" d="M10.9 26.9C13.3 29.6 16.7 31 20.4 31C25.1 31 29.1 28.7 31 24.8" />
                  <path class="brand__mark-flow brand__mark-flow--one" d="M9.1 18.2C10 14.5 12.9 11.7 16.7 10.8C20.6 9.9 24.7 11 27.5 13.5" />
                  <path class="brand__mark-flow brand__mark-flow--two" d="M30.9 21.8C30 25.5 27.1 28.3 23.3 29.2C19.4 30.1 15.3 29 12.5 26.5" />
                  <path class="brand__mark-head brand__mark-head--one" d="M25.1 10.5L29.8 10.8L29.5 15.5" />
                  <path class="brand__mark-head brand__mark-head--two" d="M14.9 29.5L10.2 29.2L10.5 24.5" />
                  <path class="brand__mark-core" d="M16.2 20H23.8" />
                  <rect class="brand__mark-node brand__mark-node--one" x="11.9" y="15.8" width="3.2" height="3.2" rx="1" transform="rotate(-12 13.5 17.4)" />
                  <rect class="brand__mark-node brand__mark-node--two" x="24.9" y="20.9" width="3.2" height="3.2" rx="1" transform="rotate(-12 26.5 22.5)" />
                </svg>
              </span>
              <span class="brand__text">
                <span class="brand__name">FixYourHub</span>
                <span class="brand__meta">BUILD. LAUNCH. SCALE.</span>
              </span>
            </a>
            <p style="margin-top: 18px;">Premium web development agency helping businesses get online fast with professional websites. Starting at Rs.7,999.</p>
          </div>
          <div>
            <h3 class="footer__title">Services</h3>
            <div class="footer__list">
              <a href="web.html">Web Development <span class="badge badge--secondary" style="font-size: 0.6rem; padding: 2px 6px; margin-left: 6px;">Available</span></a>
              <a href="index.html#services">App Development <span class="badge badge--secondary" style="font-size: 0.6rem; padding: 2px 6px; margin-left: 6px;">Soon</span></a>
              <a href="index.html#services">Custom Software <span class="badge badge--secondary" style="font-size: 0.6rem; padding: 2px 6px; margin-left: 6px;">Soon</span></a>
            </div>
          </div>
          <div>
            <h3 class="footer__title">Company</h3>
            <div class="footer__list">
              <a href="about.html">About</a>
              <a href="contact.html">Contact</a>
            </div>
          </div>
          <div>
            <h3 class="footer__title">Contact</h3>
            <div class="footer__list">
              <a href="mailto:fyhgroups@gmail.com">fyhgroups@gmail.com</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://x.com" target="_blank" rel="noreferrer">X / Twitter</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span>(c) 2026 FixYourHub. Premium web development for growing businesses.</span>
          <span>Kozhikode, Kerala, India</span>
        </div>
      </div>
    </footer>
  `
};

async function loadComponent(targetSelector, relativePath) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const root = document.body.dataset.siteRoot || ".";
  let html = componentFallbacks[relativePath] || "";

  try {
    const response = await fetch(`${root}/${relativePath}`);
    if (response.ok) {
      html = await response.text();
    }
  } catch (error) {
    console.warn(`Using inline fallback for ${relativePath}.`, error);
  }

  target.innerHTML = html;

  if (root !== ".") {
    target.querySelectorAll("a[href]").forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;
      anchor.setAttribute("href", `${root}/${href}`);
    });
  }
}

function normalizePath(value) {
  if (!value) return "";
  const trimmed = value.split("?")[0].split("#")[0];
  const withoutHtml = trimmed.replace(/\.html$/i, "");
  const withoutTrailing = withoutHtml.replace(/\/+$/, "");
  return withoutTrailing === "" ? "/" : withoutTrailing;
}

function setActiveNavLink() {
  const currentPath = normalizePath(window.location.pathname);
  const navLinks = document.querySelectorAll("[data-nav-link]");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const normalizedHref = normalizePath(href);
    const isActive = normalizedHref === currentPath;
    link.classList.toggle("is-active", isActive);
  });
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const message = form.querySelector("[data-form-message]");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.querySelector("#name")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";
    const project = form.querySelector("#project")?.value.trim() || "";

    if (!name || !email || !project) {
      message.textContent = "Please complete your name, email, and project details.";
      message.className = "form-message is-error";
      return;
    }

    if (!emailPattern.test(email)) {
      message.textContent = "Please enter a valid email address.";
      message.className = "form-message is-error";
      return;
    }

    message.textContent = "Thanks. Your message is queued for the FixYourHub team.";
    message.className = "form-message is-success";
    form.reset();
  });
}

async function bootstrapSite() {
  try {
    await Promise.all([
      loadComponent("#navbar-root", "components/navbar.html"),
      loadComponent("#footer-root", "components/footer.html")
    ]);
  } catch (error) {
    console.error("Unable to load shared components.", error);
  }

  setActiveNavLink();

  const setupNavbar = () => {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    const overlay = document.querySelector("[data-menu-overlay]");

    if (!toggle || !menu || !overlay) return;

    const openMenu = () => {
      document.body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("is-open");
      overlay.classList.add("is-open");
    };

    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      overlay.classList.remove("is-open");
    };

    toggle.addEventListener("click", () => {
      if (menu.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener("click", closeMenu);

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  };
  setupNavbar();

  if (typeof window.renderProductCards === "function") await window.renderProductCards();
  if (typeof window.setupAnimations === "function") window.setupAnimations();
  setupContactForm();
  if (typeof window.setupNavbar === "function") window.setupNavbar();
}

document.addEventListener("DOMContentLoaded", bootstrapSite);
