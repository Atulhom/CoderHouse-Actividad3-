let cart = [];

const products = [
  { id: 1, name: 'Casio P60', price: 100, image: 'reloj-casio.jpg' },
  { id: 2, name: 'Airmax 190', price: 150, image: 'nike-airmax.jpg' },
  { id: 3, name: 'Rayban', price: 60, image: 'gafas-rayban.jpg' },
  { id: 4, name: 'Casio P60', price: 100, image: 'reloj-casio.jpg' },
  { id: 5, name: 'Airmax 190', price: 150, image: 'nike-airmax.jpg' },
  { id: 6, name: 'Rayban', price: 60, image: 'gafas-rayban.jpg' }
];

function addToCard(productId) {
  const product = products.find(product => product.id === productId);
  cart.push(product);
  saveCartProducts(cart);

  const productsOnCartCountLabel = document.getElementById('cantidadCarrito');
  productsOnCartCountLabel.textContent = cart.length;
 
  const cartModal = document.getElementById('cartModal');
  if (cartModal.style.display === 'block') {
    showCartModal();
  }
}

function calculateTotalPrice() {
  let total = 0;
  cart.forEach(product => {
    total += product.price;
  });
  return total;
}

function showCartModal() {
  const modal = document.getElementById('cartModal');
  modal.style.display = 'block';
  
  const carritoContenido = document.getElementById('cartContent');
  const cartTotalLabel = document.getElementById('cartTotal');
  const content = cart.map(product => `${product.name} - ${product.price} euros`).join('<br>');
  const total = calculateTotalPrice();

  carritoContenido.innerHTML = content;
  cartTotalLabel.textContent = `Total del carrito: ${total} euros`;
}

function closeModalCart() {
  const modal = document.getElementById('cartModal');
  modal.style.display = 'none';
}

function clearCart() {
  cart = [];
  clearSavedCartProducts();
  const cartTotalLabel = document.getElementById('cantidadCarrito');
  cartTotalLabel.textContent = '0';

  const modal = document.getElementById('cartModal');
  if (modal.style.display === 'block') {
    closeModalCart();
  }
}

function renderProducts(){
  let container = document.getElementById("products-list");
  products.forEach((product)=>{
    let rendered = renderItem(product)
    container.appendChild(rendered);
  })
}

function renderItem(item){
  let base = '<div class="product" id="product-template"> ' +
      `<img src="/img/${item.image}" alt="${item.name}" class="redonda">  `+
      `<h2 id="product-name">${item.name}</h2> ` +
      `<p id="product-price">${item.price} euros</p>` +
      `<p><button id="product-btn" class="btnstyle" onclick="addToCard(${item.id})">Agregar al carrito</button> </p>` +
      '</div>'
  let template = document.createElement('div');
  template.innerHTML = base
  return template.firstChild
}

function loadSavedCartProducts(){
  let products = getSavedCartProducts();
  if(!products) return;
  products.forEach((product)=>{
    addToCard(product.id)
  })
}

function saveCartProducts(products){
  let json = JSON.stringify(products);
  localStorage.setItem("cart-products", json);
}

function getSavedCartProducts(){
  let productsString = localStorage.getItem("cart-products");
  if(!productsString) return;
  return JSON.parse(productsString);
}

function clearSavedCartProducts(){
  return localStorage.removeItem("cart-products");
}

function initialize(){
  const clearCartBtn = document.getElementById('clearCartBtn');
  clearCartBtn.addEventListener('click', clearCart);

  const carritoLink = document.getElementById('carritoLink');
  carritoLink.addEventListener('click', showCartModal);

  renderProducts();
  loadSavedCartProducts();
}

initialize();