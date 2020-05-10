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

// Event listeners
submit.addEventListener("submit", searchMeal);
