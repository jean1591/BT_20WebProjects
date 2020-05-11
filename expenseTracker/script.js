const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list"); // History
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransaction = [
	{ id: 1, text: "Flower", amount: -20 },
	{ id: 2, text: "Salary", amount: 300 },
	{ id: 3, text: "Book", amount: -10 },
	{ id: 4, text: "Camera", amount: 150 }
];

let transactions = dummyTransaction;

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
	)}</span> <button class="delete-btn">X</button>
  `;

	// Add to history
	list.appendChild(item);
};

// Init App
const init = () => {
	list.innerHTML = "";
	// transactions.forEach((t) => addTransactionDOM(t));
	transactions.forEach(addTransactionDOM);
};

init();
