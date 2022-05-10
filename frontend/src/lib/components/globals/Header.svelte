<script lang="ts">
    export let cssFrame: string;
</script>

{#if cssFrame == 'tailwindcss'}
    <header class="w-full h-auto">

    </header>
{:else}
    <header class="">

    </header>
{/if}