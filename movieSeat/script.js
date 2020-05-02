const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// Get data from localStorage & populate UI
const populateUI = () => {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}

	const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
};

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index & price
const setMovieData = (movieIndex, moviePrice) => {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Update total & count
const updateSelectedCount = () => {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");

	// Copy selected seats into array
	// Map through array
	// Return new array of indexes
	const seatsIndex = [ ...selectedSeats ].map((seat) => {
		return [ ...seats ].indexOf(seat);
	});

	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

	count.innerText = selectedSeats.length;
	total.innerText = selectedSeats.length * ticketPrice;
};

// Movie select event
movieSelect.addEventListener("change", (e) => {
	e.preventDefault();
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
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

// Initial count & total set
updateSelectedCount();
