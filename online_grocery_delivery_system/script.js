/* ============================================================
   PRODUCT DATA
   veg: true = vegetarian, false = non-vegetarian, null = n/a
============================================================ */
const products = [
  // Fruits & Vegetables
  {id:1, cat:"Fruits & Vegetables", name:"Royal Gala Apples (1kg)", brand:"FreshFarm", price:180, veg:true, image:"Images/apple.jpg", desc:"Crisp, sweet apples hand-picked from hill orchards. Great for lunchboxes and salads.", target:"cat-fruits"},
  {id:2, cat:"Fruits & Vegetables", name:"Robusta Bananas (dozen)", brand:"FreshFarm", price:60, veg:true, image:"Images/banana.jpg", desc:"Naturally ripened bananas, a quick energy snack for any time of day.", target:"cat-fruits"},
  {id:3, cat:"Fruits & Vegetables", name:"Vine Tomatoes (500g)", brand:"GreenValley", price:40, veg:true, image:"Images/tomato.jpg", desc:"Juicy, firm tomatoes perfect for curries, salads, and chutneys.", target:"cat-fruits"},
  {id:4, cat:"Fruits & Vegetables", name:"Baby Spinach (250g)", brand:"GreenValley", price:35, veg:true, image:"Images/spinach.jpg", desc:"Tender spinach leaves, washed and ready — just toss in the pan.", target:"cat-fruits"},

  // Dairy
  {id:6, cat:"Dairy Products", name:"Toned Milk (1L)", brand:"DairyBest", price:58, veg:true, image:"Images/milk.jpg", desc:"Pasteurised toned milk delivered chilled, straight from the dairy.", target:"cat-dairy"},
  {id:7, cat:"Dairy Products", name:"Processed Cheese Slices", brand:"DairyBest", price:120, veg:true, image:"Images/cheese.jpg", desc:"Creamy, meltable cheese slices for sandwiches and burgers.", target:"cat-dairy"},
  {id:8, cat:"Dairy Products", name:"Set Curd (400g)", brand:"MilkyWay", price:45, veg:true, image:"Images/curd.jpg", desc:"Thick, tangy curd set the traditional way. Great with every meal.", target:"cat-dairy"},
  {id:10, cat:"Dairy Products", name:"Fresh Paneer (250g)", brand:"DairyBest", price:85, veg:true, image:"Images/paneer.jpg", desc:"Soft, protein-rich paneer cubes, perfect for curries and grills.", target:"cat-dairy"},

  // Snacks
  {id:11, cat:"Snacks", name:"Classic Salted Chips", brand:"SnackTime", price:30, veg:true, image:"Images/chips.jpg", desc:"Crunchy potato chips with just the right amount of salt.", target:"cat-snacks"},
  {id:12, cat:"Snacks", name:"Chicken Nuggets (Frozen)", brand:"QuickBite", price:220, veg:false, image:"Images/nuggets.jpg", desc:"Ready-to-fry chicken nuggets.", target:"cat-snacks"},
  {id:13, cat:"Snacks", name:"Butter Popcorn", brand:"SnackTime", price:50, veg:true, image:"Images/popcorn.jpg", desc:"Light, buttery popcorn.", target:"cat-snacks"},
  {id:14, cat:"Snacks", name:"Mixed Dry-Fruit Trail Mix", brand:"NutHouse", price:210, veg:true, image:"Images/dryfruits.jpg", desc:"Healthy dry fruit mix.", target:"cat-snacks"},

  // Beverages
  {id:16, cat:"Beverages", name:"Fresh Orange Juice (1L)", brand:"PureSip", price:150, veg:true, image:"Images/orangejuice.jpg", desc:"Cold-pressed orange juice.", target:"cat-beverages"},
  {id:17, cat:"Beverages", name:"Cola Soft Drink (2L)", brand:"FizzUp", price:90, veg:true, image:"Images/softdrink.jpg", desc:"Classic fizzy cola.", target:"cat-beverages"},
  {id:18, cat:"Beverages", name:"Green Tea (25 bags)", brand:"PureSip", price:180, veg:true, image:"Images/greentea.jpg", desc:"Healthy green tea.", target:"cat-beverages"},
  {id:20, cat:"Beverages", name:"Instant Coffee (100g)", brand:"BrewCo", price:240, veg:true, image:"Images/coffee.jpg", desc:"Rich instant coffee.", target:"cat-beverages"},

  // Household
  {id:21, cat:"Household Items", name:"Liquid Detergent (1L)", brand:"HomeCare", price:180, veg:null, image:"Images/detergent.jpg", desc:"Liquid detergent.", target:"cat-household"},
  {id:22, cat:"Household Items", name:"Dish Wash Bar (pack of 3)", brand:"HomeCare", price:60, veg:null, image:"Images/dishbar.png", desc:"Dish wash bar.", target:"cat-household"},
  {id:23, cat:"Household Items", name:"Toilet Paper (6 rolls)", brand:"SoftTouch", price:210, veg:null, image:"Images/toiletpaper.jpg", desc:"Soft toilet paper.", target:"cat-household"},
  {id:24, cat:"Household Items", name:"Room Air Freshener", brand:"HomeCare", price:150, veg:null, image:"Images/airfreshner.jpg", desc:"Long-lasting room freshener.", target:"cat-household"},
];

