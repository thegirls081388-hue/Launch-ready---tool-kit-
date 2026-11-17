document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("[data-menu-toggle], .menu-toggle, #menu-toggle");
  const navigation = document.querySelector("[data-navigation], .nav-links, #nav-links");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      navigation.classList.toggle("is-open");
    });
  }

  const startupForm = document.querySelector("#startup-cost-form, [data-startup-calculator]");
  const startupOutput = document.querySelector("#startup-total, [data-startup-total]");

  if (startupForm && startupOutput) {
    const updateTotal = () => {
      const fields = startupForm.querySelectorAll('input[type="number"]');
      const total = [...fields].reduce((sum, field) => sum + (Number(field.value) || 0), 0);
      startupOutput.textContent = money(total);
    };
    startupForm.addEventListener("input", updateTotal);
    updateTotal();
  }

  const pricingForm = document.querySelector("#pricing-form, [data-pricing-calculator]");
  const pricingOutput = document.querySelector("#pricing-result, [data-pricing-result]");

  if (pricingForm && pricingOutput) {
    const updatePricing = () => {
      const price = Number(pricingForm.querySelector('[name="price"]')?.value) || 0;
      const quantity = Number(pricingForm.querySelector('[name="quantity"]')?.value) || 0;
      const costs = Number(pricingForm.querySelector('[name="costs"]')?.value) || 0;
      pricingOutput.textContent = money(price * quantity - costs);
    };
    pricingForm.addEventListener("input", updatePricing);
    updatePricing();
  }

  const checklistButton = document.querySelector("#download-checklist, [data-download-checklist]");

  if (checklistButton) {
    checklistButton.addEventListener("click", () => {
      const checklist = [
        "LAUNCHREADY TOOLKIT — BUSINESS LAUNCH CHECKLIST",
        "",
        "[ ] Choose a customer and problem to solve",
        "[ ] Research competitors and validate demand",
        "[ ] Write your offer and set a price",
        "[ ] Estimate startup and monthly costs",
        "[ ] Check business name availability",
        "[ ] Check registration, tax, and licensing requirements",
        "[ ] Create your website and contact method",
        "[ ] Prepare privacy policy and terms if needed",
        "[ ] Test your offer with potential customers",
        "[ ] Track sales, expenses, and feedback"
      ].join("\n");

      const blob = new Blob([checklist], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "launchready-business-checklist.txt";
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  function money(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  }
});
