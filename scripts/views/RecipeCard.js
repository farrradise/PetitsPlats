import Recipe from '../models/recipe.js';

export default class RecipeCard  {
    
    constructor(recipe) {
        this.recipe = recipe;
    }


    render() {

        let allIngredients ="";

        this.recipe.ingredients.forEach(ingredient => {

            if (ingredient.quantity && ingredient.unit) {
                if (ingredient.unit == "grammes") {
                    ingredient.unit = "g";
                }
                allIngredients+=`<li><strong> ${ingredient.ingredient} :</strong> ${ingredient.quantity} ${ingredient.unit} </li>`;
            } else if (ingredient.quantity) {
                
                allIngredients+=`<li><strong> ${ingredient.ingredient} :</strong> ${ingredient.quantity} </li>`;
            } else {
                allIngredients+=`<li><strong> ${ingredient.ingredient}</strong></li>`;
            }
        });


        return `<div class="recipeCard" data-liked="false" data-id="${this.recipe.id}">
            <div class="recipeCard__img">
                <img src="./public/img/"/>
            </div>
            <div class="recipeCard__content">
                <div class="recipeCard__header">
                    <h3 class="recipeCard__title">${this.recipe.name}</h3>
                    <p class="recipeCard__time"><i class="fa-regular fa-clock"></i> ${this.recipe.time}min</p>
                </div>
                <div class="recipeCard__details">
                    <ul class="recipeCard__ingredients">
                        ${allIngredients}
                    </ul>
                    <p class="recipeCard__description">
                        ${this.recipe.description} 
                    </p>
                </div>
            </div>
        </div>`
    }

}