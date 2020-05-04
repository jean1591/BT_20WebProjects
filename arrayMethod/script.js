const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// Fetch random user & add money
const getRandomUser = async () => {
	const res = await fetch("https://randomuser.me/api");
	const data = await res.json();
	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	};

	addData(newUser);
};

// Double users' money
const doubleMoney = () => {
	data = data.map((item) => {
		return { ...item, money: item.money * 2 };
	});

	updateDom();
};

// Add new object to data array
const addData = (obj) => {
	data.push(obj);

	updateDom();
};

// Update DOM
const updateDom = (providedData = data) => {
	// Clear main div
	main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

	providedData.forEach((item) => {
		// Create new element & add class
		const element = document.createElement("div");
		element.classList.add("person");
		// Construct element
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		// Add to parent div
		main.appendChild(element);
	});
};

// Format number as money
const formatMoney = (num) => {
	return `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
