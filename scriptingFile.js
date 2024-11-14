document.addEventListener("DOMContentLoaded", () => {
  // Load Dark Mode Preference on Page Load
  const darkModePreference = localStorage.getItem("darkMode");
  if (darkModePreference === "true") {
    document.body.classList.add("dark-mode");

    const elementsToToggle = document.querySelectorAll(
      ".navbar, .user-cart, .main-footer, .homeoffers, .homeoffer, .homecategory-header, .homecategories, .homecategory-item, .reviews, .review-item, .vision, .contact, .social-media a, .banner"
    );

    elementsToToggle.forEach(element => {
      element.classList.add("dark-mode");
    });

    changeIcon(); // Update icons to match dark mode
  }

  // Toggle Dark Mode Function
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const elementsToToggle = document.querySelectorAll(
      ".navbar, .user-cart, .main-footer, .homeoffers, .homeoffer, .homecategory-header, .homecategories, .homecategory-item, .reviews, .review-item, .vision, .contact, .social-media a, .banner"
    );

    elementsToToggle.forEach(element => {
      element.classList.toggle("dark-mode");
    });

    // Save dark mode preference in localStorage
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));

    changeIcon();
  }

  const darkModeButton = document.getElementById("themeSelect");
  darkModeButton.addEventListener("click", toggleDarkMode);

  function changeIcon() {
    let logoimg = document.getElementById('logo-image');
    let cartimg = document.getElementById('carticon');
    let userimg = document.getElementById('userticon');
    let selectorimg = document.getElementById('themeSelect');
  
    if (document.body.classList.contains("dark-mode")) {
      selectorimg.src = "homepage-images/darktheme-dark.png";
      logoimg.src = "homepage-images/auralogo-dark.png";
      cartimg.src = "homepage-images/cart-dark.png";
      userimg.src = "homepage-images/user-dark.png";
    } else {
      selectorimg.src = "homepage-images/darktheme.png";
      logoimg.src = "AuraLogo1.png";
      cartimg.src = "homepage-images/cart.png";
      userimg.src = "homepage-images/user.png";
    }
  }

  let proName = document.getElementById("productName");
  let prodNo = document.getElementById("productNumber");
  let prodOrgPrice = document.getElementById("originalPrice");
  let prodDiscount = document.getElementById("discountApplied");
  let prodimg = document.getElementById("offerImageUpload");
  let createoffer = document.getElementById("addoffer");

  let dataoffer = JSON.parse(localStorage.getItem("offer")) || [];

  createoffer.onclick = function(event) {
    event.preventDefault();
  
    const requiredFields = [
      { field: proName, name: "Product Name" },
      { field: prodNo, name: "Product Number" },
      { field: prodOrgPrice, name: "Original Price" },
      { field: prodDiscount, name: "Discount Applied" }
    ];
  
    // Collect all empty fields
    let emptyFields = [];
    for (const { field, name } of requiredFields) {
      if (field.value.trim() === '') {
        emptyFields.push(name);
      }
    }
  
    // Alert user if there are empty fields
    if (emptyFields.length > 0) {
      alert("Please fill in the following fields: " + emptyFields.join(", "));
      return;
    }
  
    // Check if an image is uploaded
    if (prodimg.files.length > 0) {
      const file = prodimg.files[0];
      const reader = new FileReader();
  
      reader.onload = function(e) {
        let newOff = {
          proName: proName.value,
          prodNo: prodNo.value,
          prodOrgPrice: prodOrgPrice.value,
          prodDiscount: prodDiscount.value,
          prodimg: e.target.result // Store the image data URL
        };
  
        dataoffer.push(newOff);
        localStorage.setItem('offer', JSON.stringify(dataoffer));
        showOffer();
        clearFormData();
      };
  
      reader.readAsDataURL(file); // Trigger file reading
    } else {
      alert("Please upload an image.");
    }
  };

  function showOffer() {
    let offers = '';
    for (let i = 0; i < dataoffer.length; i++) {
      offers += `
        <div class="offer">
          <div class="imageContainer">
            <img src="${dataoffer[i].prodimg}" alt="${dataoffer[i].proName}">
            <div class="discount-box">${dataoffer[i].prodDiscount} OFF</div>
          </div>
          <label for="offeroil-${i}">${dataoffer[i].proName}</label>
          <input type="checkbox" name="offer-${i}" id="offeroil-${i}">
        </div>
      `;
    }

    document.querySelector('.offersDiv').innerHTML = offers;
  }

  function clearFormData() {
    proName.value = '';
    prodNo.value = '';
    prodOrgPrice.value = '';
    prodDiscount.value = '';
    prodimg.value = '';
  }

  document.getElementById("removeoffer").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  
    if (checkboxes.length > 0) {
      const confirmRemoval = confirm("Are you sure you want to delete the selected offers?");
      
      if (confirmRemoval) {
        const remainingOffers = dataoffer.filter((_, index) => {
          // Filter out offers that are selected by checking if the checkbox exists
          return !document.getElementById(`offeroil-${index}`).checked;
        });
  
        dataoffer = remainingOffers;
        localStorage.setItem('offer', JSON.stringify(dataoffer));
        showOffer();
      }
    } else {
      alert("Please select at least one offer.");
    }
  });

  // Load offers from localStorage when the page loads
  showOffer();
});