const componentFallbacks = {
  "components/navbar.html": `
    <nav class="site-nav" data-navbar>
      <div class="container site-nav__inner">
        <a class="brand" href="index.html" aria-label="FixYourHub home">
          <span class="brand__mark" aria-hidden="true"></span>
          <span class="brand__text">
            <span class="brand__name">FixYourHub</span>
            <span class="brand__meta">AI Product Platform</span>
          </span>
        </a>
        <div class="nav-links" aria-label="Primary">
          <a class="nav-link" data-nav-link href="products.html">Products</a>
          <a class="nav-link" data-nav-link href="about.html">About</a>
          <a class="nav-link" data-nav-link href="blog.html">Blog</a>
          <a class="nav-link" data-nav-link href="contact.html">Contact</a>
        </div>
        <div class="nav-actions">
          <a class="button" href="products.html">Explore Products</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation menu" data-menu-toggle>
            <span class="menu-toggle__line" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div class="mobile-menu__overlay" data-menu-overlay></div>
      <div class="mobile-menu" id="mobile-menu" data-mobile-menu>
        <div class="mobile-menu__links">
          <a class="nav-link" data-nav-link href="products.html">Products</a>
          <a class="nav-link" data-nav-link href="about.html">About</a>
          <a class="nav-link" data-nav-link href="blog.html">Blog</a>
          <a class="nav-link" data-nav-link href="contact.html">Contact</a>
        </div>
        <a class="button" href="products.html">Explore Products</a>
      </div>
    </nav>
  `,
  "components/footer.html": `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <a class="brand" href="index.html" aria-label="FixYourHub home">
              <span class="brand__mark" aria-hidden="true"></span>
              <span class="brand__text">
                <span class="brand__name">FixYourHub</span>
                <span class="brand__meta">Build. Launch. Scale.</span>
              </span>
            </a>
            <p style="margin-top: 18px;">FixYourHub builds premium AI-powered digital products for founders, operators, and modern software teams.</p>
          </div>
          <div>
            <h3 class="footer__title">Products</h3>
            <div class="footer__list">
              <a href="products/khata/index.html">KHATA</a>
            </div>
          </div>
          <div>
            <h3 class="footer__title">Company</h3>
            <div class="footer__list">
              <a href="about.html">About</a>
              <a href="blog.html">Blog</a>
              <a href="contact.html">Careers</a>
            </div>
          </div>
          <div>
            <h3 class="footer__title">Contact</h3>
            <div class="footer__list">
              <a href="mailto:hello@fixyourhub.com">hello@fixyourhub.com</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://x.com" target="_blank" rel="noreferrer">X / Twitter</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span>(c) 2026 FixYourHub. Designed for ambitious product teams.</span>
          <span>Premium AI interfaces, static-first delivery, modern startup polish.</span>
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

function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("[data-nav-link]");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const current = href.split("/").pop();
    const isActive = path === current || (path === "" && current === "index.html");
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
      document.body.classList.add("menu-is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.classList.add("is-active");
      menu.classList.add("is-active");
      overlay.classList.add("is-active");
    };

    const closeMenu = () => {
      document.body.classList.remove("menu-is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("is-active");
      menu.classList.remove("is-active");
      overlay.classList.remove("is-active");
    };

    toggle.addEventListener("click", () => {
      if (menu.classList.contains("is-active")) {
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
}

document.addEventListener("DOMContentLoaded", bootstrapSite);
