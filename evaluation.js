document.addEventListener("DOMContentLoaded", function () {
  const submitButtons = document.querySelectorAll(".submitBtn");
  const orderSelect = document.getElementById("orderNumber");

  submitButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the product number
      const productElement = button.closest(".orderEvaluation");
      const productNumber = button.getAttribute("data-product");
      
      // Get the rating
      const stars = productElement.querySelectorAll(".stars .fa-star");
      let userRating = 0;

      stars.forEach((star, index) => {
        if (star.classList.contains("selected")) {
          userRating = index + 1;
        }
      });

      // Check if an order and rating were selected
      if (!orderSelect.value) {
        alert("Please select an order from the dropdown list.");
        return;
      }
      if (userRating === 0) {
        alert("Please select a rating score.");
        return;
      }

      // Display confirmation message
      alert(`Thank you for your feedback! Your rating for product#${productNumber} is ${userRating}`);

      // Redirect to the homepage
      window.location.href = "index.html"; // Update this to your homepage path
    });
  });

  // Handle rating selection and change star color
  document.querySelectorAll(".stars .fa-star").forEach((star) => {
    star.addEventListener("click", function () {
      const starsContainer = star.parentElement;
      const stars = starsContainer.querySelectorAll(".fa-star");
      const selectedRating = parseInt(star.getAttribute("data-value"));

      stars.forEach((s, index) => {
        if (index < selectedRating) {
          s.classList.add("selected");
        } else {
          s.classList.remove("selected");
        }
      });
    });
  });
});
