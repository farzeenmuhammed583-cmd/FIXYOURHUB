window.fixYourHubProducts = [
  {
    name: "KHATA",
    tag: "Accounting",
    description: "Modern accounting infrastructure for small businesses that need clean workflows, smarter reporting, and a calm financial command center.",
    href: "products/khata/index.html",
    status: "Live Product"
  },
  {
    name: "SignalOps",
    tag: "Automation",
    description: "An intelligent operations layer for routing repetitive internal tasks, status updates, and approval flows with speed.",
    href: "#",
    status: "Coming Soon"
  },
  {
    name: "LaunchForge",
    tag: "Growth Stack",
    description: "A future-ready GTM workspace to help product teams coordinate launches, insights, and customer feedback loops.",
    href: "#",
    status: "In Design"
  }
];

const productCardFallback = `
  <article class="card product-card reveal">
    <div class="product-card__meta">
      <span class="product-card__tag">__TAG__</span>
      <span>__STATUS__</span>
    </div>
    <div>
      <h3>__NAME__</h3>
      <p>__DESCRIPTION__</p>
    </div>
    <div class="product-card__actions">
      <span class="badge __BADGE_CLASS__">__BADGE_TEXT__</span>
      <a class="button-secondary __BUTTON_CLASS__" href="__HREF__" __ARIA_DISABLED__>__CTA__</a>
    </div>
  </article>
`;

window.renderProductCards = async function renderProductCards() {
  const targets = document.querySelectorAll("[data-products-grid]");
  if (!targets.length) return;

  const root = document.body.dataset.siteRoot || ".";
  let template = productCardFallback;

  try {
    const response = await fetch(`${root}/components/product-card.html`);
    if (response.ok) {
      template = await response.text();
    }
  } catch (error) {
    console.warn("Using inline fallback for product cards.", error);
  }

  targets.forEach((target) => {
    const source = target.dataset.productsSource || "all";
    const products = source === "featured" ? window.fixYourHubProducts.slice(0, 3) : window.fixYourHubProducts;

    target.innerHTML = products
      .map((product) => {
        const isActive = product.href !== "#";
        return template
          .replace("__TAG__", product.tag)
          .replace("__STATUS__", product.status)
          .replace("__NAME__", product.name)
          .replace("__DESCRIPTION__", product.description)
          .replace("__BADGE_CLASS__", isActive ? "badge--cyan" : "")
          .replace("__BADGE_TEXT__", isActive ? "Ready to explore" : "Roadmap")
          .replace("__BUTTON_CLASS__", isActive ? "" : "is-disabled")
          .replace("__HREF__", isActive ? product.href : "#")
          .replace("__ARIA_DISABLED__", isActive ? "" : 'aria-disabled="true" tabindex="-1"')
          .replace("__CTA__", isActive ? (product.name === "KHATA" ? "Explore Product" : "Open Product") : "Coming Soon");
      })
      .join("");
  });
};