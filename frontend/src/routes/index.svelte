<script>
    import { cssFrame } from "$lib/stores/index";
</script>

{#if $cssFrame == 'tailwindcss'}
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