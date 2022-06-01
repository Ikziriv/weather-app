<script lang="ts">
    export let advice;
</script>
<div class="absolute left-8 -bottom-16 flex justify-center items-center w-auto h-auto hidden md:block pt-2">
    <div class="advice flex flex-row justify-center items-center w-96 h-auto bg-transparent px-4 p-2 border rounded-2xl">
        <span class="text-xs uppercase mr-4">
            <small>Your Daily <b>Advice</b> :</small>
        </span>
        <span class="text-xs uppercase mr-0">
            <small>{advice}</small>
        </span>
    </div>
</div>