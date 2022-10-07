// import Recipe from '../models/recipe.js';

export default class Filter  {
    
    constructor(arrayOfFilter, type) {
        this.filters = arrayOfFilter;
        this.type = type;
    }

    render() {
        let options = "";
        let typeOfFilter;

        switch (this.type)  {
            case "Ingrédients" : typeOfFilter = "ingredients" ;
            break;

            case "Appareils" : typeOfFilter = "appareils";
            break;

            case "Ustensiles" :typeOfFilter = "ustensiles" ;
            break;

        } 

        this.filters.forEach((filter) => {
            options += `<li data-belong="${typeOfFilter}" class="dropdown__item">${filter}</li>`
        });



        return `<div class="dropdown">
        <button type="button"  class="btn btn-lg btn-primary btn-${typeOfFilter} dropdown-toggle" data-filter="${typeOfFilter}"  data-bs-auto-close="outside">
          ${this.type}<i data-filter="${typeOfFilter}" class="fa-solid fa-chevron-down"></i>
        </button>
        <ul data-filter="${typeOfFilter}" class="dropdown__menu">
            ${options}
        </ul>
          
        </div>
        `
    }
}
