// =====================
// MAIN SCRIPT with EmailJS
// =====================
(function () {
  // Initialize EmailJS with your **public key**
  emailjs.init("MlLsF1ANcXgkTiyry"); // 🔑 replace with your public key
})();

document.addEventListener("DOMContentLoaded", function () {
  // =====================
  // DOM Elements
  // =====================
  const mobileNav = document.getElementById("mobileNav");
  const overlay = document.getElementById("overlay");

  const siteVisitModal = document.getElementById("siteVisitModal");
  const siteVisitForm = document.getElementById("siteVisitForm");
  const bookSiteVisitBtn = document.getElementById("bookSiteVisit");
  const closePopupBtn = document.getElementById("closePopup");
  const visitSuccessModal = document.getElementById("visitSuccessModal");
  const visitSuccessClose = document.getElementById("visitSuccessClose");

  const mobileNavToggle = document.querySelector(".mobile-menu-btn");
  const closeNav = document.getElementById("closeNav");
  const backToTopButton = document.getElementById("backToTop");


  const closeBtn = document.getElementById("closeNav");
  const menuLinks = document.querySelectorAll("#mobileNav nav a");

  const propertyCards = document.querySelectorAll(".property-card");
  const buttons = document.querySelectorAll(".btn");
  const authButtons = document.querySelectorAll(
    ".auth-buttons button, .mobile-auth-buttons button"
  );

  const contactForm = document.getElementById("propertyContactForm");
  const successModal = document.getElementById("successModal");
  const modalClose = document.getElementById("modalClose");
  const contactButtons = document.querySelectorAll(".contact-btn");
  const propertyNameField = document.getElementById("propertyName");

  const dateInput = document.getElementById("visitDate");
  const timeSelect = document.getElementById("visitTime");

  // =====================
  // Utility Functions
  // =====================
  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  function setLoading(button, isLoading, text = "Sending...") {
    if (!button) return;
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = `
        <span class="flex items-center justify-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          ${text}
        </span>
      `;
    } else {
      button.disabled = false;
      if (button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
      }
    }
  }

  // Auto-open Site Visit Modal after 30s
// =====================
setTimeout(function () {
    if (siteVisitModal && siteVisitModal.classList.contains("hidden")) {
        siteVisitModal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }
}, 1000); // 1000 ms = 1 second
  // =====================
  // Mobile Navigation
  // =====================
function openMobileNav() {
    mobileNav.classList.remove("-translate-x-full");
    mobileNav.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMobileNav() {
    mobileNav.classList.remove("translate-x-0");
    mobileNav.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

// Toggle open
  if (mobileNavToggle) mobileNavToggle.addEventListener("click", openMobileNav);

  // Close on X button
  if (closeBtn) closeBtn.addEventListener("click", closeMobileNav);

  // Close on overlay click
  if (overlay) overlay.addEventListener("click", closeMobileNav);

  // Close when clicking any menu link
  menuLinks.forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });

  // =====================
  // Site Visit Modal
  // =====================
  if (bookSiteVisitBtn) {
    bookSiteVisitBtn.addEventListener("click", () => openModal(siteVisitModal));
  }
  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", () =>
      closeModal(siteVisitModal)
    );
  }
  if (visitSuccessClose) {
    visitSuccessClose.addEventListener("click", () =>
      closeModal(visitSuccessModal)
    );
  }

  // Overlay click closes everything
  overlay.addEventListener("click", function () {
    if (mobileNav && mobileNav.classList.contains("active")) closeMobileNav();
    if (siteVisitModal && !siteVisitModal.classList.contains("hidden"))
      closeModal(siteVisitModal);
    if (visitSuccessModal && !visitSuccessModal.classList.contains("hidden"))
      closeModal(visitSuccessModal);
    if (successModal && successModal.classList.contains("active"))
      successModal.classList.remove("active");
  });

  // =====================
  // Site Visit Form + EmailJS
  // =====================
  if (siteVisitForm) {
    siteVisitForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = siteVisitForm.querySelector("button[type=submit]");
      setLoading(submitBtn, true);

      const templateParams = {
        visit_name: document.getElementById("visitName").value,
        visit_phone: document.getElementById("visitPhone").value,
        visit_date: document.getElementById("visitDate").value,
        visit_time: document.getElementById("visitTime").value,
      };

      emailjs
        .send("service_1cgyw69", "template_3k57i48", templateParams) // ⚡ replace IDs
        .then(() => {
          closeModal(siteVisitModal);
          openModal(visitSuccessModal);
          siteVisitForm.reset();
        })
        .catch((error) => {
          alert("❌ Failed to book site visit. Please try again.");
          console.error("EmailJS error:", error);
        })
        .finally(() => setLoading(submitBtn, false));
    });
  }

  // =====================
  // Back to top button
  // =====================
  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });
    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =====================
  // Property Card Hover
  // =====================
  propertyCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.08)";
    });
  });

  // =====================
  // Button Hover
  // =====================
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      if (
        this.classList.contains("btn-primary") ||
        this.classList.contains("btn-secondary")
      ) {
        this.style.transform = "translateY(-2px)";
        this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
      }
    });
    button.addEventListener("mouseleave", function () {
      if (
        this.classList.contains("btn-primary") ||
        this.classList.contains("btn-secondary")
      ) {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "none";
      }
    });
  });

  // =====================
  // Auth Buttons
  // =====================
  authButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const isLogin = this.textContent.toLowerCase().includes("login");
      alert(
        `${
          isLogin ? "Login" : "Signup"
        } feature would open a modal in the full application.`
      );
    });
  });

  // =====================
  // Contact Form + EmailJS
  // =====================
  if (contactForm) {
    contactButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const propertyName = this.getAttribute("data-property");
        propertyNameField.value = propertyName;
        document
          .getElementById("contact")
          .scrollIntoView({ behavior: "smooth" });
        document.getElementById(
          "message"
        ).value = `I'm interested in the ${propertyName}. Please provide more information.`;
      });
    });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector("button[type=submit]");
      setLoading(submitBtn, true);

      const templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        interest: document.getElementById("interest").value,
        message: document.getElementById("message").value,
      };

      emailjs
        .send("service_1cgyw69", "template_zesri0f", templateParams) // ⚡ replace IDs
        .then(() => {
          successModal.classList.add("active");
          overlay.classList.add("active");
          document.body.style.overflow = "hidden";
          contactForm.reset();
        })
        .catch((error) => {
          alert("❌ Failed to send enquiry. Please try again.");
          console.error("EmailJS error:", error);
        })
        .finally(() => setLoading(submitBtn, false));
    });

    if (modalClose) {
      modalClose.addEventListener("click", function () {
        successModal.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    }
  }

  // =====================
  // Site Visit Date/Time Validation
  // =====================
  if (dateInput) {
    const today = new Date();
    dateInput.min = today.toISOString().split("T")[0];
  }

  function updateTimeSlots() {
    const selectedDate = new Date(dateInput.value);
    const now = new Date();

    [...timeSelect.options].forEach((opt) => {
      if (!opt.value) return;
      opt.disabled = false;

      const [hourPart, modifier] = opt.value.split(" ");
      let [h, m] = hourPart.split(":").map(Number);
      if (modifier === "PM" && h < 12) h += 12;
      if (modifier === "AM" && h === 12) h = 0;

      const optionTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        h,
        m
      );

      if (selectedDate.toDateString() === now.toDateString() && optionTime <= now) {
        opt.disabled = true;
      }
    });

    const validOption = [...timeSelect.options].find(
      (opt) => opt.value && !opt.disabled
    );
    if (!validOption) {
      const nextDay = new Date();
      nextDay.setDate(now.getDate() + 1);
      dateInput.value = nextDay.toISOString().split("T")[0];
      updateTimeSlots();
    }
  }

  if (dateInput && timeSelect) {
    dateInput.addEventListener("change", updateTimeSlots);
    timeSelect.addEventListener("focus", updateTimeSlots);
  }
});