let cart = {};       // { productId: qty }
let modalProductId = null;
let modalQty = 1;

/* ============================================================
   RENDERING
============================================================ */
function currency(n){
  return "₹" + n.toLocaleString("en-IN");
}

function vegIcon(veg){
  if(veg === null) return "";
  return veg
    ? `<span class="veg-dot" title="Vegetarian"></span>`
    : `<span class="veg-dot nonveg-dot" title="Non-Vegetarian"></span>`;
}

function productCard(p){
  return `
  <div class="col-6 col-md-4 col-lg-3" data-pid="${p.id}">
    <div class="product-card">
      ${p.price >= 200 ? '<div class="tag-badge">PREMIUM</div>' : ''}
      <div class="product-media">
    <img src="${p.image}" alt="${p.name}">
</div>
      <div class="product-body">
        <div class="d-flex justify-content-between align-items-start">
          <p class="product-name mb-1">${p.name}</p>
          ${vegIcon(p.veg)}
        </div>
        <p class="product-brand">${p.brand}</p>
        <p class="product-price mb-2">${currency(p.price)}</p>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-green flex-fill" onclick="openProductModal(${p.id})">View</button>
          <button class="btn btn-sm btn-accent flex-fill" onclick="addToCart(${p.id}, 1)">Add</button>
        </div>
      </div>
    </div>
  </div>`;
}

function populateBrandFilter(){
  const select = document.getElementById("filterBrand");
  const brands = [...new Set(products.map(p => p.brand))].sort();
  brands.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    select.appendChild(opt);
  });
}

function renderProducts(list){
  const containers = ["cat-fruits","cat-dairy","cat-snacks","cat-beverages","cat-household"];
  containers.forEach(id => document.getElementById(id).innerHTML = "");

  list.forEach(p => {
    document.getElementById(p.target).insertAdjacentHTML("beforeend", productCard(p));
  });

  // hide empty category sections when a filter clears them out
  document.querySelectorAll("main section[data-section]").forEach(sec => {
    const row = sec.querySelector(".row");
    sec.style.display = row.children.length ? "" : "none";
  });

  document.getElementById("noResults").classList.toggle("d-none", list.length > 0);
  document.getElementById("resultCount").textContent = `${list.length} product${list.length === 1 ? "" : "s"} found`;
}

/* ============================================================
   FILTERING
============================================================ */
function applyFilters(){
  const veg = document.getElementById("filterVeg").value;
  const priceRange = document.getElementById("filterPrice").value;
  const category = document.getElementById("filterCategory").value;
  const brand = document.getElementById("filterBrand").value;
  const term = document.getElementById("searchInput").value.trim().toLowerCase();

  let [minP, maxP] = priceRange === "all" ? [0, Infinity] : priceRange.split("-").map(Number);

  const filtered = products.filter(p => {
    if (veg === "veg" && p.veg !== true) return false;
    if (veg === "nonveg" && p.veg !== false) return false;
    if (p.price < minP || p.price > maxP) return false;
    if (category !== "all" && p.cat !== category) return false;
    if (brand !== "all" && p.brand !== brand) return false;
    if (term && !p.name.toLowerCase().includes(term) && !p.brand.toLowerCase().includes(term)) return false;
    return true;
  });

  renderProducts(filtered);
}

