// script.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taxForm");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementsByClassName("close")[0];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      const income = parseFloat(document.getElementById("income").value);
      const extraIncome =
        parseFloat(document.getElementById("extraIncome").value) || 0;
      const deductions =
        parseFloat(document.getElementById("deductions").value) || 0;
      const age = document.getElementById("age").value;

      let tax = 0;
      if (income + extraIncome - deductions > 8000000) {
        if (age === "<40") {
          tax = 0.3 * (income + extraIncome - deductions - 8000000);
        } else if (age === ">=40<&lt;60") {
          tax = 0.4 * (income + extraIncome - deductions - 8000000);
        } else if (age === ">=60") {
          tax = 0.1 * (income + extraIncome - deductions - 8000000);
        }
      }

      showModal(tax);
    }
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function validateForm() {
    let isValid = true;
    const inputs = form.querySelectorAll('input[type="number"], select');
    inputs.forEach((input) => {
      const value = input.value.trim();
      if (!value) {
        isValid = false;
        input.nextElementSibling.style.display = "inline";
      } else {
        input.nextElementSibling.style.display = "none";
      }
    });
    return isValid;
  }

  function showModal(tax) {
    const taxResult = document.getElementById("taxResult");
    taxResult.textContent = `Tax to be paid: ${tax} Lakhs`;
    modal.style.display = "block";
  }
});
