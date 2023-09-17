<script lang="ts">
    import Countup from "svelte-countup";

    export let totalBooksRead, totalPagesRead, totalHoursSpend
</script>


<div class="h-full w-full text-white p-4 bg-[--secondary] rounded-2xl flex">
    <div class="flex justify-center w-1/3">
        <div class="flex items-start flex-col">
            <p class="text-sm mb-1"><strong>Books read</strong></p>
            <p class="text-5xl">
                <strong>
                    <Countup value={totalBooksRead}
                             initial={0}
                             duration={1500}
                             step={1}
                             roundto={1}
                             format={true}/>
                </strong>
            </p>
        </div>
    </div>
    <div class="flex justify-center w-1/3">
        <div class="flex items-start flex-col">
            <p class="text-sm mb-1"><strong>Pages read</strong></p>
            <p class="text-5xl">
                <strong>
                    <Countup value={totalPagesRead}
                             initial={0}
                             duration={1000}
                             step={50}
                             roundto={1}
                             format={true}/>
                </strong>
            </p>
        </div>
    </div>
    <div class="flex justify-center w-1/3">
        <div class="flex items-start flex-col">
            <p class="text-sm mb-1"><strong>Hours spend</strong></p>
            <p class="text-5xl">
                <strong>
                    <Countup value={totalHoursSpend}
                             initial={0}
                             duration={1500}
                             step={1}
                             roundto={1}
                             format={true}/>
                </strong>
            </p>
        </div>
    </div>
</div>