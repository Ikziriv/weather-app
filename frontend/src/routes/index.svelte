<script context="module">
    export async function load() {
        let res;
        try {
		    res = await fetch("https://api.adviceslip.com/advice"); 
        } catch (error) {
            return {
                props: {
                    advice: "No internet connection!"
                }
            }
        }
		const data = await res.json();
		return {
            props: {
                advice: data.slip.advice
            }
        }
	}
</script>

<script>
    import { onMount } from 'svelte';
    import { slide } from "svelte/transition";
    import { selectTextOnFocus } from "$lib/utils/index";
    import { cssFrame } from "$lib/stores/index";
    import { changeUnit } from "$lib/utils/unit";
    import { getHoursFromDate } from "$lib/utils/date";
    import { changeFetchLocation } from "$lib/utils/location";
    import { theme, fetchLocation, unit } from "$lib/stores/index";
    
    export let advice;

    let astro;
    let location = "Fetching Location...";
    let forecastDay = 0;
    let showFav = false;
    let suggestions = [];
    
    let weatherData = new Promise(() => {});

    async function getSuggestions() {
        // If Input is empty or just spaces, don't show suggestions
        if (location.match(/^ *$/) !== null) {
            return;
        }
        const res = await fetch(`/api/suggestion/${location}.json`);
        if (res.ok) {
            const result = await res.json();
  		    suggestions = result;
            suggestions.length = (suggestions.length === 10) ? 5 : 0; 
		} else {
			throw new Error(await res.json());
		}
    }
    
    function getLocation() {
        location = "fetching location..."
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                location = `${position.coords.latitude},${position.coords.longitude}`;
                weatherData = getWeather();
            });
        } else {
            alert("Geolocation not available!");
        }
    }
    
    $: {
        if ($fetchLocation === "on") getLocation();
    }

    async function getWeather() {
        showFav = false;
        let res = await fetch(`/api/${location}.json`);
        if (res.ok) {
            const result = await res.json();
            location = result.location.name;
            astro = result.forecast.forecastday[0].astro;
            localStorage.setItem("location", `${result.location.name} ${result.location.region}`);
  		    return result;
		} else {
			throw new Error(await res.json());
		}
    }

    let showForecastMainCard = false;
    let forecastDetails = {
        data: "",
        time: ""
    };
    
    const getForecast = (/** @type {{ location: { localtime: string; }; forecast: { forecastday: { [x: string]: { hour: any; }; }; }; }} */ result, /** @type {number} */ day) => {
        let now = getHoursFromDate(result.location.localtime);
        let forecast = result.forecast.forecastday[day].hour; // weather report per hour
        let forecastArray = [];
        if (day === 0) {
            for (let i = Number(now) + 1; i < 24; i++) {
                forecastArray.push(forecast[i]);
            }

            if (forecastArray.length === 0) return [forecast[23]];
            return forecastArray;
        } else {
            return forecast;
        }
    }

    onMount(() => {
        // Default to Jakarta at load
        location = localStorage.getItem("location") || "Jakarta";
        weatherData = getWeather();
        if ($fetchLocation === "on") getLocation();
    });
</script>

{#if $cssFrame == 'tailwindcss'}
<div class="w-full h-auto bg-transparent">
    <div class="grid grid-cols-12 gap-2 w-full h-auto">
        <div class="col-span-full md:col-span-4 border-r">
            <div class="flex flex-col w-auto h-auto px-8 md:px-16 py-4 md:py-8">
                <!-- Flex 1 -->
                <div class="flex flex-col space-y-2 justify-center items-center w-auto h-auto bg-white rounded-2xl shadow-xl px-8 py-16">
                    <span class="font-bold text-md">Today</span>
                    <span class="font-thin text-sm">Sat, 3 May</span>
                    <span class="font-thin text-8xl pt-4">23</span>
                    <span class="font-thin text-sm">Berlin, Germany</span>
                </div>
            </div>
            <div class="flex justify-center items-center px-8 md:px-20">
                <button class="flex justify-center items-center w-full h-auto rounded-2xl border shadow-xl py-2">
                    <span class="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </span>
                    <span class="text-medium text-sm">Add to Favorite</span>
                </button>
            </div>
        </div>
        <div class="col-span-full md:col-span-8">
            <div class="flex justify-start items-start pl-8 md:pl-16 ml-2 py-4 md:py-8">
                <span class="text-xl mr-2 font-bold">Weather</span>
                <span class="text-xl font-thin">Forecast</span>
            </div>
            <div class="grid grid-cols-4 gap-0">
                <div class="col-span-2 md:col-span-1 w-full h-auto">
                    <div class="flex flex-col w-full h-auto px-4 md:px-8 py-2 md:py-4">
                        <!-- Flex 1 -->
                        <div class="flex flex-col space-y-2 justify-center items-center text-center w-full h-auto bg-white rounded-2xl shadow-xl px-4 py-8">
                            <span class="font-bold text-sm">Today</span>
                            <span class="font-thin text-xs">Sat, 3 May</span>
                            <span class="font-thin text-4xl pt-4">23</span>
                            <span class="font-thin text-xs">Berlin, Germany</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 md:col-span-1 w-full h-auto">
                    <div class="flex flex-col w-full h-auto px-4 md:px-8 py-2 md:py-4">
                        <!-- Flex 1 -->
                        <div class="flex flex-col space-y-2 justify-center items-center text-center w-full h-auto bg-white rounded-2xl shadow-xl px-4 py-8">
                            <span class="font-bold text-sm">Today</span>
                            <span class="font-thin text-xs">Sat, 3 May</span>
                            <span class="font-thin text-4xl pt-4">23</span>
                            <span class="font-thin text-xs">Berlin, Germany</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 md:col-span-1 w-full h-auto">
                    <div class="flex flex-col w-full h-auto px-4 md:px-8 py-2 md:py-4">
                        <!-- Flex 1 -->
                        <div class="flex flex-col space-y-2 justify-center items-center text-center w-full h-auto bg-white rounded-2xl shadow-xl px-4 py-8">
                            <span class="font-bold text-sm">Today</span>
                            <span class="font-thin text-xs">Sat, 3 May</span>
                            <span class="font-thin text-4xl pt-4">23</span>
                            <span class="font-thin text-xs">Berlin, Germany</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 md:col-span-1 w-full h-auto">
                    <div class="flex flex-col w-full h-auto px-4 md:px-8 py-2 md:py-4">
                        <!-- Flex 1 -->
                        <div class="flex flex-col space-y-2 justify-center items-center text-center w-full h-auto bg-white rounded-2xl shadow-xl px-4 py-8">
                            <span class="font-bold text-sm">Today</span>
                            <span class="font-thin text-xs">Sat, 3 May</span>
                            <span class="font-thin text-4xl pt-4">23</span>
                            <span class="font-thin text-xs">Berlin, Germany</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{:else}
<div class="w-full h-screen bg-gray-100/50">
    <div class="grid grid-cols-12 gap-2 w-full h-auto">
        <div class="col-span-full md:col-span-4">
            Left
        </div>
        <div class="col-span-full md:col-span-8">
            Right
        </div>
    </div>
</div>
{/if}