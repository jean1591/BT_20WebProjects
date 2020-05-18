const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
	{
		image: "./img/drink.jpg",
		text: "J'ai soif"
	},
	{
		image: "./img/food.jpg",
		text: "J'ai faim"
	},
	{
		image: "./img/tired.jpg",
		text: "Je suis fatigué"
	},
	{
		image: "./img/hurt.jpg",
		text: "J'ai mal"
	},
	{
		image: "./img/happy.jpg",
		text: "Je suis content"
	},
	{
		image: "./img/angry.jpg",
		text: "Je suis en colère"
	},
	{
		image: "./img/sad.jpg",
		text: "Je suis triste"
	},
	{
		image: "./img/scared.jpg",
		text: "J'ai peur"
	},
	{
		image: "./img/outside.jpg",
		text: "Je veux aller dehors"
	},
	{
		image: "./img/home.jpg",
		text: "Je veux rentrer à la maison"
	},
	{
		image: "./img/school.jpg",
		text: "Je veux aller à l'école"
	},
	{
		image: "./img/grandma.jpg",
		text: "Je veux aller chez mamie"
	}
];

// Create speech boxes
const createBox = (item) => {
	const box = document.createElement("div");

	const { image, text } = item;

	box.classList.add("box");
	box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

	// Speak event
	box.addEventListener("click", () => {
		setTextMessage(text);
		speakText();

		// Add active effect
		box.classList.add("active");
		setTimeout(() => {
			box.classList.remove("active");
		}, 800);
	});

	main.appendChild(box);
};

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

const getVoices = () => {
	voices = speechSynthesis.getVoices();

	voices.forEach((voice) => {
		const option = document.createElement("option");

		option.value = voice.name;
		option.innerText = `${voice.name} ${voice.lang}`;

		voicesSelect.appendChild(option);
	});
};

// Set text
const setTextMessage = (text) => {
	message.text = text;
};

// Speak text
const speakText = () => {
	speechSynthesis.speak(message);
};

// Set voice
const setVoice = (e) => {
	message.voice = voices.find((voice) => voice.name === e.target.value);
};

data.forEach(createBox);

// Event listener
// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle text box
toggleBtn.addEventListener("click", () =>
	document.getElementById("text-box").classList.toggle("show")
);

// Close button
closeBtn.addEventListener("click", () =>
	document.getElementById("text-box").classList.remove("show")
);

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBtn.addEventListener("click", () => {
	setTextMessage(textArea.value);
	speakText();
});

getVoices();
