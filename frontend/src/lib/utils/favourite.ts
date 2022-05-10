import { get } from "svelte/store";
import { favourites } from "$lib/stores/index";

// add favourite to favourite list and save to localStorage
export function addFav (name, region) {
    let favs = get(favourites);
    let location = region ? `${name}, ${region}` : name; // only display region if there
    for (let i in favs) {
        if (favs[i] === location) {
            alert("You already saved this location!");
            return; 
        }
    }
    let updatedFavourites = [...favs, location];
    console.log(updatedFavourites);
    favourites.set(updatedFavourites);
}

export function deleteFav (id: number) {
    let favs = get(favourites);
    favourites.set(favs.splice(id, 1));
}