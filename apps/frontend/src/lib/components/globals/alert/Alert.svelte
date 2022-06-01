<script lang="ts">
	export let message = 'This is an example message';
	export let border = 'border-red-600';
</script>

<div class={`bg-slate-600 relative text-center w-5/6 p-1 mt-1 rounded-md border-2 ${border}`}>
	{message}
</div>

<style>
	div {
		animation: appear 5s;
	}
	@keyframes appear {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}
</style>