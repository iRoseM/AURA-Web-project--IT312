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

  if (submit) {
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
}

  const skincareContainer = document.getElementById("skincareProducts");
  const makeupContainer = document.getElementById("makeupProducts");
  const hairToolsContainer = document.getElementById("hairToolsProducts");

  // Fetch products from Local Storage
  let products = JSON.parse(localStorage.getItem("product")) || [];

  // Function to display products by category
  function displayProducts() {
      // Clear existing content in each container
      skincareContainer.innerHTML = "";
      makeupContainer.innerHTML = "";
      hairToolsContainer.innerHTML = "";

      products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          

          productDiv.innerHTML = `
              <img class="prodPic main-img" src="${product.image}" alt="${product.name}">
              <div class="prodDetails">
                  <h3 class="prodTitle">${product.name}</h3>
                  <p class="prodRating">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
              </div>
              <p class="prodBrand">BeautyMe</p>
              <p class="prodPrice">${product.price} SAR</p>
              <p class="prodDescription">${product.description}</p>
              <p class="prodAvailability">In Stock</p>
              <button class="prodAddToCart">Add to Cart</button>
          `;

          // Append product to the correct category container
          if (product.category === "skincare") {
              skincareContainer.appendChild(productDiv);
          } else if (product.category === "makeup") {
              makeupContainer.appendChild(productDiv);
          } else if (product.category === "hair-tools") {
              hairToolsContainer.appendChild(productDiv);
          }
      });
  }

  // Display products on page load
  



  //Managing offer code:
  let proName = document.getElementById("productName");
  let prodNo = document.getElementById("productNumber");
  let prodOrgPrice = document.getElementById("originalPrice");
  let prodDiscount = document.getElementById("discountApplied");
  let prodimg = document.getElementById("offerImageUpload");
  let createoffer = document.getElementById("addoffer");

  let dataoffer = JSON.parse(localStorage.getItem("offer")) || [];

  if (createoffer) {
    createoffer.onclick = function (event) {
      event.preventDefault();

      const requiredFields = [
        { field: proName, name: "Product Name" },
        { field: prodNo, name: "Product Number" },
        { field: prodOrgPrice, name: "Original Price" },
        { field: prodDiscount, name: "Discount Applied" },
      ];

      let emptyFields = requiredFields
        .filter(({ field }) => field.value.trim() === "")
        .map(({ name }) => name);

      if (emptyFields.length > 0) {
        alert("Please fill in the following fields: " + emptyFields.join(", "));
        return;
      }

      if (prodimg.files.length > 0) {
        const file = prodimg.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
          let newOff = {
            proName: proName.value,
            prodNo: prodNo.value,
            prodOrgPrice: prodOrgPrice.value,
            prodDiscount: prodDiscount.value,
            prodimg: e.target.result,
          };

          dataoffer.push(newOff);
          localStorage.setItem("offer", JSON.stringify(dataoffer));
          showOffer();
          clearFormData();
        };

        reader.readAsDataURL(file);
      } else {
        alert("Please upload an image.");
      }
    };
  }

  function showOffer() {
    let offersDiv = document.querySelector(".offersDiv");
    if (!offersDiv) return;

    let offers = dataoffer
      .map(
        (offer, i) => `
          <div class="offer">
            <div class="imageContainer">
              <img src="${offer.prodimg}" alt="${offer.proName}">
              <div class="discount-box">${offer.prodDiscount} OFF</div>
            </div>
            <label for="offeroil-${i}">${offer.proName}</label>
            <input type="checkbox" name="offer-${i}" id="offeroil-${i}">
          </div>
        `
      )
      .join("");

    offersDiv.innerHTML = offers;
  }

  function clearFormData() {
    proName.value = "";
    prodNo.value = "";
    prodOrgPrice.value = "";
    prodDiscount.value = "";
    prodimg.value = "";
  }

  let removeoffer = document.getElementById("removeoffer");
  if (removeoffer) {
    removeoffer.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");

      if (checkboxes.length > 0) {
        const confirmRemoval = confirm("Are you sure you want to delete the selected offers?");

        if (confirmRemoval) {
          dataoffer = dataoffer.filter(
            (_, index) => !document.getElementById(`offeroil-${index}`).checked
          );

          localStorage.setItem("offer", JSON.stringify(dataoffer));
          showOffer();
        }
      } else {
        alert("Please select at least one offer.");
      }
    });
  }

  // Initialize offers on page load
  showOffer();
  displayProducts();
});