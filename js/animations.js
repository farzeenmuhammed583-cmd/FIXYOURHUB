window.setupAnimations = function setupAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -48px 0px"
      }
    );

    revealItems.forEach((item, index) => {
      item.style.setProperty("--stagger-delay", `${Math.min(index * 70, 320)}ms`);
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (prefersReducedMotion) return;

  const floaters = document.querySelectorAll("[data-float]");
  if (!floaters.length) return;

  const updateFloat = () => {
    const scrollFactor = window.scrollY * 0.04;
    floaters.forEach((element) => {
      const speed = Number(element.getAttribute("data-float-speed") || 1);
      element.style.transform = `translate3d(0, ${scrollFactor * speed}px, 0)`;
    });
  };

  updateFloat();
  window.addEventListener("scroll", updateFloat, { passive: true });
};