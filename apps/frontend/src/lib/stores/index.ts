import { writable, readable  } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { writable as lstore } from 'svelte-local-storage-store';

export const searchBar = writable(false);
export const menuExpanded = writable(false);
export const pageTransitionDelay = readable(900);
export const weather = writable({});
export const loading = writable(false);
export const alerts = writable([]);
export const msg = writable('Obtaining Geolocation...');

// Local Storage Store
export const theme: Writable<string> = lstore("theme", "light");
export const cssFrame: Writable<string> = lstore("vendor", "tailwindcss");
export const unit: Writable<string> = lstore("unit", "Imperial");
export const fetchLocation: Writable<string> = lstore("fetchLocation", "off");
export const favourites = lstore("favourites", []);