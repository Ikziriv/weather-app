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
    import { fade } from "svelte/transition";
    import { selectTextOnFocus } from "$lib/utils/index";
    import { cssFrame } from "$lib/stores/index";
    import { changeUnit } from "$lib/utils/unit";
    import { getHoursFromDate } from "$lib/utils/date";
    import { changeFetchLocation } from "$lib/utils/location";
    import { theme, fetchLocation, unit } from "$lib/stores/index";
    import { Loading, DailyAdviceCard, MainCard, ErrorWeather } from "$lib/components/globals/index";
    import { getSymbol } from "$lib/utils/helper";
    
    export let advice;

    let astro;
    let location = "Fetching Location...";
    let forecastDay = 0;
    let showFav = false;
    let ShowDetail = false;
    let suggestions = [];

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
    
    onMount(() => {
        // Default to Jakarta at load
        location = localStorage.getItem("location") || "London";
        weatherData = getWeather();
        if ($fetchLocation === "on") getLocation();
    });

    function getLocation() {
        location = "Fetching Location...";
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
    
    let weatherData = new Promise(() => {});
    async function getWeather() {
        showFav = false;
        let res = await fetch(`/api/${location}.json`, {
                            headers : { 
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        });
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
</script>

{#if $cssFrame == 'tailwindcss'}
{#await weatherData}
<Loading />
{:then data}
<div class="w-full h-auto bg-transparent">
    <div class="grid grid-cols-12 gap-2 w-full h-auto">
        <div class="col-span-full md:col-span-4 border-r relative">
            <div class="w-full h-auto flex flex-col">
                <div class="flex flex-col w-auto h-auto px-8 md:px-16 py-4 md:py-8">
                    <!-- Flex 1 -->
                    <!-- Card Main -->
                    <MainCard  />
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
        </div>
        <div class="col-span-full md:col-span-8 relative">
    
            <DailyAdviceCard {advice} />

            <div class="flex flex-col md:flex-row justify-between items-center w-full h-auto space-y-4 md:space-y-0 py-4 md:py-8">
               <div class="flex justify-start items-start pl-0 md:pl-16 ml-0 md:ml-2">
                    <span on:click={ () => { ShowDetail = !ShowDetail } } class="bg-white hover:bg-gray-100 p-2 rounded-md shadow hover:shadow-xl mr-4 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-3 h-3 bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </span>
                    <div class="flex justify-start items-start">
                        <span class="text-xl mr-2 font-bold">Weather</span>
                        <span class="text-xl font-thin">Forecast</span>
                    </div>
               </div>
               <div class="flex justify-end items-end pr-0 md:pr-16 mr-0 md:mr-2">
                   <div on:click={ () => { showFav = !showFav } } class="cursor-pointer flex justify-center items-center w-auto bg-white rounded-2xl px-8 md:px-4 py-2 shadow">
                        <span class="text-sm font-thin mr-2">Location</span>
                        <span class="text-sm font-bold">Favorite</span>
                   </div>
               </div>
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
            
            {#if showFav}
            <div class="grid grid-cols-4 gap-2 w-full h-auto mt-10 py-1" transition:fade>
                <div class="col-span-2 md:col-span-1 w-full h-auto">
                    <div class="flex justify-center items-center w-full h-auto px-4 py-2 md:py-4">
                        <!-- Button Fav 1 -->
                        <button class="flex justify-between items-center w-full rounded-2xl px-4 py-2 shadow border">
                            <div class="w-auto h-auto">
                                <span class="text-sm font-thin mr-2">Location</span>
                                <span class="text-sm font-bold">Favorite</span>
                            </div>
                            <div class="w-auto h-auto">
                                <span class="text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">
                                        <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>
{:catch error}
<ErrorWeather />
{/await}
{/if}