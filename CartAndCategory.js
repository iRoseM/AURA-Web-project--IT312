// ********************** CART **********************
window.onload = function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cartItems");
    let totalCost = 0;

    cartContainer.innerHTML = ""; 

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        const itemImage = document.createElement("img");
        itemImage.src = item.Image;
        itemImage.alt = item.name;
        itemDiv.appendChild(itemImage);

        const itemInfoDiv = document.createElement("div");
        itemInfoDiv.classList.add("item-info");

        const itemName = document.createElement("p");
        itemName.innerText = `${item.name} \n ${item.price.toFixed(2)} SAR`;
        itemInfoDiv.appendChild(itemName);

        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("quantity-controls");
        quantityDiv.innerHTML = `
            <button class="quantity-btn" onclick="updateQuantity(${index}, 'decrement')">-</button>
            <input type="text" value="${item.quantity}" class="quantity-display" readonly>
            <button class="quantity-btn" onclick="updateQuantity(${index}, 'increment')">+</button>
        `;
        itemInfoDiv.appendChild(quantityDiv);

        itemDiv.appendChild(itemInfoDiv);

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

    document.getElementById("total").value = `${totalCost.toFixed(2)} SAR`;
};

function updateQuantity(index, operation) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (operation === "increment") {
        cartItems[index].quantity += 1;
    } else if (operation === "decrement" && cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.onload();
}

function removeItemFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.onload();
}

function emptyCart() {
    localStorage.removeItem("cart");
    window.onload();
}