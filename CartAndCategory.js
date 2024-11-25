// ********************** CART **********************
window.onload = function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cartItems");
    let totalCost = 0;

    cartContainer.innerHTML = ""; // Clear cart container before adding items

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

    // Update total cost
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.value = `${totalCost.toFixed(2)} SAR`;
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

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Directly update the UI for the changed item
    updateCartUI(cartItems);
}

// Remove item from the cart
function removeItemFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1); // Remove the item

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Directly update the UI
    updateCartUI(cartItems);
}

// Empty the entire cart
function emptyCart() {
    localStorage.removeItem("cart");
    updateCartUI([]);
}

// Function to update the cart UI after changes
function updateCartUI(cartItems) {
    const cartContainer = document.getElementById("cartItems");
    let totalCost = 0;

    cartContainer.innerHTML = ""; // Clear cart container before adding items

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

    // Update total cost
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.value = `${totalCost.toFixed(2)} SAR`;
    }
}