export default class Filters {
    constructor(datas) {
        this.allIngredients = [];
        this.allAppliances = [];
        this.allUstensils = [];
        this.recipesSelected;

        datas.forEach(recipe => {
            if (this.allAppliances.indexOf(recipe.appliance) == -1) {
                this.allAppliances.push(recipe.appliance); 
            }  
            
            recipe.ustensils.forEach(ustensil => {
                if (this.allUstensils.indexOf(ustensil) == -1) {
                    this.allUstensils.push(ustensil);
                }
            })

            recipe.ingredients.forEach(ingredient => {
                if (this.allIngredients.indexOf(ingredient.ingredient) == -1) {
                    this.allIngredients.push(ingredient.ingredient);
                }
            });

        });

    }

    toggleFilter(e) {
        document.querySelector(`.dropdown__menu[data-filter='${e.target.getAttribute('data-filter')}']`).classList.toggle("open");
    }



}


