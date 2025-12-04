// ------- SWEET PRICE LIST -------
const prices = {
  "Jaggery Pootharekulu": 15,   // ₹15 per piece (example)
  "Sugar Pootharekulu": 10,     // ₹10 per piece
  "Dry Fruit Pootharekulu": 25  // ₹25 per piece
};

// ------- READ ITEM FROM URL -------
const urlParams = new URLSearchParams(window.location.search);
const item = urlParams.get("item");

// Update selected item text
const itemDisplay = document.getElementById("selected-item");
itemDisplay.innerText = "You are ordering: " + item;

// Set hidden field value
document.getElementById("sweet").value = item;

// ------- QUANTITY & PRICE CALCULATION -------
const qtyInput = document.getElementById("qu");

// Create total price display
const totalDisplay = document.createElement("p");
totalDisplay.style.fontWeight = "bold";
totalDisplay.style.fontSize = "18px";
totalDisplay.style.marginTop = "10px";
qtyInput.parentNode.insertBefore(totalDisplay, qtyInput.nextSibling);

// Function to calculate total
function updateTotal() {
  let qty = parseInt(qtyInput.value) || 0;

  // Prevent negative & zero
  if (qty < 1) {
    qtyInput.value = 1;
    qty = 1;
  }

  const price = prices[item] || 0;
  const total = qty * price;

  totalDisplay.innerText = `Total Price: ₹${total}`;
}

// Listen for quantity change
qtyInput.addEventListener("input", updateTotal);

// Call once on load
updateTotal();

// ------- RESPONSIVE FIXES -------
function makeResponsive() {
  const form = document.querySelector("form");
  form.style.maxWidth = "450px";
  form.style.margin = "auto";
  form.style.width = "90%";
}

makeResponsive();
