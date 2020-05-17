const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGame = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [ "sigh", "tense", "airplane", "ball", "pies", "juice", "warlike", "bad" ];

// Init word, score & time
let randomWord;
let score = 0;
let time = 10;

// Set difficulty to value in localStorage or medium
let difficulty =
	localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

// Set difficulty select value
difficultySelect.value = difficulty;

// Focus on text input on start
text.focus();

// Game Over, show end screen
const gameOver = () => {
	endGame.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;
	endGame.style.display = "flex";
};

// Update time
const updateTime = () => {
	time--;
	timeEl.innerHTML = `${time}s`;

	if (time === 0) {
		clearInterval();

		// End game
		gameOver();
	}
};

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
const getRandomWord = () => {
	return words[Math.floor(Math.random() * words.length)];
};

// Add word to DOM
const addWordToDOM = () => {
	randomWord = getRandomWord();

	word.innerHTML = randomWord;
};

addWordToDOM();

const updateScore = () => {
	score++;
	scoreEl.innerHTML = score;
};

// Event listener
// Typing
text.addEventListener("input", (e) => {
	const insertedText = e.target.value;

	if (insertedText === randomWord) {
		// Generate new word
		addWordToDOM();

		// Update score
		updateScore();

		// Update time
		switch (difficulty) {
			case "hard":
				time += 2;
				break;
			case "medium":
				time += 3;
				break;
			case "eay":
				time += 4;
				break;
		}

		// Clear input
		e.target.value = "";
	}
});

// Settings button click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (e) => {
	difficulty = e.target.value;
	localStorage.setItem("difficulty", difficulty);
});
