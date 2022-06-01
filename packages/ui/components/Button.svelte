<script lang="ts">
    export let buttonText: string = ""
    export let classes: string = ""
</script>

<button class="w-auto h-auto px-8 py-2 {classes}">
    <span>{buttonText}</span>
</button>