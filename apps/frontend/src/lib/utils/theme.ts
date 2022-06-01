import { get } from "svelte/store";
import { theme } from "$lib/stores";

export function changeTheme() {
    if (get(theme) === "light") {
        theme.set("dark");
    } else {
        theme.set("light");
    }
}