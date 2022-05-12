import { API_KEY } from "$lib/api";

export async function get({ params }) {
    const result = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.location}`);
    let data = await result.json();

    if (result.ok) {
        return {
            status: 200,
            body: data
        }
    } else {
        return {
            status: 404,
        }
    }
}