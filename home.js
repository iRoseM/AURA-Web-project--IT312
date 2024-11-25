document.addEventListener('DOMContentLoaded', () => {
  const dateElement = document.createElement('p');
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday as the first day
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
  dateElement.textContent = `Week starts on: ${firstDayOfWeek.toLocaleDateString(undefined, options)}`;
  dateElement.style.fontSize = "1em";
  dateElement.style.fontWeight = "bold";
  dateElement.style.textAlign = "center"; // Center align the date
  dateElement.style.padding = "38px 0"; // Add spacing
  dateElement.style.margin = "0px"; // Add spacing
  dateElement.style.backgroundColor= "#0c0907";
  dateElement.style.color= "#d2cbc3";
  
  // Select the placeholder paragraph by its id
  const placeholder = document.getElementById('week-start-date');
  if (placeholder) {
    placeholder.replaceWith(dateElement); // Replace the placeholder with the new date element
  } else {
    console.error("Placeholder element not found.");
  }

  // --- "Show More Offers" Button Functionality ---
  const offersContainer = document.querySelector('.homeoffers');
  if (!offersContainer) {
    console.error("Offers container not found.");
  } else {
    const showMoreButton = document.createElement('button');
    showMoreButton.textContent = "Show More Offers";
    showMoreButton.className = "show-more-button";
    showMoreButton.style.display = 'block'; // Makes the button a block element
    showMoreButton.style.margin = '20px auto'; // Centers the button horizontally
    showMoreButton.style.padding = '10px 20px';
    showMoreButton.style.fontSize = '1rem';
    showMoreButton.style.backgroundColor = '#000';
    showMoreButton.style.color = '#fff';
    showMoreButton.style.border = 'none';
    showMoreButton.style.borderRadius = '5px';
    showMoreButton.style.cursor = 'pointer';
    showMoreButton.style.textAlign = 'center';

    let offersVisible = 4; // Initially show 4 offers

    // Hide offers beyond the initial limit
    const offers = Array.from(offersContainer.children);
    offers.forEach((offer, index) => {
      if (index >= offersVisible) offer.style.display = 'none';
    });

    // Show more offers when the button is clicked
    showMoreButton.addEventListener('click', () => {
      offersVisible += 4; // Show 4 more offers
      offers.forEach((offer, index) => {
        if (index < offersVisible) offer.style.display = '';
      });

      // Hide button if all offers are visible
      if (offersVisible >= offers.length) {
        showMoreButton.style.display = 'none';
      }
    });

    // Append the button after the offers container
    offersContainer.after(showMoreButton);
  }

  // --- Hover to Display Additional Review Details ---
  const reviewItems = document.querySelectorAll('.review-item');
  if (reviewItems.length === 0) {
    console.error("No review items found.");
    return;
  }

  reviewItems.forEach((review) => {
    const reviewUser = review.querySelector('.review-user');
    console.log('Review User:', reviewUser?.innerHTML); // Debugging
  
    // Extract required details from the review
    const customerName = reviewUser?.textContent.split('★')[0].trim() || "Unknown"; // Get name before stars
    const rating = reviewUser?.textContent.split('★').slice(1).join('★').trim() || "No rating"; // Get stars only
    const feedback = review.querySelector('p')?.textContent.trim() || "No feedback available.";
    const productName = Array.from(review.querySelectorAll('.homeproduct p'))
      .map((product) => product.textContent.trim())
      .join(', ') || "No products listed.";
  
    // Create the hover details div
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'hover-details';
    detailsDiv.style.display = 'none'; // Initially hidden
    detailsDiv.style.position = 'absolute';
    detailsDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    detailsDiv.style.color = 'white';
    detailsDiv.style.padding = '10px';
    detailsDiv.style.borderRadius = '5px';
    detailsDiv.style.maxWidth = '300px';
    detailsDiv.style.zIndex = '1000';
    detailsDiv.style.opacity = '0'; // Start with invisible state
    detailsDiv.style.transition = 'opacity 0.3s ease-in-out'; // Smooth fade-in/out
  
    // Populate the details
    detailsDiv.innerHTML = `
      <strong>Customer:</strong> ${customerName}<br>
      <strong>Product:</strong> ${productName}<br>
      <strong>Rating:</strong> ${rating}<br>
      <strong>Feedback:</strong> ${feedback}
    `;
  
    // Append the details div to the review
    review.style.position = 'relative'; // Ensure the parent is relatively positioned
    review.appendChild(detailsDiv);
  
    // Show the details div on hover
    review.addEventListener('mouseenter', () => {
      detailsDiv.style.display = 'block';
      setTimeout(() => (detailsDiv.style.opacity = '1'), 0); // Fade-in effect
    });
  
    // Hide the details div when hover ends
    review.addEventListener('mouseleave', () => {
      detailsDiv.style.opacity = '0'; // Fade-out effect
      setTimeout(() => (detailsDiv.style.display = 'none'), 300); // Wait for fade-out to complete
    });
  
    // Optional: Adjust the position of the hover div dynamically
    review.addEventListener('mousemove', (event) => {
      detailsDiv.style.top = `${event.clientY - review.getBoundingClientRect().top + 10}px`;
      detailsDiv.style.left = `${event.clientX - review.getBoundingClientRect().left + 10}px`;
    });
  });

  // --- Slider Functionality ---
  const slider = document.querySelector(".slider");
  const images = slider.querySelectorAll("img");
  const navLinks = document.querySelectorAll(".slider-nav a");

  let currentIndex = 0;

  // Function to go to the current slide
  function goToSlide(index) {
    const slideWidth = slider.offsetWidth;
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
    updateNav();
  }

  // Update navigation dots to reflect the active slide
  function updateNav() {
    navLinks.forEach((link, index) => {
      if (index === currentIndex) {
        link.style.backgroundColor = "rgba(255, 255, 255, 1)";
      } else {
        link.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
      }
    });
  }

  // Add event listeners to navigation dots
  navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      goToSlide(index);
    });
  });

  // Automatically move to the next slide every 5 seconds
  setInterval(() => {
    let nextIndex = (currentIndex + 1) % images.length;
    goToSlide(nextIndex);
  }, 5000); // Change slide every 5 seconds

  // Initialize the first slide
  goToSlide(0);
});



