<script lang="ts">
    export let cssFrame: string;
</script>

{#if cssFrame == 'tailwindcss'}
    <footer class="w-full h-auto">

    </footer>
{:else}
    <footer class="">

    </footer>
{/if}