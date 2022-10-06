import Api from "./DB/Database.js";
import Card from './views/RecipeCard.js'
import Filters from "./models/Filters.js";
import FiltersView from "./views/Filter.js";


class App {
    constructor() {
        this.$mainSection = document.querySelector('main')     
        this.$filterSection = document.querySelector('.allFilters');
        this.api = new Api("./datas/recipes.json");
        this.recipes;
        this.filteredRecipes = [];
        this.ingredients;
        this.appliances;
        this.ustensils;
    }
 

    async displayRecipes(recipes) {       

        this.$mainSection.innerHTML = "";
        recipes.forEach((recipe) => {   
            const cardRecipe = new Card(recipe);
            const recipeCardDOM = cardRecipe.render();
            this.$mainSection.innerHTML += recipeCardDOM;
        });
    }

    async createFilters() {
        const Filtres = new Filters(this.recipes);

        this.ingredients = Filtres.allIngredients; 
        let $allIngredients = new FiltersView(this.ingredients, "Ingrédients");
        this.$filterSection.querySelector('#ingredients').innerHTML += $allIngredients.render();

        this.appliances = Filtres.allAppliances;
        let $allAppliances = new FiltersView(this.appliances , "Appareils");
        this.$filterSection.querySelector('#appliances').innerHTML += $allAppliances.render();
    
        this.ustensils = Filtres.allUstensils;    
        let $allUstensils = new FiltersView(this.ustensils, "Ustensiles");
        this.$filterSection.querySelector('#ustensils').innerHTML += $allUstensils.render();


        this.updateFilter(Filtres);
      



        
    }

    async updateFilter (Filtres) {
        // Jecoute le clique sur les boutons filtres et je toggle le contenu
        this.$filterSection.querySelectorAll('button').forEach( $btn => {
            $btn.addEventListener('click', e => Filtres.toggleFilter(e));
        });

        this.$filterSection.querySelectorAll('.dropdown__item').forEach( $item => {
            $item.addEventListener('click', e => {
                let selectedFilter = e.target.textContent;

                this.recipes.forEach(recipe => {
                    
                    if (recipe.ustensils.indexOf(selectedFilter) != -1) {
                        this.filteredRecipes.push(recipe);
                    }
                })

                this.displayRecipes(this.filteredRecipes);
            });
        });


     // pseudo code 
     // OK !!! on selectionne un filtre (ici ustensil ) avec l'écoute d'evenement 
     // OK !!! on prend sa valeur et la categorie de filtre à qui il appartient (ustensil)
     // OK !!! on va faire passer Le filtre retenu (ici l'ustensil) dans un programme qui devra : 
     // OK !!! - passer chaque recette et voir si le filtre (ustensil) est utilisé
     // OK !!! Si oui on stock la recette 
     // OK !!! A la fin de cette boucle, on recharge toutes les recettes stockées
     // On ajoute l'étiquette 
     // On remet à jour la liste des ustensils possible avec la nouvelle collection de recette
     // On relance l'écoute devenement 
        


    }



    

    async start () {
        const datas = await this.api.get();
        this.recipes = datas.recipes; 
        this.displayRecipes(this.recipes);
        this.createFilters();
    }
  }
  

  const app = new App();
  app.start();
  