const CART_KEY = "shopease-cart";

const products = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "Fashion",
        price: 399,
        oldPrice: 599,
        rating: 4.5,
        description: "Comfortable everyday cotton T-shirt.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Running Sneakers",
        category: "Fashion",
        price: 1299,
        oldPrice: 1599,
        rating: 4.8,
        description: "Lightweight shoes for everyday activities.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1899,
        oldPrice: 2299,
        rating: 4.7,
        description: "Enjoy music with wireless convenience.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        oldPrice: 2999,
        rating: 4.6,
        description: "A modern watch for everyday use.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Fashion Shoulder Bag",
        category: "Accessories",
        price: 899,
        oldPrice: 1199,
        rating: 4.4,
        description: "A stylish bag for your daily essentials.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 499,
        oldPrice: 699,
        rating: 4.3,
        description: "Complete your look with classic sunglasses.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        name: "Travel Backpack",
        category: "Accessories",
        price: 999,
        oldPrice: 1299,
        rating: 4.6,
        description: "Carry your essentials wherever you go.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        name: "Digital Camera",
        category: "Electronics",
        price: 5999,
        oldPrice: 6999,
        rating: 4.8,
        description: "Capture your favorite memories.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 9,
        name: "Casual Hoodie",
        category: "Fashion",
        price: 899,
        oldPrice: 1199,
        rating: 4.5,
        description: "A cozy hoodie for casual outfits.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 10,
        name: "Portable Speaker",
        category: "Electronics",
        price: 1199,
        oldPrice: 1499,
        rating: 4.4,
        description: "Take your favorite music with you.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 11,
        name: "Classic Wristwatch",
        category: "Accessories",
        price: 799,
        oldPrice: 999,
        rating: 4.5,
        description: "A timeless accessory for any occasion.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 12,
        name: "Casual Sneakers",
        category: "Fashion",
        price: 1499,
        oldPrice: 1799,
        rating: 4.7,
        description: "Comfortable sneakers for everyday wear.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
    }
];

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function formatPrice(price) {
    return "₱" + Number(price).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => {
        return sum + Math.max(0, Number(item.quantity) || 0);
    }, 0);

    document.querySelectorAll(".cart-count, #cart-count").forEach(element => {
        element.textContent = count;
    });
}

function createProductCard(product) {
    const discount = product.oldPrice > product.price
        ? Math.round((1 - product.price / product.oldPrice) * 100)
        : 0;

    return `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="product-card h-100">
                <div class="product-image-wrapper">
                    ${discount > 0
                        ? `<span class="discount-badge">${discount}% OFF</span>`
                        : ""}
                    <img
                        src="${escapeHTML(product.image)}"
                        class="product-image"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='https://placehold.co/600x600?text=ShopEase'">
                </div>

                <div class="product-details">
                    <span class="product-category">${escapeHTML(product.category)}</span>
                    <h5 class="product-title">${escapeHTML(product.name)}</h5>
                    <p class="product-description">${escapeHTML(product.description)}</p>
                    <div class="product-rating">★ ${Number(product.rating).toFixed(1)}</div>

                    <div class="product-price">
                        <strong>${formatPrice(product.price)}</strong>
                        ${product.oldPrice > product.price
                            ? `<del>${formatPrice(product.oldPrice)}</del>`
                            : ""}
                    </div>

                    <button class="btn btn-success w-100 mt-3"
                            onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderFeaturedProducts() {
    const container = document.getElementById("featured-products");
    if (!container) return;

    // Display the first four products on the Home page.
    container.innerHTML = products.slice(0, 4)
        .map(createProductCard)
        .join("");
}

function renderDeals() {
    const container = document.getElementById("deal-products");
    if (!container) return;

    const discountedProducts = products.filter(product =>
        product.oldPrice > product.price
    );

    container.innerHTML = discountedProducts.length
        ? discountedProducts.map(createProductCard).join("")
        : `<div class="col-12"><p>No deals available right now.</p></div>`;
}

function addToCart(productId) {
    const product = products.find(item => item.id === Number(productId));

    if (!product) {
        alert("Product not found.");
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity = (Number(existingItem.quantity) || 0) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    alert(product.name + " has been added to your cart!");
}

document.addEventListener("DOMContentLoaded", function () {
    renderFeaturedProducts();
    renderDeals();
    updateCartCount();
});