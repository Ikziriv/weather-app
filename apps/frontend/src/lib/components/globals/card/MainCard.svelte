<script lang="ts">
    import { onMount } from 'svelte';
	import { weather } from '$lib/stores/index';
    
	let weatherObject: { today?: any; };
	weather.subscribe((obj) => (weatherObject = obj));
	const { today } = weatherObject;

    onMount(() => {
        // On Load
        console.log($weather);
    });
</script>
<div class="flex flex-col space-y-2 justify-center items-center w-auto h-auto bg-white rounded-2xl shadow-xl px-8 py-16">
    <span class="font-bold text-md">Today</span>
    <span class="font-thin text-sm">{today.date}</span>
    <span class="font-thin text-8xl pt-4">23</span>
    <span class="font-thin text-sm">Name, Time</span>
</div>