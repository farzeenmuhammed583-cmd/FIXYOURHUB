/**
 * Services Section Interactions
 * Enhanced UI for Web Development, App Development, and Custom Software cards.
 */

const initServiceInteractions = () => {
  const serviceSection = document.getElementById("services");
  if (!serviceSection) return;

  const serviceCards = serviceSection.querySelectorAll(".card");

  serviceCards.forEach((card) => {
    // PART 1 — CARD HOVER LIFT & GLOW (JS-driven smooth transitions)
    card.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease, border-color 0.5s ease";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
      card.style.borderColor = "rgba(108, 92, 231, 0.6)";
      card.style.boxShadow = "0 12px 36px rgba(0, 0, 0, 0.3), 0 0 18px rgba(108, 92, 231, 0.14)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.borderColor = ""; // Revert to CSS default
      card.style.boxShadow = ""; // Revert to CSS default
    });

    // PART 2 — CURSOR FOLLOW GLOW (MODERN TOUCH)
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update cursor follow glow position via CSS variables
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    // PART 3 — SCALE TAGS (React, Node.js, etc.)
    const badges = card.querySelectorAll(".badge");
    badges.forEach((badge) => {
      badge.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease";
      
      badge.addEventListener("mouseenter", () => {
        badge.style.transform = "scale(1.05) translateY(-1px)";
        badge.style.background = "rgba(108, 92, 231, 0.2)";
      });
      
      badge.addEventListener("mouseleave", () => {
        badge.style.transform = "scale(1) translateY(0)";
        badge.style.background = ""; // Revert to CSS default
      });
    });
  });
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initServiceInteractions);
} else {
  initServiceInteractions();
}
