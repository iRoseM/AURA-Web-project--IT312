document.addEventListener("DOMContentLoaded", function () {
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
  displayProducts();
});