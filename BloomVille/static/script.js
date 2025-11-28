tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#25f46a",
                "background-light": "#f5f8f6",
                "background-dark": "#102216",
                "sunny-yellow": "#FFD966",
                "floral-pink": "#F38181",
                "earthy-brown": "#A1887F"
            },
            fontFamily: {
                display: ["Spline Sans", "sans-serif"],
                playful: ["Nunito", "sans-serif"]
            },
            borderRadius: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "3rem",
                full: "9999px",
            },
        },
    },
};

// Filter cards based on tag
document.addEventListener("DOMContentLoaded", () => {
    const chips = document.querySelectorAll(".chip");
    const cards = document.querySelectorAll(".product-card");

    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            const filter = chip.dataset.filter;

            // highlight selected chip
            chips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");

            cards.forEach(card => {
                const tag = card.dataset.tag.toLowerCase();

                if (filter === "all" || tag === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

// Saving cart
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, image) {
    let cart = getCart();

    let item = cart.find(f => f.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });
    }

    saveCart(cart);
    alert(`${name} added to cart!`);
}

// Generate basket cards
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("basketContainer")) {
        loadBasket();
    }
});

function loadBasket() {
    const cart = getCart();
    const container = document.getElementById("basketContainer");
    container.innerHTML = "";

    cart.forEach((item, index) => {
        container.innerHTML += `
            <div class="item-card flex justify-between bg-white rounded-2xl p-5 shadow-md" data-index="${index}">
                <div class="flex gap-4">
                    <div class="w-20 h-20 rounded-xl bg-cover bg-center" style="background-image: url('${item.image}')"></div>
                    <div>
                        <p class="font-bold text-lg text-[#0d1c12]">${item.name}</p>
                        <p class="text-gray-600 text-sm">Price: ₹${item.price}</p>
                        <p class="text-gray-700 font-medium total-price">Total: ₹${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <div class="flex items-center bg-[#f0f7f3] rounded-full px-3 py-1">
                        <button class="minus px-2 text-xl" onclick="changeQty(${index}, -1)">-</button>
                        <span class="qty px-3 font-semibold">${item.qty}</span>
                        <button class="plus px-2 text-xl" onclick="changeQty(${index}, 1)">+</button>
                    </div>

                    <button class="text-gray-500" onclick="removeItem(${index})">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        `;
    });

    updateTotals();
}

function changeQty(index, change) {
    let cart = getCart();
    cart[index].qty += change;

    if (cart[index].qty < 1) cart[index].qty = 1;

    saveCart(cart);
    loadBasket();
}

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    loadBasket();
}

function updateTotals() {
    const cart = getCart();
    let subtotal = 0;

    cart.forEach(item => subtotal += item.price * item.qty);

    const shipping = 50;

    document.getElementById("subtotalValue").textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById("totalValue").textContent = `₹${(subtotal + shipping).toFixed(2)}`;
}

