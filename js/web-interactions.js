document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

  setupWebHeroAnimations(prefersReducedMotion);
  setupPricingInteractions(prefersReducedMotion, supportsFinePointer);
  setupFeaturedProjects(prefersReducedMotion, supportsFinePointer);
});

/* ========================================================
   Web Hero — Animated Chart + Counters
   ======================================================== */
function setupWebHeroAnimations(prefersReducedMotion) {
  const chartLine = document.querySelector(".chart-line-path");
  const chartArea = document.querySelector(".chart-area-path");
  const chartDots = document.querySelectorAll(".chart-dot");
  const counters = document.querySelectorAll("[data-counter]");

  if (!chartLine && !counters.length) return;

  // Use IntersectionObserver to trigger animations when visible
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          triggerHeroAnimations(prefersReducedMotion);
        });
      },
      { threshold: 0.3 }
    );

    // Observe the panel
    const panel = document.querySelector(".hero__panel");
    if (panel) {
      observer.observe(panel);
    } else {
      // Fallback: animate immediately
      triggerHeroAnimations(prefersReducedMotion);
    }
  } else {
    triggerHeroAnimations(prefersReducedMotion);
  }

  function triggerHeroAnimations(reduced) {
    // Animate the chart line
    if (chartLine) {
      if (reduced) {
        chartLine.classList.add("is-visible");
        chartLine.style.strokeDashoffset = "0";
      } else {
        requestAnimationFrame(() => {
          chartLine.classList.add("is-visible");
        });
      }
    }

    // Animate the area fill
    if (chartArea) {
      setTimeout(() => {
        chartArea.classList.add("is-visible");
      }, reduced ? 0 : 600);
    }

    // Animate dots sequentially
    chartDots.forEach((dot, i) => {
      setTimeout(() => {
        dot.classList.add("is-visible");
      }, reduced ? i * 80 : 800 + i * 200);
    });

    // Animate cursor line
    const chartCursor = document.querySelector(".chart-cursor");
    if (chartCursor) {
      setTimeout(() => {
        chartCursor.classList.add("is-visible");
      }, reduced ? 0 : 1600);
    }

    // Animate counters
    counters.forEach((counter) => {
      if (reduced) {
        counter.textContent = counter.dataset.counter + (counter.dataset.suffix || "");
        return;
      }
      animateCounter(counter);
    });
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || "";
    if (!Number.isFinite(target)) return;

    const duration = 1400 + Math.random() * 400;
    const startTime = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const value = Math.round(target * easeOut(progress));
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }
}

/* ========================================================
   Pricing Cards — 3D tilt, feature reveal, amount animation
   ======================================================== */
function setupPricingInteractions(prefersReducedMotion, supportsFinePointer) {
  const pricingGrid = document.querySelector(".pricing-grid");
  if (!pricingGrid) return;

  const cards = Array.from(pricingGrid.querySelectorAll(".pricing-card"));
  if (!cards.length) return;

  const cardIndexMap = new Map(cards.map((card, index) => [card, index]));

  const resetCardState = (card) => {
    card.style.setProperty("--pricing-mouse-x", "50%");
    card.style.setProperty("--pricing-mouse-y", "50%");
    card.style.setProperty("--pricing-tilt-x", "0deg");
    card.style.setProperty("--pricing-tilt-y", "0deg");
  };

  const revealFeatures = (card) => {
    const features = Array.from(card.querySelectorAll(".feature-item"));
    features.forEach((item, index) => {
      const delay = prefersReducedMotion ? 0 : index * 95;
      window.setTimeout(() => {
        item.classList.add("visible");
      }, delay);
    });
  };

  const animateAmount = (card) => {
    const amountElement = card.querySelector(".amount");
    if (!amountElement || amountElement.dataset.animated === "true") return;

    const targetValue = Number((amountElement.textContent || "").replace(/[^\d]/g, ""));
    if (!Number.isFinite(targetValue) || targetValue <= 0) return;

    amountElement.dataset.animated = "true";

    const formatAmount = (value) => Math.round(value).toLocaleString("en-IN");
    if (prefersReducedMotion) {
      amountElement.textContent = formatAmount(targetValue);
      return;
    }

    const cardIndex = cardIndexMap.get(card) || 0;
    const duration = 980 + cardIndex * 180;
    const startDelay = cardIndex * 80;
    const startValue = Math.max(0, Math.round(targetValue * 0.56));
    const startTime = performance.now() + startDelay;
    const easeOut = (progress) => 1 - Math.pow(1 - progress, 3);

    const updateFrame = (now) => {
      if (now < startTime) {
        window.requestAnimationFrame(updateFrame);
        return;
      }

      const progress = Math.min(1, (now - startTime) / duration);
      const nextValue = startValue + (targetValue - startValue) * easeOut(progress);
      amountElement.textContent = formatAmount(nextValue);

      if (progress < 1) {
        window.requestAnimationFrame(updateFrame);
      }
    };

    window.requestAnimationFrame(updateFrame);
  };

  const revealCard = (card) => {
    if (card.dataset.enhancedReady === "true") return;
    card.dataset.enhancedReady = "true";
    card.classList.add("is-in-view");
    revealFeatures(card);
    animateAmount(card);
  };

  cards.forEach((card) => {
    resetCardState(card);
    card.addEventListener("focusin", () => card.classList.add("is-active"));
    card.addEventListener("focusout", (event) => {
      if (card.contains(event.relatedTarget)) return;
      card.classList.remove("is-active");
    });

    if (!prefersReducedMotion && supportsFinePointer) {
      card.addEventListener("mouseenter", () => card.classList.add("is-active"));
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xRatio = (x / rect.width) - 0.5;
        const yRatio = (y / rect.height) - 0.5;

        card.style.setProperty("--pricing-mouse-x", `${x.toFixed(2)}px`);
        card.style.setProperty("--pricing-mouse-y", `${y.toFixed(2)}px`);
        card.style.setProperty("--pricing-tilt-x", `${(-yRatio * 4.4).toFixed(2)}deg`);
        card.style.setProperty("--pricing-tilt-y", `${(xRatio * 5.2).toFixed(2)}deg`);
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("is-active");
        resetCardState(card);
      });
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealCard(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.28, rootMargin: "0px 0px -10% 0px" }
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    cards.forEach(revealCard);
  }

  if (!prefersReducedMotion && !supportsFinePointer && cards.length > 1) {
    let activeIndex = 0;
    cards[activeIndex].classList.add("is-active");
    window.setInterval(() => {
      cards[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % cards.length;
      cards[activeIndex].classList.add("is-active");
    }, 2400);
  }
}

/* ========================================================
   Featured Projects — External link with loading state
   ======================================================== */
function setupFeaturedProjects(prefersReducedMotion, supportsFinePointer) {
  window.navigateToProject = function navigateToProject(button) {
    const card = button.closest(".featured-project-card");
    const url = card ? card.getAttribute("data-url") : "";
    if (!url) return;

    button.classList.add("loading");
    const label = button.querySelector("span");
    if (label) label.textContent = "Opening...";

    window.setTimeout(() => {
      window.open(url, "_blank");
      button.classList.remove("loading");
      if (label) label.textContent = "Explore Project";
    }, 400);
  };

  if (prefersReducedMotion || !supportsFinePointer) return;

  document.querySelectorAll(".featured-project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    });
  });
}
