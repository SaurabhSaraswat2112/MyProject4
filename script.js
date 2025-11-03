// script.js

// Select DOM elements
const balanceEl = document.getElementById("balance");
const transactionList = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const nameInput = document.getElementById("transactionName");
const amountInput = document.getElementById("transactionAmount");
const typeInput = document.getElementById("transactionType");

// Load existing transactions from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Update UI initially
updateUI();

// Add Transaction
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amountValue = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (name === "" || isNaN(amountValue) || amountValue <= 0) {
    alert("Please enter a valid transaction name and amount.");
    return;
  }

  const transaction = {
    id: Date.now(),
    name,
    amount: type === "expense" ? -Math.abs(amountValue) : Math.abs(amountValue),
    type
  };

  transactions.push(transaction);
  saveAndRender();
  form.reset();
});

// Delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  saveAndRender();
}

// Save to Local Storage and Update UI
function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

// Update the Transaction List and Balance
function updateUI() {
  transactionList.innerHTML = "";
  let total = 0;

  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.classList.add("transaction-item");
    li.classList.add(t.type);
    li.innerHTML = `
      ${t.name} <span>${t.amount < 0 ? "-" : "+"}$${Math.abs(t.amount).toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">✖</button>
    `;
    transactionList.appendChild(li);
    total += t.amount;
  });

  balanceEl.textContent = total.toFixed(2);
}
