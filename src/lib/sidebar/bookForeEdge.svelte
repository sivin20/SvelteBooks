<script>
    export let rotate = false
    export let color = 'red';
    export let bookMark = false;
</script>


<main style="border-color: {color}" class:rotate-180={rotate} class="bg-transparent h-full items-start flex justify-center text-white w-full rounded-s-lg border-y-8 border-l-8 flex-col">
    <div class="w-[98%] h-full bg-white relative">
        {#if bookMark}
            {#if !rotate}
                <div class="absolute left-4 top-3">
                    <div class:rotate-180={rotate} class="h-[30px] w-[20px] bg-purple-800"></div>
                    <div class="absolute bottom-[-1px] arrow"></div>
                </div>
            {/if}

            {#if rotate}
                <div class="absolute left-4 top-4">
                    <div class:rotate-180={rotate} class="h-[30px] w-[20px] bg-purple-800"></div>
                    <div class="absolute top-[-1px] arrow-bottom"></div>
                </div>
            {/if}
        {/if}

        <div class="h-1/5 border-b-2 border-slate-400 w-full"></div>
        <div class="h-1/5 border-b-2 border-slate-400 w-full"></div>
        <div class="h-1/5 border-b-2 border-slate-400 w-full"></div>
        <div class="h-1/5 border-b-2 border-slate-400 w-full"></div>
    </div>
</main>

<style>
    .arrow {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 5px solid white;
    }

    .arrow-bottom {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 5px solid white;
    }
</style>