const menuItems = [
  {
    name: "Green Goddess Bowl",
    category: "Veg",
    price: 12,
    description: "Avocado, greens, crunchy seeds and herby lemon dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80",
    alt: "Fresh green salad bowl with avocado and vegetables"
  },
  {
    name: "Roasted Tomato Toast",
    category: "Veg",
    price: 9,
    description: "Sourdough, whipped ricotta, slow-roasted tomatoes and basil.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
    alt: "Toasted bread topped with fresh ingredients"
  },
  {
    name: "Crispy Chicken Bowl",
    category: "Non-Veg",
    price: 14,
    description: "Golden chicken, fluffy rice, slaw and a tangy sesame drizzle.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    alt: "Colourful bowl of rice, vegetables and toppings"
  },
  {
    name: "Lemon Herb Salmon",
    category: "Non-Veg",
    price: 17,
    description: "Pan-seared salmon, greens and bright lemon-herb butter.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80",
    alt: "Grilled salmon served with vegetables"
  },
  {
    name: "Berry Cloud Cheesecake",
    category: "Desserts",
    price: 8,
    description: "Creamy vanilla cheesecake topped with a tumble of berries.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
    alt: "Cheesecake topped with fresh berries"
  },
  {
    name: "Chocolate Fudge Bite",
    category: "Desserts",
    price: 7,
    description: "A rich, fudgy chocolate square with a pinch of sea salt.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    alt: "Rich chocolate dessert with a soft centre"
  },
  {
    name: "Miso Salmon Power Bowl",
    category: "Non-Veg",
    price: 16,
    description: "Our new favourite: miso-glazed salmon, brown rice and crunchy greens.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80",
    alt: "Glazed salmon served with fresh greens",
    isNew: true
  },
  {
    name: "Matcha Cloud Cake",
    category: "Desserts",
    price: 9,
    description: "Our new soft matcha sponge layered with light vanilla cream.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    alt: "A slice of layered cake with a creamy filling",
    isNew: true
  }
];

const menuGrid = document.querySelector("#menu-grid");
const cartCount = document.querySelector("#cart-count");
const filterButtons = document.querySelectorAll(".filter-button");
const orderForm = document.querySelector("#order-form");
const formStatus = document.querySelector("#form-status");
let cartTotal = 0;

function renderMenu(category = "All") {
  const visibleItems = category === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = visibleItems.map((item) => `
    <article class="food-card">
      <div class="food-image-wrap">
        <img class="food-image" src="${item.image}" alt="${item.alt}" loading="lazy">
        <span class="food-category">${item.isNew ? "New · " : ""}${item.category}</span>
      </div>
      <div class="food-info">
        <h3>${item.name}</h3>
        <p class="food-description">${item.description}</p>
        <div class="food-card-bottom">
          <span class="food-price">$${item.price.toFixed(2)}</span>
          <button class="add-button" type="button" data-item="${item.name}">+ Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderMenu(button.dataset.filter);
  });
});

menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button) return;

  cartTotal += 1;
  cartCount.textContent = String(cartTotal);
  button.classList.add("added");
  button.textContent = "✓ Added";
  window.setTimeout(() => {
    if (button.isConnected) {
      button.classList.remove("added");
      button.textContent = "+ Add to cart";
    }
  }, 1100);
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.classList.remove("error");

  if (!orderForm.reportValidity()) {
    formStatus.textContent = "Please check the highlighted fields and try again.";
    formStatus.classList.add("error");
    return;
  }

  const name = new FormData(orderForm).get("name").trim();
  formStatus.textContent = `Thanks, ${name}! Your message is ready. We'll be in touch soon.`;
  orderForm.reset();
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navLinks.classList.toggle("open", !isExpanded);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
renderMenu();
