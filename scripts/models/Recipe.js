export default class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.appliance = data.appliance;
        this.description = data.description;
        this.ustensils = data.ustensils;
    }
}