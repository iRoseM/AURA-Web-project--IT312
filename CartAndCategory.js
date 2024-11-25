// Cart functionality
window.onload = function () {
    updateCartUI(); // Initialize the cart UI

    // Attach functionality to checkout button
    const checkoutButton = document.getElementById("checkout");
    if (checkoutButton) {
        checkoutButton.onclick = function () {
            const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
            const updatedTotalCost = calculateTotalCost(cartItems); // Get the latest total
            alert(`Thank you for your purchase! Your total cost is ${updatedTotalCost.toFixed(2)} SAR.`);
            window.location.href = "EvaluationPage.html"; // Redirect to evaluation page
        };
    }
};

// Update quantity of item in the cart
function updateQuantity(index, operation) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (operation === "increment") {
        cartItems[index].quantity += 1;
    } else if (operation === "decrement" && cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartUI(); // Update UI with the latest cart state
}

// Remove item from the cart
function removeItemFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1); // Remove the item
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartUI(); // Update UI after removal
}

// Empty the entire cart
function emptyCart() {
    localStorage.removeItem("cart"); // Clear cart in localStorage
    updateCartUI([]); // Update UI to show an empty cart
}

// Function to calculate total cost
function calculateTotalCost(cartItems) {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cartItems");
    let totalCost = 0;

    cartContainer.innerHTML = ""; // Clear the cart container before adding items

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        // Product Image
        const itemImage = document.createElement("img");
        itemImage.src = item.Image;
        itemImage.alt = item.name;
        itemDiv.appendChild(itemImage);

        // Item Info
        const itemInfoDiv = document.createElement("div");
        itemInfoDiv.classList.add("item-info");

        const itemName = document.createElement("p");
        itemName.innerText = `${item.name} \n ${item.price.toFixed(2)} SAR`;
        itemInfoDiv.appendChild(itemName);

        // Quantity Controls
        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("quantity-controls");
        quantityDiv.innerHTML = `
            <button class="quantity-btn" onclick="updateQuantity(${index}, 'decrement')">-</button>
            <input type="text" value="${item.quantity}" class="quantity-display" readonly>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 'increment')">+</button>
        `;
        itemInfoDiv.appendChild(quantityDiv);

        itemDiv.appendChild(itemInfoDiv);

        // Remove Button
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-btn");
        removeButton.innerText = "Remove";
        removeButton.onclick = function () {
            removeItemFromCart(index);
        };
        itemDiv.appendChild(removeButton);

        cartContainer.appendChild(itemDiv);

        totalCost += parseFloat(item.price) * item.quantity;
    });

    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.value = `${totalCost.toFixed(2)} SAR`;
    }
}