const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (password.value !== confirmPassword.value) {
    signupMessage.textContent = "Passwords do not match.";
    signupMessage.className = "signup-error";
    return;
}

localStorage.setItem("chronovaName", name.value);
localStorage.setItem("chronovaEmail", email.value);
localStorage.setItem("chronovaPassword", password.value);

signupMessage.textContent = "Sign up successful!";
signupMessage.className = "signup-success";
    });
}

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const signupMessage = document.getElementById("signupMessage");

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const savedEmail = localStorage.getItem("chronovaEmail");
        const savedPassword = localStorage.getItem("chronovaPassword");

        if (email.value === savedEmail && password.value === savedPassword) {
        loginMessage.textContent = "Login successful!";
        loginMessage.className = "signup-success";
        window.location.href = "account.html";
}       else {
    loginMessage.textContent = "Invalid email or password.";
    loginMessage.className = "signup-error";
}
    });
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        let cart = JSON.parse(localStorage.getItem("chronovaCart")) || [];

        const existingProduct = cart.find(function(product) {
        return product.name === productName;
        });

        if (existingProduct) {
        existingProduct.quantity++;
        } else {
        cart.push({
        name: productName,
        price: productPrice,
        quantity: 1
    });
}

        localStorage.setItem("chronovaCart", JSON.stringify(cart));

        const cartCount = document.getElementById("cartCount");

        if (cartCount) {
        cartCount.textContent = cart.reduce(function(total, product) {
    return total + product.quantity;
    }, 0);
    }

    });

});


const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

if (cartItems) {

    const cart = JSON.parse(localStorage.getItem("chronovaCart")) || [];

    let total = 0;

    if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
}
    cart.forEach(function(product) {

        const item = document.createElement("div");

    item.innerHTML = `
    <span>${product.name} - ₦${product.price.toLocaleString()} - Quantity: ${product.quantity}</span>
    <div>
    <button class="decrease">−</button>
    <button class="increase">+</button>
    <button class="remove-item">Remove</button>
    </div>
    `;

    cartItems.appendChild(item);
    item.querySelector(".remove-item").addEventListener("click", function() {

    cart.splice(cart.indexOf(product), 1);

    localStorage.setItem("chronovaCart", JSON.stringify(cart));

    location.reload();

    });

    item.querySelector(".increase").addEventListener("click", function() {
    product.quantity++;

    localStorage.setItem("chronovaCart", JSON.stringify(cart));

    location.reload();
    });

    item.querySelector(".decrease").addEventListener("click", function() {
    if (product.quantity > 1) {
        product.quantity--;
        localStorage.setItem("chronovaCart", JSON.stringify(cart));
        location.reload();
    }
    });

        total += product.price * product.quantity;

    });

    cartTotal.textContent = total.toLocaleString();

}

const clearCart = document.getElementById("clearCart");

if (clearCart) {

    clearCart.addEventListener("click", function() {

        localStorage.removeItem("chronovaCart");

        setTimeout(function() {
        window.location.href = "index.html";
        }, 2000);

        cartItems.innerHTML = "";
        cartTotal.textContent = "0";

        const cartCount = document.getElementById("cartCount");

        if (cartCount) {
            cartCount.textContent = "0";
        }

    });

}
const checkoutButton = document.getElementById("checkoutButton");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function() {

        const cart = JSON.parse(localStorage.getItem("chronovaCart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        window.location.href = "checkout.html";

    });

}

if (window.location.pathname.includes("checkout.html")) {

    if (!localStorage.getItem("chronovaEmail")) {
        window.location.href = "login.html";
    }

}

const checkoutSummary = document.getElementById("checkoutSummary");

if (checkoutSummary) {

    const cart = JSON.parse(localStorage.getItem("chronovaCart")) || [];

    let summaryHTML = "<h2>Order Summary</h2>";
    let summaryTotal = 0;

    cart.forEach(function(product) {

        summaryHTML += `
            <p>${product.name} × ${product.quantity} - ₦${(product.price * product.quantity).toLocaleString()}</p>
        `;
        summaryTotal += product.price * product.quantity;

    });

    summaryHTML += `<h3>Total: ₦${summaryTotal.toLocaleString()}</h3>`;

    checkoutSummary.innerHTML = summaryHTML;

}


const checkoutForm = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");

const savedOrderNumber = localStorage.getItem("chronovaOrderNumber");
const homeButton = document.getElementById("homeButton");

if (savedOrderNumber && checkoutMessage) {
    checkoutMessage.textContent = "Your order number is " + savedOrderNumber + ".";
    checkoutMessage.className = "signup-success";

    if (homeButton) {
        homeButton.style.display = "block";
    }
}

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const orderNumber = "CH" + Math.floor(100000 + Math.random() * 900000);

        localStorage.setItem("chronovaOrderNumber", orderNumber);
        checkoutMessage.textContent = "Order placed successfully! Thank you for shopping with Chronova. Your order number is " + orderNumber + ".";
        document.getElementById("homeButton").style.display = "block";
        checkoutMessage.className = "signup-success";

        localStorage.removeItem("chronovaCart");


    });

}
const cartCount = document.getElementById("cartCount");

if (cartCount) {

    const cart = JSON.parse(localStorage.getItem("chronovaCart")) || [];

    cartCount.textContent = cart.reduce(function(total, product) {
    return total + (product.quantity || 1);
}, 0);

}
const accountName = document.getElementById("accountName");
const accountEmail = document.getElementById("accountEmail");

if (accountName && accountEmail) {

    accountName.textContent = localStorage.getItem("chronovaName") || "Guest";
    accountEmail.textContent = localStorage.getItem("chronovaEmail") || "No email found";

}

if (accountName && accountEmail) {

    if (!localStorage.getItem("chronovaEmail")) {
        window.location.href = "login.html";
    }

}

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function() {

    window.location.href = "login.html";

});

}