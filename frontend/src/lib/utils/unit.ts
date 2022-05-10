import { get } from "svelte/store";
import { unit } from "$lib/stores";

export function changeUnit() {
    if (get(unit) === "Imperial") {
        unit.set("Metric");
    } else {
        unit.set("Imperial");
    }
}