// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Price list (you can change values)
  const prices = {
    "Jaggery Pootharekulu": 15,
    "Sugar Pootharekulu": 10,
    "Dry Fruit Pootharekulu": 25
  };

  // Elements
  const itemDisplay = document.getElementById("selected-item");
  const sweetHidden = document.getElementById("sweet");
  const qtyInput = document.getElementById("qu");
  const totalPrice = document.getElementById("total-price");

  // Debug helper
  function debugLog(...args) {
    if (window.console && console.log) console.log("[order.js]", ...args);
  }

  // Read item from URL in a robust way
  const urlParams = new URLSearchParams(window.location.search);
  let item = urlParams.get("item");

  // If using plus-sign encoding (some links use + instead of %20), fix it
  if (item && item.indexOf("+") !== -1) {
    item = item.replace(/\+/g, " ");
  }

  // If missing, try alternate param names (just in case)
  if (!item) {
    item = urlParams.get("sweet") || urlParams.get("product") || "";
  }

  // Final fallback
  if (!item) {
    itemDisplay.innerText = "No item selected. Please open this page from the product link.";
    sweetHidden.value = "";
    debugLog("No item found in URL.");
  } else {
    // decode URI components to handle encoded characters
    try { item = decodeURIComponent(item); } catch (e) { /* ignore */ }

    itemDisplay.innerText = "You are ordering: " + item;
    sweetHidden.value = item;
    debugLog("Item detected:", item);
  }

  // Ensure quantity input exists and create total price area if missing
  if (!qtyInput) {
    debugLog("Quantity input (#qu) not found in DOM.");
    return;
  }

  if (!totalPrice) {
    // create totalPrice element under quantity if not present
    const p = document.createElement("p");
    p.id = "total-price";
    p.style.fontWeight = "bold";
    p.style.marginTop = "10px";
    p.style.fontSize = "18px";
    qtyInput.insertAdjacentElement("afterend", p);
  }

  // Price calculation function
  function updateTotal() {
    let qty = parseInt(qtyInput.value, 10);

    if (Number.isNaN(qty) || qty < 1) {
      qty = 1;
      qtyInput.value = 1;
    }

    const unitPrice = prices[item] || 0;
    const total = unitPrice * qty;

    document.getElementById("total-price").innerText = `Total Price: ₹${total} (${qty} × ₹${unitPrice})`;
  }

  // Enforce positive integers (no negatives, decimals)
  qtyInput.addEventListener("input", () => {
    // remove any non-digit characters
    qtyInput.value = qtyInput.value.replace(/[^\d]/g, "");
    updateTotal();
  });

  // init
  if (!qtyInput.value) qtyInput.value = 1;
  updateTotal();
});

