/**
 * Contact Section Interactions
 * Enhanced UI for the FixYourHub contact form and contact cards.
 */

const initContactInteractions = () => {
  const contactForm = document.querySelector("[data-contact-form]");
  if (!contactForm) return;

  const inputs = contactForm.querySelectorAll("input, textarea");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const formMessage = contactForm.querySelector("[data-form-message]");

  // Input styling and error handling
  inputs.forEach((input) => {
    const group = input.closest(".input-group");

    input.addEventListener("focus", () => {
      group.classList.add("is-focused");
    });

    input.addEventListener("blur", () => {
      group.classList.remove("is-focused");
    });
  });

  // PART 3 — BUTTON RIPPLE EFFECT
  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // PART 4 — FORM SUBMIT EXPERIENCE (WhatsApp Integration)
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get Values
    const name = contactForm.querySelector("#name").value.trim();
    const email = contactForm.querySelector("#email").value.trim();
    const company = contactForm.querySelector("#company").value.trim();
    const project = contactForm.querySelector("#project").value.trim();

    // Basic validation
    let isValid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    inputs.forEach(input => {
      const group = input.closest(".input-group");
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        group.classList.add("is-error");
      } else if (input.type === 'email' && !emailPattern.test(input.value.trim())) {
        isValid = false;
        group.classList.add("is-error");
      } else {
        group.classList.remove("is-error");
      }
    });

    if (!isValid) return;

    // UI Feedback
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Redirecting...";
    formMessage.textContent = "";
    formMessage.className = "form-message";

    // Create & Encode Message
    const message = `Hello FixYourHub,\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nProject Details:\n${project}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917907380837?text=${encodedMessage}`;

    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset UI
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
    formMessage.textContent = "WhatsApp opened. Redirecting to your conversation...";
    formMessage.className = "form-message is-success";
    
    contactForm.reset();
  });

  // PART 5 — CONTACT CARDS HOVER (Handled via CSS for better performance)
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
      card.style.borderColor = "rgba(108, 92, 231, 0.4)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.borderColor = "";
    });
  });
};

// Initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactInteractions);
} else {
  initContactInteractions();
}
