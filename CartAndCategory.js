 // Define the sorting function
 function sortProducts() {
    const sortOption = document.getElementById("sort").value;
    const productList = document.getElementById("product-list");
    const products = Array.from(productList.getElementsByClassName("cateproduct"));

    if (!products.length) return;

    // Function to extract price and convert it to a number for sorting
    const getPrice = (product) => {
        const priceText = product.querySelector(".cateprodPrice").innerText;
        return parseFloat(priceText.replace(' SAR', '').trim());
    };

    // Sort products based on the selected option
    if (sortOption === "low-high") {
        products.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortOption === "high-low") {
        products.sort((a, b) => getPrice(b) - getPrice(a));
    }

    // Reorder the product list based on the sorted array
    products.forEach(product => {
        productList.appendChild(product); // Re-append to reorder
    });
}

// Listen for the sort dropdown change event
document.addEventListener('DOMContentLoaded', function() {
    const sortElement = document.getElementById("sort");
    if (sortElement) {
        sortElement.addEventListener("change", sortProducts);
    }
});

// Handle add to cart functionality
function addToCart(productId) {
    const product = document.getElementById(productId);
    if (!product) return; // Handle case where the product is not found

    const quantityElement = product.querySelector('.quantity');
    const quantity = quantityElement ? parseInt(quantityElement.innerText) : 1; // Default to 1 if not found

    const productName = product.querySelector('.cateprodTitle')?.innerText || "Unknown Product";
    const productPrice = product.querySelector('.cateprodPrice')?.innerText.replace(' SAR', '').trim() || "0";

    const cartItem = { name: productName, price: parseFloat(productPrice), quantity: quantity };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally show a success notification
    alert(`${productName} has been added to the cart!`);
}

// Update product quantity
function updateQuantity(productId, operation) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    if (!quantityElement) return; // If quantity element doesn't exist, do nothing

    let currentQuantity = parseInt(quantityElement.innerText);
    if (isNaN(currentQuantity)) currentQuantity = 1; // Fallback in case quantity isn't valid

    if (operation === 'increment') {
        currentQuantity += 1;
    } else if (operation === 'decrement' && currentQuantity > 1) {
        currentQuantity -= 1;
    }

    quantityElement.innerText = currentQuantity; // Update the displayed quantity
}

// Handle cart loading (if applicable)
window.onload = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (!cartItemsContainer) return; // If the container doesn't exist, do nothing

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: ${item.price} SAR</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });
};

// ********************** CART **********************
      // Retrieve cart items from localStorage and display
      window.onload = function() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById("cartItems");
        let totalCost = 0;

        cartContainer.innerHTML = '';  // Clear existing items

        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            
            // Product Image
            let itemImage = document.createElement('img');
            
            itemImage.src = item.Image;
            itemImage.alt = item.name;
           
            
            itemDiv.appendChild(itemImage);
            
            const itemName = document.createElement('p');
            // itemName.innerText = `${item.name} - ${item.quantity} x ${item.price}`;
            itemName.innerText = `${item.name}`;
            itemName.innerText += `\n${item.price} SAR`;
            itemDiv.appendChild(itemName);

            // Quantity controls
            const quantityControl = document.createElement('div');
            quantityControl.innerHTML = `
                <button class="btn-quantity" onclick="updateQuantity(${index}, 'decrement')">-</button>
                <span>${item.quantity}</span>
                <button class="btn-quantity" onclick="updateQuantity(${index}, 'increment')">+</button>
            `;
            itemDiv.appendChild(quantityControl);

            // Remove button
            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remove';
            removeButton.onclick = function() {
                removeItemFromCart(index);
            };
            itemDiv.appendChild(removeButton);

            cartContainer.appendChild(itemDiv);

            totalCost += parseFloat(item.price) * item.quantity;
            
        });

        // Display total cost
        document.getElementById("total").value = `${totalCost.toFixed(2)} SAR`;
    }

    // Update the quantity of an item
    function updateQuantity(index, operation) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (operation === 'increment') {
            cartItems[index].quantity += 1;
        } else if (operation === 'decrement' && cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.onload();  // Reload cart display
    }

    // Remove item from cart
    function removeItemFromCart(index) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        window.onload();  // Reload cart display
    }

    // Empty the entire cart
    function emptyCart() {
        localStorage.removeItem('cart');
        window.onload();  // Reload to show empty cart
    }