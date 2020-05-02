const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// Update total & count
const updateSelectedCount = () => {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");

	count.innerText = selectedSeats.length;
	total.innerText = selectedSeats.length * ticketPrice;
};

// Movie select event
movieSelect.addEventListener("change", (e) => {
	e.preventDefault();
	ticketPrice = +e.target.value;

	updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
		e.target.classList.toggle("selected");

		updateSelectedCount();
	}
});
