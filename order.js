document.addEventListener("DOMContentLoaded", () => {
  const prices = {
    "Jaggery Pootharekulu": 15,
    "Sugar Pootharekulu": 10,
    "Dry Fruit Pootharekulu": 25
  };

  const itemDisplay = document.getElementById("selected-item");
  const sweetHidden = document.getElementById("sweet");
  const qtyInput = document.getElementById("qu");
  const livePrice = document.getElementById("live-price");
  const successMsg = document.getElementById("success-msg");

  const urlParams = new URLSearchParams(window.location.search);
  let item = urlParams.get("item");

  if (item && item.includes("+")) item = item.replace(/\+/g, " ");
  try { item = decodeURIComponent(item); } catch (e) {}

  if (item) {
    itemDisplay.innerText = "You are ordering: " + item;
    sweetHidden.value = item;
  }

  const unitPrice = prices[item] || 0;

  function updateLivePrice() {
    let qty = parseInt(qtyInput.value);
    if (isNaN(qty) || qty < 1) qtyInput.value = qty = 1;

    const total = qty * unitPrice;
    livePrice.innerText = `₹${total}`;
  }

  qtyInput.addEventListener("input", () => {
    qtyInput.value = qtyInput.value.replace(/[^\d]/g, "");
    updateLivePrice();
  });

  qtyInput.value = 1;
  updateLivePrice();

  // ----------- SUCCESS MESSAGE AFTER SUBMISSION -----------
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    // Let Formspree submit normally
    // But show the success message immediately
    successMsg.style.display = "block";
  });
});

