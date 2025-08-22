// ✅ Initialize EmailJS
(function () {
  emailjs.init("MlLsF1ANcXgkTiyry"); // replace with your EmailJS public key
})();

document.addEventListener("DOMContentLoaded", function () {
    /* -------------------------
     Utility: Handle Button Loader
  ------------------------- */
  function setLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = `
        <span class="flex items-center justify-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          Sending...
        </span>
      `;
    } else {
      button.disabled = false;
      if (button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
      }
    }
  }


    /* -------------------------
     Time Slot Validation
  ------------------------- */
  function updateTimeSlots() {
    const dateInput = document.getElementById("visitDate");
    const timeSelect = document.getElementById("visitTime");
    if (!dateInput || !timeSelect) return;

    const selectedDate = new Date(dateInput.value);
    const now = new Date();

    // Define working hours (10 AM – 6 PM)
    const workingHours = {
      start: 10,
      end: 18,
    };

    // Reset all options
    [...timeSelect.options].forEach((opt) => (opt.disabled = false));

    if (
      selectedDate.toDateString() === now.toDateString() // today
    ) {
      [...timeSelect.options].forEach((opt) => {
        if (!opt.value) return;
        const [hour, modifier] = opt.value.split(" ");
        let [h, m] = hour.split(":").map(Number);
        if (modifier === "PM" && h < 12) h += 12;

        const optionTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          h,
          m
        );

        if (optionTime <= now) {
          opt.disabled = true;
        }
      });

      // If all times are disabled → move to next day
      const validOption = [...timeSelect.options].find(
        (opt) => opt.value && !opt.disabled
      );
      if (!validOption) {
        const nextDay = new Date();
        nextDay.setDate(now.getDate() + 1);
        dateInput.value = nextDay.toISOString().split("T")[0];
        updateTimeSlots(); // re-check
      }
    }
  }

  const dateInput = document.getElementById("visitDate");
  if (dateInput) {
    // Prevent selecting past dates
    const today = new Date();
    dateInput.min = today.toISOString().split("T")[0];
    dateInput.addEventListener("change", updateTimeSlots);
  }

  const timeSelect = document.getElementById("visitTime");
  if (timeSelect) {
    timeSelect.addEventListener("focus", updateTimeSlots);
  }

  /* -------------------------
     Site Visit Booking Form
  ------------------------- */
  const siteVisitForm = document.getElementById("siteVisitForm");
  if (siteVisitForm) {
    siteVisitForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const templateParams = {
        visit_name: document.getElementById("visitName").value,
        visit_phone: document.getElementById("visitPhone").value,
        visit_date: document.getElementById("visitDate").value,
        visit_time: document.getElementById("visitTime").value,
      };

      emailjs
        .send("service_1cgyw69", "template_3k57i48", templateParams)
        .then(
          function () {
            alert(
              "✅ Thank you! Your site visit has been booked. We will contact you shortly."
            );
            siteVisitForm.reset();
            document.getElementById("siteVisitModal").classList.add("hidden"); // close modal
          },
          function (error) {
            alert("❌ Failed to send. Please try again.");
            console.error("EmailJS error:", error);
          }
        ).finally(() => setLoading(submitBtn, false));
    });
  }

  /* -------------------------
     Enquiry Form
  ------------------------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const templateParams = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        interest: document.getElementById("interest").value,
        message: document.getElementById("message").value,
      };

      emailjs
        .send("service_1cgyw69", "template_zesri0f", templateParams)
        .then(
          function () {
            alert("✅ Thank you! Your enquiry has been sent.");
            contactForm.reset();
          },
          function (error) {
            alert("❌ Failed to send. Please try again.");
            console.error("EmailJS error:", error);
          }
        ).finally(() => setLoading(submitBtn, false));
    });
  }
});
