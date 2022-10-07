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

    async createFilters(recipes) {
        const Filtres = new Filters(recipes);

        this.ingredients = Filtres.allIngredients; 
        let $allIngredients = new FiltersView(this.ingredients, "Ingrédients");
        this.$filterSection.querySelector('#ingredients').innerHTML = $allIngredients.render();

        this.appliances = Filtres.allAppliances;
        let $allAppliances = new FiltersView(this.appliances , "Appareils");
        this.$filterSection.querySelector('#appliances').innerHTML = $allAppliances.render();
    
        this.ustensils = Filtres.allUstensils;    
        let $allUstensils = new FiltersView(this.ustensils, "Ustensiles");
        this.$filterSection.querySelector('#ustensils').innerHTML = $allUstensils.render();


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
                let selectedCat = e.target.getAttribute('data-belong');

                this.recipes.forEach(recipe => {
                    
                    if (recipe.ustensils.indexOf(selectedFilter) != -1) {
                        this.filteredRecipes.push(recipe);
                    }
                })

                this.displayRecipes(this.filteredRecipes);
                this.createFilters(this.filteredRecipes);
                this.createTag(selectedFilter, selectedCat);
            });
        });


     // pseudo code 
     // OK !!! on selectionne un filtre (ici ustensil ) avec l'écoute d'evenement 
     // OK !!! on prend sa valeur et la categorie de filtre à qui elle appartient (ustensil)
     // OK !!! on fait passer le filtre retenu (ici l'ustensil) dans un programme qui devra : 
     // OK !!! Passer chaque recette et voir si le filtre (ustensil) est utilisé
     // OK !!! Si oui on stock la recette 
     // OK !!! A la fin de cette boucle, on recharge toutes les recettes stockées
     // OK !!! On ajoute l'étiquette 
    //  Ajouter lecoute devenement sur les étiquettes pour suppression au clic 
     // On remet à jour la liste des filtres (ustensils) possible avec la nouvelle collection de recette
     // On relance l'écoute devenement 
        


    //  Autre pseudo code
    // On selectionne un filtre avec l'écoute devenement
    // On prend sa valeur et la categorie de filtre à laquelle elle appartient 
    // on crée une étiquette associée et on lajoute à la liste de tag 
    // on prend la liste de tag et on la fait passer dans un programme qui 
    // - fait une boucle sur la liste 
    // - prend chaque element (key = type de filtre & value = valeur)
    // - je prends le tableau avec toutes les recettes (ou le nouveau tableau de recettes "recipesSelected" selectionnés sil existe ce qui signifie qu'il y a déjà un premier filtre qui est passé) 
    // - à chaque itération je regarde si lelement (le filtre) en question est dans la recette 
    // - si oui je stock la recette dans un nouveau tableau d'array "recipesSelected"
    // a la fin de la boucle sur la liste de tag je :
    // relance les filtres disponibles à partir de ma liste de recipesSelected
    // Je relance les écoute d'évenement sur ces elements (tag + filtres)
    
    // nb: ajouter la fonctionnalité de retrait d'un tag avec bouton close

    }

    createTag(tag, cat) {

        let $tag = `<span data-filterCat="${cat}" class="tag">${tag} <i class="fa-regular fa-circle-xmark"></i></span>`
        document.querySelector('.tags').innerHTML += $tag;
    }



    async start () {
        const datas = await this.api.get();
        this.recipes = datas.recipes; 
        this.displayRecipes(this.recipes);
        this.createFilters(this.recipes);
    }
  }
  

  const app = new App();
  app.start();
  