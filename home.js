document.addEventListener('DOMContentLoaded', () => {
  // --- Display the Current Week's Date ---
  const dateElement = document.createElement('p');
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday as the first day
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  dateElement.textContent = `Week starts on: ${firstDayOfWeek.toLocaleDateString(undefined, options)}`;
  dateElement.style.fontSize = "1.2em";
  dateElement.style.fontWeight = "bold";
  dateElement.style.textAlign = "center"; // Center align the date
  dateElement.style.margin = "20px 0"; // Add spacing

  // Insert the date above the footer
  const footer = document.querySelector('.main-footer');
  if (footer) {
    footer.before(dateElement);
  } else {
    console.error("Footer element not found.");
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
});



