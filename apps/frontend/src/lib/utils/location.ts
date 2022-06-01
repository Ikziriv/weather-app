import { get } from "svelte/store";
import { fetchLocation } from "$lib/stores/index";

export function changeFetchLocation() {
    if (get(fetchLocation) === "off") {
        fetchLocation.set("on");
    } else {
        fetchLocation.set("off");
    }
}