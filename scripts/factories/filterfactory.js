import Ustensils from "../models/Ustensils.js";
import Ingredients from "../models/Ingredients.js";

export default class MediaFactory {
    constructor(typeOfFilter) {
        if (typeOfFilter == "ustensils") {
            return new Ustensils();
        } else if (typeOfFilter == "ingredients") {
            return new Ingredients();
            // return new Video(data);
        } else {
            // return "type image ou video non défini"
        }

    }

}