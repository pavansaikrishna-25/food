document.addEventListener("DOMContentLoaded", () => {
    const mealContainer = document.getElementById('meal-container');
    const mealPopup = document.getElementById('meal-popup');
    const closeButton = document.querySelector('.close');

   
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            displayMeals(meals);
        });

    function displayMeals(meals) {
        mealContainer.innerHTML = meals.map(meal => `
            <div class="meal" data-id="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strInstructions.substring(0, 100)}</p>
            </div>
        `).join('');

        const mealElements = document.querySelectorAll('.meal');
        mealElements.forEach(meal => {
            meal.addEventListener('click', () => {
                const mealId = meal.getAttribute('data-id');
                fetchMealDetails(mealId);
            });
        });
    }

   
    function fetchMealDetails(mealId) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                displayMealDetails(meal);
            });
    }

   
    function displayMealDetails(meal) {
        document.getElementById('popup-image').src = meal.strMealThumb;
        document.getElementById('popup-title').textContent = meal.strMeal;
        document.getElementById('popup-category').textContent = meal.strCategory;
        document.getElementById('popup-cuisine').textContent = meal.strArea;
        document.getElementById('popup-instructions').textContent = meal.strInstructions;

        mealPopup.classList.remove('hidden'); 
    }

   
    closeButton.addEventListener('click', () => {
        mealPopup.classList.add('hidden'); 
    });
});
