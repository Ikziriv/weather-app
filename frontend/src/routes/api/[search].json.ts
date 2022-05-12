import { API_KEY } from "$lib/api";

export async function get({ params }) {
    const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.search}&days=3&aqi=yes`);
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