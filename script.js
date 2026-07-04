// ==========================================================================
// Rapid Wash — plain JS (no build step, no framework)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

  // ---------- Footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile menu ----------
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIconOpen = document.getElementById("menuIconOpen");
  const menuIconClose = document.getElementById("menuIconClose");

  function setMenuOpen(open) {
    mobileMenu.classList.toggle("open", open);
    menuIconOpen.classList.toggle("hidden", open);
    menuIconClose.classList.toggle("hidden", !open);
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("open");
      setMenuOpen(!isOpen);
    });
  }

  document.querySelectorAll("[data-close-menu]").forEach((el) => {
    el.addEventListener("click", () => setMenuOpen(false));
  });

  // ---------- Scroll to quote form ----------
  document.querySelectorAll("[data-scroll-quote]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById("quote");
      if (target) target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    });
  });

  // ---------- Quote form ----------
  // This is a static site with no backend, so quote requests are delivered
  // by opening a pre-filled email to the address below instead of calling
  // an API. Update QUOTE_REQUEST_EMAIL to change where requests are sent.
  const QUOTE_REQUEST_EMAIL = "rapidwashprosbros@gmail.com";

  const quoteForm = document.getElementById("quoteForm");
  const quoteSuccess = document.getElementById("quoteSuccess");
  const submitBtn = document.getElementById("submitBtn");
  const resetFormBtn = document.getElementById("resetFormBtn");

  function showError(fieldName, message) {
    const errorEl = quoteForm.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorEl) errorEl.textContent = message || "";
  }

  function clearErrors() {
    quoteForm.querySelectorAll(".form-error").forEach((el) => (el.textContent = ""));
  }

  function validate(data) {
    let valid = true;
    clearErrors();

    if (!data.name.trim()) {
      showError("name", "Name is required");
      valid = false;
    }
    if (!data.phone.trim()) {
      showError("phone", "Phone number is required");
      valid = false;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showError("email", "Invalid email address");
      valid = false;
    }
    if (!data.service) {
      showError("service", "Service selection is required");
      valid = false;
    }

    return valid;
  }

  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        name: quoteForm.name.value,
        phone: quoteForm.phone.value,
        email: quoteForm.email.value,
        address: quoteForm.address.value,
        service: quoteForm.service.value,
        message: quoteForm.message.value,
      };

      if (!validate(data)) return;

      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";

      const subject = `Quote Request from ${data.name} - ${data.service}`;
      const bodyLines = [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        data.email ? `Email: ${data.email}` : null,
        data.address ? `Address: ${data.address}` : null,
        `Service: ${data.service}`,
        data.message ? `Message: ${data.message}` : null,
      ].filter(Boolean);

      const mailtoUrl = `mailto:${QUOTE_REQUEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
      window.location.href = mailtoUrl;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Get My Free Quote";
        quoteForm.classList.add("hidden");
        quoteSuccess.classList.remove("hidden");
      }, 400);
    });
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener("click", () => {
      quoteForm.reset();
      clearErrors();
      quoteSuccess.classList.add("hidden");
      quoteForm.classList.remove("hidden");
    });
  }

  // ---------- Scroll reveal ----------
  const revealTargets = document.querySelectorAll(
    "section:not(.hero), .feature-card, .review-card, .portfolio-pair"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealTargets.forEach((el) => {
      el.style.opacity = "0";
      observer.observe(el);
    });
  }
});
