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

});