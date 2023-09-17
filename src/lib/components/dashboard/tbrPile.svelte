<script lang="ts">
    import type {Book} from "$lib/models/Book";

    export let tbrs: Book[]
</script>


<div class="flex flex-col xl:flex-row items-center xl:gap-0 gap-[42px]">
    <div class="flex flex-col justify-between xl:h-[220px] w-full xl:w-auto">
        <div class="pr-0 xl:pr-6">
            <div class="flex justify-between">
                <p class="text-[25px] font-bold">To Be Reads</p>
                <a href="/dashboard/library" class="small-primary-button">See full list</a>
            </div>
            <p class="max-w-xl pt-4">"Explore your 'To Be Read' (TBR) list – a treasure trove of upcoming reads.
                Check out the latest 5 additions here, or dive into the full list by clicking 'See Full List' to plan your next literary adventure!"</p>
        </div>
        <div class="hidden xl:block h-[42px] border-2-[--primary-accent-1] rounded-s-[6px] bg-[--primary-accent-1] w-full"></div>
    </div>
    <div class="hidden xl:block w-[42px] bg-[--primary-accent-1] h-[220px] border-2-[--primary-accent-1] rounded-tl-[6px] rounded-br-[6px]"></div>
    <div class="flex-auto overflow-x-auto md:overflow-x-hidden md:w-fit h-[220px] w-[calc(100vw-2rem)]">
        <div class="w-fit lg:w-full mb-2">
            <div class="h-[42px] w-full bg-[--primary-accent-1] mb-[-25px] border-2-[--primary-accent-1] rounded-[6px] xl:rounded-none xl:rounded-e-[6px]"></div>
            <div class="flex justify-center items-center gap-2 xl:mx-0 mx-4">
                {#if tbrs.length !== 0}
                    {#each tbrs as book, i}
                        <div class="book h-[192px] w-[128px] bg-[--secondary--accent-2] flex items-center justify-center flex-shrink-0">
                            <img class='book h-[192px] w-[128px]' src="{book.image_link}" alt="Book images">
                        </div>
                    {/each}
                {:else}
                    <div class="book h-[192px] w-full bg-[--input-field-color] flex items-center justify-center">
                        <p>You have no books in your TBR pile yet, go add some <a href="/dashboard/library/add-book"><u><strong>here</strong></u></a></p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .book {
        border-radius: 6px;

        svg {
            fill: var(--secondary--accent-1);
        }
    }
</style>