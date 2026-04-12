document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  setupHomeHeroAnimations(prefersReducedMotion);
});

/* ========================================================
   Home Hero — Animated Chart
   ======================================================== */
function setupHomeHeroAnimations(prefersReducedMotion) {
  const chartLine = document.querySelector(".hero-chart-line");
  const chartArea = document.querySelector(".hero-chart-area");
  const chartDots = document.querySelectorAll(".hero-chart-dot");
  const chartCursor = document.querySelector(".hero-chart-cursor");

  if (!chartLine && !chartDots.length) return;

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
    if (chartCursor) {
      setTimeout(() => {
        chartCursor.classList.add("is-visible");
      }, reduced ? 0 : 1600);
    }
  }
}
