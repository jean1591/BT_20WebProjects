const currentyEl_one = document.getElementById("currency-one");
const currentyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update DOM
const calculate = async () => {
	const currency_one = currentyEl_one.value;
	const currency_two = currentyEl_two.value;

	// Fetch all rates from currency_one
	let data = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`);
	data = await data.json();
	const rate = data.rates[currency_two];

	// Display exchange rate for one unit
	rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

	// Update amount_two
	amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
};

// Event listeners
currentyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currentyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
	const tmp = currentyEl_one.value;
	currentyEl_one.value = currentyEl_two.value;
	currentyEl_two.value = tmp;

	calculate();
});

calculate();
