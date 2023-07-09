
<script lang="ts">
    import BarChart from "$lib/components/barChart.svelte"
    import DrawnArrow from "$lib/assets/drawn_arrow_up.svg"


    /** @type {import('.$types').PageData} */
    export let data;

    let d = [
        { pages: '<300', books: 30 },
        { pages: '300-500', books: 35 },
        { pages: '500<', books: 12 },
    ];
</script>

<main class="content-box rounded-lg p-0 sm:p-4 overflow-x-hidden">
    <section>
        <p class="text-[50px]"><strong>DASHBOARD</strong></p>

        <div class="flex justify-between">
            <div>
                <p>Welcome, {data.session.user.user_metadata.first_name}</p>
                <p class="max-w-xl">View statistics about your reading, including how many books you've read, how many pages that amounts to
                    and how many minutes you have spend reading based on your words read per minute</p>
            </div>
            <div class="flex items-start relative h-[20px] z-0">
                <p class="mr-[70px]">View your account details</p>
                <img class="absolute bottom-1 right-0" src="{DrawnArrow}" alt="Arrow point towards account details">
            </div>
        </div>
    </section>

    <section class="w-full block xl:flex justify-center xl:border-t-2 xl:border-[--input-field-color] py-8 xl:mt-4">
        <!--        TBR PILE-->
        <div class="h-1 border-t-2 border-[--input-field-color] my-4 "></div>
        <div class="flex-auto xl:mr-4">
            <div class="flex justify-between items-center mb-4">
                <p class="text-xl"><strong>TBR Pile</strong></p>
                <button class="small-primary-button">See full list</button>
            </div>
            <div class="flex justify-center items-center flex-wrap gap-2">
                {#each {length: 5} as _, i}
                    <div class="book h-[192px] w-[128px] bg-[--secondary--accent-2] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="49.18" height="56.19" viewBox="0 0 25.192 28.788">
                            <path data-name="Path 4" d="M25.182,20.15V1.444A1.324,1.324,0,0,0,23.744,0H5.4A5.3,5.3,0,0,0,0,5.2c0,.067,0,.135,0,.2V23.388a5.3,5.3,0,0,0,5.2,5.4q.1,0,.2,0H23.744a1.418,1.418,0,0,0,1.439-1.4c0-.014,0-.028,0-.042v-.9a1.554,1.554,0,0,0-.54-1.079,15.921,15.921,0,0,1,0-4.137,1.088,1.088,0,0,0,.54-1.08ZM8.1,9.448A.45.45,0,0,1,8.544,9H11.7V5.85a.45.45,0,0,1,.45-.45h2.7a.45.45,0,0,1,.45.45V9h3.148a.45.45,0,0,1,.45.45v2.7a.45.45,0,0,1-.45.45H15.294v3.148a.45.45,0,0,1-.45.45h-2.7a.45.45,0,0,1-.45-.45V12.6H8.544a.45.45,0,0,1-.45-.45Zm15,15.739H5.4a1.7,1.7,0,0,1-1.8-1.8,1.8,1.8,0,0,1,1.8-1.8H23.1Z"
                                  transform="translate(0.001 0.001)"/>
                        </svg>
                    </div>
                {/each}
            </div>
        </div>
        <!--        Currently reading -->
        <div class="h-1 border-t-2 border-[--input-field-color] my-4 "></div>
        <div class="xl:border-l-2 xl:border-[--secondary] xl:ps-4 w-full xl:w-1/3">
            <div class="flex justify-between items-center mb-4">
                <p class="text-xl"><strong>Books In Progress</strong></p>
                <button class="small-primary-button" style="background-color: #cccccc !important">See full list</button>
            </div>
            <ul>
                {#each {length: 3} as _}
                    <li class="mb-2">
                        <p><strong>Rhythm of War</strong></p>
                        <p class="text-sm"><i>Brandon Sanderson</i></p>
                    </li>
                {/each}
            </ul>
        </div>
    </section>
<!--    <p class="text-[32px]"><strong>Welcome, {data.session.user.user_metadata.first_name}</strong></p>-->
<!--    Read-->

    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="flex flex-wrap items-center justify-center py-8">
        <div class="flex flex-col justify-center w-full max-w-4xl">
            <div class="flex items-start max-w-2xl">
                <div class="text-6xl mr-6"><strong>32</strong></div>
                <div class="w-[350px]">
                    <p><strong>Books read</strong></p>
                    <p class="text-[14px]">You've read this many books</p>
                </div>
            </div>
            <div class="flex items-start self-end max-w-2xl mt-6">
                <div class="text-6xl mr-6"><strong>17.252</strong></div>
                <div class="max-w-[350px]">
                    <p><strong>Pages read</strong></p>
                    <p class="text-[14px]">You've read this many pages, which makes the average book have a page count of 345</p>
                </div>
            </div>
            <div class="flex items-start mt-6 max-w-2xl">
                <div class="text-6xl mr-6"><strong>957</strong></div>
                <div class="w-[350px]">
                    <p><strong>Hours spend</strong></p>
                    <p class="text-[14px]">You've spend this many hours based on the average word count of a book and your wpm</p>
                </div>
            </div>
        </div>
    </section>

    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="flex justify-center py-8">
        <BarChart data="{d}"/>
    </section>
<!--    <div class="flex flex-col w-1/3 justify-center mr-10 xl:border-r-2 xl:border-[&#45;&#45;secondary]">-->
<!--        <div class="py-4">-->
<!--            <p><strong>Most Read Author</strong></p>-->
<!--            <p class="text-[14px]">Brandon Sanderson</p>-->
<!--        </div>-->
<!--        <div class="py-4">-->
<!--            <p><strong>Longest Book</strong></p>-->
<!--            <p class="text-[14px]">Rhythm of War</p>-->
<!--        </div>-->
<!--        <div class="py-4">-->
<!--            <p><strong>Shortest book</strong></p>-->
<!--            <p class="text-[14px]">Hitchhiker's guide to the galaxy</p>-->
<!--        </div>-->
<!--    </div>-->
    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="flex justify-center flex-wrap py-8 gap-4">
        <div class=" w-[300px] flex flex-col self-end">
            <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                <p class="text-white">Most Read Authors</p>
            </div>
            <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                {#each {length: 5} as _, i}
                    <li>Brandon Sanderson</li>
                {/each}
            </ol>
        </div>
        <div class=" w-[300px] flex flex-col self-center">
            <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                <p class="text-white">Longest Books</p>
            </div>
            <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                {#each {length: 5} as _, i}
                    <li>Don Quixote</li>
                {/each}
            </ol>
        </div>
        <div class=" w-[300px] flex flex-col self-start">
            <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                <p class="text-white">Shortest Books</p>
            </div>
            <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                {#each {length: 5} as _, i}
                    <li>Hitchhiker's guide to the galaxy</li>
                {/each}
            </ol>
        </div>
    </section>

    <div class="xl:h-1 xl:border-t-2 xl:border-[--input-field-color]"></div>
</main>

<style lang="scss">
    .book {
        border-radius: 6px;

        svg {
            fill: var(--secondary--accent-1);
        }
    }
</style>