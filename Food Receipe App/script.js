let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");

// Link MealDB Api
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value;

  fetch(url + userInp)
    .then((response) => response.json())
    .then((data) => {
      let myMeal = data.meals[0];
      console.log(myMeal);
      console.log(myMeal.strMealThumb);
      console.log(myMeal.strMeal);
      console.log(myMeal.strArea);
      console.log(myMeal.strInstructions);
      // console.log(myMeal.strYoutube);

      let count = 1;
      let ingredients = [];

      for (let i in myMeal) {
        let ingredient = "";
        let measure = "";

        if (i.startsWith("strIngredient") && myMeal[i]) {
          ingredient = myMeal[i];
          measure = myMeal["strMeasure" + count];
          count += 1;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      console.log(ingredients);
      result.innerHTML = `<img src="${myMeal.strMealThumb}">
                            <h2>${myMeal.strMeal}</h2>
                            <p>${myMeal.strArea}</p>
                            <h3>Ingredients:</h3>
                            <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
                            <h3>Instructions:</h3>
                            <p>${myMeal.strInstructions}</p>`;
    })
    .catch((error) => {
      console.error(error);
      result.innerHTML = `<p> Wrong Choice !! Search again.</p>`;
    });
});


