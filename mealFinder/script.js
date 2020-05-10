const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealsEl = document.getElementById("single-meal");

// Search meal and fetch from API
const searchMeal = async (e) => {
	e.preventDefault();

	// Clear single meal
	single_mealsEl.innerHTML = "";

	// Get search term
	const term = search.value;

	// Check for empty
	if (term.trim()) {
		const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
		const data = await res.json();

		console.log(data);
		resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;
		if (data.meals === null) {
			resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
		} else {
			mealsEl.innerHTML = data.meals
				.map(
					(meal) => `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt=${meal.strMeal}/>
          <div class="meal-info" data-mealId="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
          </div>
        </div>
      `
				)
				.join("");
		}
		// Clear search text
		search.value = "";
	} else {
		alert("Please enter a serch term");
	}
};

// Fetch meal by id
const getMealById = async (mealId) => {
	const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
	const data = await res.json();
	console.log(data);

	const meal = data.meals[0];
	addMealToDOM(meal);
};

// Add meal to DOM
const addMealToDOM = (meal) => {
	const ingredients = [];

	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`);
		} else {
			break;
		}
	}

	single_mealsEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstruction}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

	console.log(ingredients);
};

// Event listeners
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
	const mealInfo = e.path.find((item) => {
		if (item.classList) {
			return item.classList.contains("meal-info");
		} else {
			return false;
		}
	});

	if (mealInfo) {
		const mealId = mealInfo.getAttribute("data-mealid");
		getMealById(mealId);
	}
});
