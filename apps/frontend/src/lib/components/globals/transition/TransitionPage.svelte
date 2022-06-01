<script lang="ts">
	import { blur } from 'svelte/transition';
	export let refresh: string = '';
</script>

{#key refresh}
	<div in:blur={{ duration: 600, delay: 600 }} out:blur={{ duration: 600 }}>
		<slot />
	</div>
{/key}