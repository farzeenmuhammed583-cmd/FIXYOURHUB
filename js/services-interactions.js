document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll("#services .service-card"));
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

  const resetCardState = (card) => {
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
    card.style.setProperty("--service-tilt-x", "0deg");
    card.style.setProperty("--service-tilt-y", "0deg");
  };

  const setActiveCard = (activeCard) => {
    cards.forEach((card) => {
      card.classList.toggle("is-active", card === activeCard);
    });
  };

  const addParticleLayer = (card, cardIndex) => {
    const preview = card.querySelector(".service-card__preview");
    if (!preview) return;

    const layer = document.createElement("div");
    layer.className = "service-card__particle-layer";
    layer.setAttribute("aria-hidden", "true");

    for (let index = 0; index < 6; index += 1) {
      const particle = document.createElement("span");
      particle.className = "service-card__particle";
      const horizontal = Math.min(88, 8 + (index * 15) + (cardIndex * 3));
      const duration = 4.5 + ((index + cardIndex) % 4) * 0.7;
      const delay = -1 * (index * 0.8 + cardIndex * 0.6);
      const drift = (index % 2 === 0 ? 14 : -14) + (cardIndex * 3);

      particle.style.setProperty("--particle-x", `${horizontal}%`);
      particle.style.setProperty("--particle-duration", `${duration}s`);
      particle.style.setProperty("--particle-delay", `${delay}s`);
      particle.style.setProperty("--particle-drift", `${drift}px`);
      layer.appendChild(particle);
    }

    preview.prepend(layer);
  };

  const setupCodeLineLoop = (card, cardIndex) => {
    const lines = Array.from(card.querySelectorAll(".service-card__code-line"))
      .filter((line) => line.textContent && line.textContent.trim().length > 0);

    if (!lines.length) return;
    lines[0].classList.add("is-active");

    if (prefersReducedMotion || lines.length === 1) return;

    let activeLine = 0;
    const loopDelay = 900 + (cardIndex * 120);

    window.setInterval(() => {
      lines[activeLine].classList.remove("is-active");
      activeLine = (activeLine + 1) % lines.length;
      lines[activeLine].classList.add("is-active");
    }, loopDelay);
  };

  cards.forEach((card, index) => {
    resetCardState(card);
    setupCodeLineLoop(card, index);

    if (!prefersReducedMotion) {
      addParticleLayer(card, index);
    }

    card.addEventListener("focusin", () => setActiveCard(card));
    card.addEventListener("focusout", (event) => {
      if (card.contains(event.relatedTarget)) return;
      setActiveCard(null);
    });

    if (!prefersReducedMotion && supportsFinePointer) {
      card.addEventListener("mouseenter", () => setActiveCard(card));
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xRatio = (x / rect.width) - 0.5;
        const yRatio = (y / rect.height) - 0.5;

        card.style.setProperty("--mouse-x", `${x.toFixed(2)}px`);
        card.style.setProperty("--mouse-y", `${y.toFixed(2)}px`);
        card.style.setProperty("--service-tilt-x", `${(-yRatio * 5).toFixed(2)}deg`);
        card.style.setProperty("--service-tilt-y", `${(xRatio * 6).toFixed(2)}deg`);
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("is-active");
        resetCardState(card);
      });
    }
  });

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in-view");
          if (!supportsFinePointer) setActiveCard(entry.target);
        });
      },
      { threshold: 0.45, rootMargin: "0px 0px -15% 0px" }
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    cards.forEach((card, index) => {
      card.classList.add("is-in-view");
      if (index === 0) card.classList.add("is-active");
    });
  }
});
