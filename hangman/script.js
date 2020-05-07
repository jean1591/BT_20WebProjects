const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [ "application", "programming", "interface", "wizard" ];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
const displayWord = () => {
	wordEl.innerHTML = `
    ${selectedWord
			.split("")
			.map(
				(letter) => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ""}
        </span>
      `
			)
			.join("")}
  `;

	const innerWord = wordEl.innerText.replace(/\n/g, "");

	// Check if player has won
	if (innerWord === selectedWord) {
		finalMessage.innerText = "Congratulations! You won! 😃";
		popup.style.display = "flex";
	}
};

// Update the wrong letter
const updateWrongLettersEl = () => {
	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

	// Display parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;
		if (index < errors) {
			part.style.display = "block";
		} else {
			part.style.display = "none";
		}
	});

	// Check if lost
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = "LoOoOoSeEeR !!!! 😕";
		popup.style.display = "flex";
	}
};

// Show notification
const showNotification = () => {
	notification.classList.add("show");

	setTimeout(() => {
		notification.classList.remove("show");
	}, 2000);
};

// Keydown letter press
window.addEventListener("keydown", (e) => {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;

		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				// Letter is in selectedWord and not typed yet
				correctLetters.push(letter);
				displayWord();
			} else {
				// Letter is in selectedWord and already typed
				showNotification();
			}
		} else {
			// Letter is not in selectedWord
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLettersEl();
			} else {
				// Letter is not in selectedWord and already typed
				showNotification();
			}
		}
	}
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
	// Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	// Get new word
	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	// Delete figure parts and popup
	updateWrongLettersEl();
	popup.style.display = "none";
});

displayWord();
