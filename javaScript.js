document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  let nameField = document.getElementById("name");
  let prodImageUpload = document.getElementById("prodImageUpload");
  let priceField = document.getElementById("price");
  let categorySelect = document.getElementById("category");
  let quantityField = document.getElementById("quantity");
  let descriptionTextarea = document.getElementById("description");
  let submit = document.getElementById("adproduct");

  // Initialize the product data array
  let dataPro;
  if (localStorage.getItem("product") != null) {
      dataPro = JSON.parse(localStorage.getItem("product"));
  } else {
      dataPro = [];
  }

  // Function to validate form inputs
  function validateForm() {
      // Check if all fields are filled
      if (!nameField.value || !priceField.value || !quantityField.value || !descriptionTextarea.value || !prodImageUpload.value) {
          alert("All fields are required!");
          return false;
      }

      // Ensure the name field does not start with a number
      if (/^\d/.test(nameField.value)) {
          alert("The product name cannot start with a number.");
          return false;
      }

      // Check if price and quantity are valid positive numbers
      if (isNaN(priceField.value) || priceField.value <= 0) {
          alert("Price must be a positive number.");
          return false;
      }

      if (isNaN(quantityField.value) || quantityField.value <= 0) {
          alert("Quantity must be a positive number.");
          return false;
      }

      return true; // Return true if all inputs are valid
  }

  // Handle the add product button click event
  submit.onclick = function (event) {
      event.preventDefault(); // Prevent the form's default submit behavior

      // Validate the form
      if (!validateForm()) {
          return; // Stop if the form inputs are invalid
      }

      // Check if an image is uploaded
      if (prodImageUpload.files.length > 0) {
          const file = prodImageUpload.files[0];
          const reader = new FileReader();
      
          reader.onload = function(event) {
              // Create a new product object
              let newPro = {
                  name: nameField.value,
                  image: event.target.result,
                  price: parseFloat(priceField.value),
                  category: categorySelect.value,
                  quantity: parseInt(quantityField.value),
                  description: descriptionTextarea.value
              };

              // Add the new product to the data array and save it in Local Storage
              dataPro.push(newPro);
              localStorage.setItem("product", JSON.stringify(dataPro));

              console.log("Products array:", dataPro);

              // Display confirmation message
              alert(`Product "${nameField.value}" has been added successfully!`);

              // Clear the form after adding the product
              nameField.value = "";
              prodImageUpload.value = "";
              priceField.value = "";
              categorySelect.value = "skincare"; // Reset to default value
              quantityField.value = "";
              descriptionTextarea.value = "";
          };

          reader.readAsDataURL(file); // Trigger file reading
      } else {
          alert("Please upload an image.");
      }
  };
});