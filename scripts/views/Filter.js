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



      

    //     <div class="dropdown">
    //     <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
    //       Dropdown form
    //     </button>
    //     <form class="dropdown-menu p-4">
    //       <div class="">
    //         <label for="exampleDropdownFormEmail2" class="form-label">Email address</label>
    //         <input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com">
    //       </div>
       
       
    //     </form>
    //   </div>


    //   <p class="filter__title" >Trier par</p>
    //         <div class="filter__choice" id="filter__choice">
    //             <button role="none" aria-haspopup="true" aria-expanded="false" aria-controls="allOptions" aria-labelledby="allOptions" aria-label="Afficher les options de tri" class="filter__button" id="tri"><span>Popularité</span><i class="fa-solid fa-angle-down"></i></button>
    //             <ul id="allIngrediens" role="listbox" class="filter__options">
    //              ${options}
    //             </ul>
            
    //         </div>


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