function resetFilters(){
  document.getElementById("filterVeg").value = "all";
  document.getElementById("filterPrice").value = "all";
  document.getElementById("filterCategory").value = "all";
  document.getElementById("filterBrand").value = "all";
  document.getElementById("searchInput").value = "";
  applyFilters();
}

document.getElementById("searchInput").addEventListener("keyup", applyFilters);

/* ============================================================
   PRODUCT MODAL
============================================================ */
function openProductModal(id){
  const p = products.find(p => p.id === id);
  if(!p) return;
  modalProductId = id;
  modalQty = 1;

  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalBrand").textContent = `${p.brand} · ${p.cat}`;
  document.getElementById("modalPrice").textContent = currency(p.price);
  document.getElementById("modalDesc").textContent = p.desc;
document.getElementById("modalMedia").innerHTML =
`<img src="${p.image}" alt="${p.name}" class="modal-product-image">`;  document.getElementById("modalQty").textContent = modalQty;

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}

function changeModalQty(delta){
  modalQty = Math.max(1, modalQty + delta);
  document.getElementById("modalQty").textContent = modalQty;
}

function addFromModal(){
  if(modalProductId === null) return;
  addToCart(modalProductId, modalQty);
  const modalEl = document.getElementById("productModal");
  bootstrap.Modal.getInstance(modalEl)?.hide();
}

/* ============================================================
   CART
============================================================ */
function addToCart(id, qty){
  cart[id] = (cart[id] || 0) + qty;
  renderCart();
}

function removeFromCart(id){
  delete cart[id];
  renderCart();
}

function changeCartQty(id, delta){
  if(!cart[id]) return;
  cart[id] += delta;
  if(cart[id] <= 0){ delete cart[id]; }
  renderCart();
}

function cartLine(p, qty){
  return `
  <div class="cart-line" data-pid="${p.id}">
    <div class="product-media">
      <img src="${p.image}" alt="${p.name}" class="img-fluid">
    </div>
    <div class="flex-grow-1">
      <div class="fw-semibold" style="font-size:.92rem;">${p.name}</div>
      <div class="small text-secondary mono">${currency(p.price)} each</div>
      <div class="qty-control mt-1">
        <button onclick="changeCartQty(${p.id}, -1)">−</button>
        <span class="mono">${qty}</span>
        <button onclick="changeCartQty(${p.id}, 1)">+</button>
      </div>
    </div>
    <div class="text-end">
      <div class="mono fw-semibold">${currency(p.price * qty)}</div>
      <button class="btn btn-sm btn-link text-danger p-0 mt-1" onclick="removeFromCart(${p.id})">Remove</button>
    </div>
  </div>`;
}

function renderCart(){
  const container = document.getElementById("cartItems");
  const ids = Object.keys(cart);

  if(ids.length === 0){
    container.innerHTML = `<div class="empty-state">Your cart is empty.<br>Add a few fresh things to get started.</div>`;
  } else {
    container.innerHTML = ids.map(id => {
      const p = products.find(p => p.id === Number(id));
      return cartLine(p, cart[id]);
    }).join("");
  }

  const subtotal = ids.reduce((sum, id) => {
    const p = products.find(p => p.id === Number(id));
    return sum + p.price * cart[id];
  }, 0);

  const delivery = subtotal > 0 && subtotal < 300 ? 30 : 0;
  const total = subtotal + delivery;
  const itemCount = ids.reduce((sum, id) => sum + cart[id], 0);

  document.getElementById("cartSubtotal").textContent = currency(subtotal);
  document.getElementById("cartDelivery").textContent = delivery === 0 ? "Free" : currency(delivery);
  document.getElementById("cartTotal").textContent = currency(total);
  document.getElementById("cartCount").textContent = itemCount;
}

function checkout(){
  const ids = Object.keys(cart);
  if(ids.length === 0){
    alert("Your cart is empty — add a few items before checking out.");
    return;
  }
  alert("This is a demo checkout — your order would now be placed! 🎉");
}

/* ============================================================
   INIT
============================================================ */
populateBrandFilter();
renderProducts(products);
renderCart();
