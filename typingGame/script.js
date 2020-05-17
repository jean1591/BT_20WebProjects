const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGame = document.getElementById("end-game");
const settingBtn = document.getElementById("setting-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [ "sigh", "tense", "airplane", "ball", "pies", "juice", "warlike", "bad" ];

// Init word, score & time
let randomWord;
let score = 0;
let time = 10;

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
text.addEventListener("input", (e) => {
	const insertedText = e.target.value;

	if (insertedText === randomWord) {
		// Generate new word
		addWordToDOM();

		// Update score
		updateScore();

		// Clear input
		e.target.value = "";
	}
});
