document.addEventListener('DOMContentLoaded', () => {
  // --- Add the Date Functionality ---
  const placeholder = document.getElementById('week-start-date');
  if (placeholder) {
    const dateElement = document.createElement('p');
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday as the first day
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    dateElement.textContent = `Week starts on: ${firstDayOfWeek.toLocaleDateString(undefined, options)}`;
    dateElement.style.fontSize = "1em";
    dateElement.style.fontWeight = "bold";
    dateElement.style.textAlign = "center";
    dateElement.style.padding = "38px 0";
    dateElement.style.margin = "0px";
    dateElement.style.backgroundColor = "#0c0907";
    dateElement.style.color = "#d2cbc3";

    placeholder.replaceWith(dateElement);
  } else {
    console.error("Placeholder for date not found.");
  }

  // --- "Show More Offers" Button Functionality ---
  const offersContainer = document.querySelector('.homeoffers');
  if (offersContainer) {
    const showMoreButton = document.createElement('button');
    showMoreButton.textContent = "Show More Offers";
    showMoreButton.className = "show-more-button";
    showMoreButton.style.display = 'block';
    showMoreButton.style.margin = '20px auto';
    showMoreButton.style.padding = '10px 20px';
    showMoreButton.style.fontSize = '1rem';
    showMoreButton.style.backgroundColor = '#000';
    showMoreButton.style.color = '#fff';
    showMoreButton.style.border = 'none';
    showMoreButton.style.borderRadius = '5px';
    showMoreButton.style.cursor = 'pointer';

    let offersVisible = 4; // Initially show 4 offers
    const offers = Array.from(offersContainer.children);

    offers.forEach((offer, index) => {
      if (index >= offersVisible) offer.style.display = 'none';
    });

    showMoreButton.addEventListener('click', () => {
      offersVisible += 4;
      offers.forEach((offer, index) => {
        if (index < offersVisible) offer.style.display = '';
      });

      if (offersVisible >= offers.length) {
        showMoreButton.style.display = 'none';
      }
    });

    offersContainer.after(showMoreButton);
  } else {
    console.error("Offers container not found.");
  }

  // --- Add to Cart Functionality ---
  const addToCartButtons = document.querySelectorAll('.homeadd-to-cart');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      try {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('label').textContent;
        const productPrice = parseFloat(productCard.querySelector('.homeprice').textContent.replace(' SAR', ''));
        const productImage = productCard.querySelector('img').src;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex((item) => item.name === productName);

        if (existingItemIndex !== -1) {
          cart[existingItemIndex].quantity += 1;
        } else {
          cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} has been added to your cart.`);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    });
  });

  // --- Slider Functionality ---
  const slider = document.querySelector('.slider');
  if (slider) {
    const images = slider.querySelectorAll('img');
    const navLinks = document.querySelectorAll('.slider-nav a');
    let currentIndex = 0;

    function goToSlide(index) {
      const slideWidth = slider.offsetWidth;
      slider.style.transform = `translateX(-${slideWidth * index}px)`;
      currentIndex = index;
      updateNav();
    }

    function updateNav() {
      navLinks.forEach((link, index) => {
        link.style.backgroundColor = index === currentIndex ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.6)";
      });
    }

    navLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(index);
      });
    });

    setInterval(() => {
      let nextIndex = (currentIndex + 1) % images.length;
      goToSlide(nextIndex);
    }, 5000);

    goToSlide(0);
  } else {
    console.error("Slider not found.");
  }
});
