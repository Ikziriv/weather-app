const getWeather = async( /** @type {{ latitude: any; longitude: any; city: any; }} */ location, /** @type {any} */ astro) => {
    const { latitude, longitude, city } = location
    const url = city ? `/api/weather?q=${city}` : `/api/weather?q=${latitude},${longitude}`
    const response = await fetch(url)
    const data = await response.json();
    location = data.location.name;
    astro = data.forecast.forecastday[0].astro;
    localStorage.setItem("location", `${data.location.name} ${data.location.region}`);
    return data
};


export {
    getWeather
}