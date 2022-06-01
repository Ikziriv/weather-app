import { API_KEY } from "$lib/api";

const getSuggestion = async(location) => {
    const { latitude, longitude, city } = location
    const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${location}`
    const response = await fetch(url)
    const data = await response.json()
    return data
};


export {
    getSuggestion
}