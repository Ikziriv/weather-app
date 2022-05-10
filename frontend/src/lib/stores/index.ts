import { writable, readable  } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { writable as lstore } from 'svelte-local-storage-store';

export const menuExpanded = writable(false);
export const pageTransitionDelay = readable(900);

// Local Storage Store
export const theme: Writable<string> = lstore("theme", "light");
export const cssFrame: Writable<string> = lstore("vendor", "tailwindcss");
export const unit: Writable<string> = lstore("unit", "Imperial");
export const fetchLocation: Writable<string> = lstore("fetchLocation", "off");
export const favourites = lstore("favourites", []);