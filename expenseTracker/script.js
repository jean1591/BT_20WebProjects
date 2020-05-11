const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list"); // History
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
const addTransaction = (e) => {
	e.preventDefault();

	if (text.value.trim() === "" || amount.value.trim() === "") {
		alert("Please add a text and amount");
	} else {
		const transaction = {
			id: genId(),
			text: text.value,
			amount: +amount.value
		};

		transactions.push(transaction);

		addTransactionDOM(transaction);

		updateValues();

		// Update localStorage
		updateLocalStorage();

		text.value = "";
		amount.value = "";
	}
};

// Generate random id
const genId = () => {
	return Math.floor(Math.random() * 100000000);
};

// Add transactions to DOM list
const addTransactionDOM = (transaction) => {
	// Get sign
	const sign = transaction.amount < 0 ? "-" : "+";

	const item = document.createElement("li");

	// Add class based on value
	item.classList.add(transaction.amount < 0 ? "minus" : "plus");

	item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
		transaction.amount
	)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
  `;

	// Add to history
	list.appendChild(item);
};

// Update balance, income & expense
const updateValues = () => {
	const amounts = transactions.map((transaction) => transaction.amount);

	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	const income = amounts
		.filter((item) => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);
	const expense =
		amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -(1).toFixed(2);

	balance.innerText = `$${total}`;
	moneyPlus.innerText = `$${income}`;
	moneyMinus.innerText = `$${expense}`;
};

// Remove transaction by id
const removeTransaction = (id) => {
	transactions = transactions.filter((transaction) => transaction.id !== id);

	// Update localStorage
	updateLocalStorage();

	init();
};

// Update localStorage transactions
const updateLocalStorage = () => {
	localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Init App
const init = () => {
	list.innerHTML = "";
	transactions.forEach((t) => addTransactionDOM(t));

	updateValues();
};

init();

// Event listeners
form.addEventListener("submit", addTransaction);
