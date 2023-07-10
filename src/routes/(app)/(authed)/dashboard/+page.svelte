
<script lang="ts">
    import BarChart from "$lib/components/barChart.svelte"
    import DrawnArrow from "$lib/assets/drawn_arrow_up.svg"
    import type {Book} from "$lib/models/Book";
    import LoadingSpinner from "$lib/components/loadingSpinner.svelte";


    /** @type {import('.$types').PageData} */
    export let data;

    const { booksRead, tbrs, inProgress }: Book[] = data

    const readingSpeed: number = 238
    const avgWordsPerPage: number = 300

    $: totalBooksRead = () => {
        let result: number = 0
        for (let book: Book in booksRead) {
            result += 1
        }
        return result
    }

    $: totalPagesRead = () => {
        let result: number = 0
        for (let book: Book of booksRead) {
            result += book.page_count
        }
        return result
    }

    $: totalHoursSpend = () => {
        const pages = totalPagesRead()
        const words = pages * avgWordsPerPage
        return ((words / readingSpeed) / 60).toFixed(0)
    }

    $: booksWithPageCount = () => {
        let lowCount: number = 0
        let midCount: number = 0
        let highCount: number = 0
        for(let book: Book of booksRead) {
            if(book.page_count < 300) {
                lowCount++
            } else if(book.page_count < 500) {
                midCount++
            } else {
                highCount++
            }
        }
        return [
            { pages: '<300', books: lowCount },
            { pages: '300-500', books: midCount },
            { pages: '500<', books: highCount }];
    }

    let d = [
        { pages: '<300', books: 30 },
        { pages: '300-500', books: 35 },
        { pages: '500<', books: 12 },
    ];
</script>

<main class="content-box rounded-lg overflow-x-hidden">
    <section>
        <p class="text-[50px]"><strong>DASHBOARD</strong></p>

        <div class="flex justify-between gap-8">
            <div>
                <p>Welcome, {data.session.user.user_metadata.first_name}</p>
                <p class="max-w-xl">View statistics about your reading, including how many books you've read, how many pages that amounts to
                    and how many minutes you have spend reading based on your words read per minute</p>
            </div>
            <div class="flex items-start relative h-[20px] z-0 hidden md:block">
                <img class="absolute bottom-5 left-5" src="{DrawnArrow}" alt="Arrow point towards account details">
                <p>View your account details</p>
            </div>
        </div>
    </section>

    <section class="w-full block xl:flex justify-center xl:border-t-2 xl:border-[--input-field-color] py-8 xl:mt-4">
        <!--        TBR PILE-->
        <div class="h-1 border-t-2 border-[--input-field-color] my-4 "></div>
        <div class="flex-auto xl:mr-4">
            <div class="flex justify-between items-center mb-4">
                <p class="text-xl"><strong>TBR Pile</strong></p>
                <a href="/dashboard/library" class="small-primary-button">See full list</a>
            </div>
            <div class="flex justify-center items-center flex-wrap gap-2">
                {#await tbrs}
                    <LoadingSpinner />
                {:then tbrs}
                    {#if tbrs.length}
                        {#each tbrs as book, i}
                            <!--                    <div class="book h-[192px] w-[128px] bg-[&#45;&#45;secondary&#45;&#45;accent-2] flex items-center justify-center">-->
                            <!--                        <svg xmlns="http://www.w3.org/2000/svg" width="49.18" height="56.19" viewBox="0 0 25.192 28.788">-->
                            <!--                            <path data-name="Path 4" d="M25.182,20.15V1.444A1.324,1.324,0,0,0,23.744,0H5.4A5.3,5.3,0,0,0,0,5.2c0,.067,0,.135,0,.2V23.388a5.3,5.3,0,0,0,5.2,5.4q.1,0,.2,0H23.744a1.418,1.418,0,0,0,1.439-1.4c0-.014,0-.028,0-.042v-.9a1.554,1.554,0,0,0-.54-1.079,15.921,15.921,0,0,1,0-4.137,1.088,1.088,0,0,0,.54-1.08ZM8.1,9.448A.45.45,0,0,1,8.544,9H11.7V5.85a.45.45,0,0,1,.45-.45h2.7a.45.45,0,0,1,.45.45V9h3.148a.45.45,0,0,1,.45.45v2.7a.45.45,0,0,1-.45.45H15.294v3.148a.45.45,0,0,1-.45.45h-2.7a.45.45,0,0,1-.45-.45V12.6H8.544a.45.45,0,0,1-.45-.45Zm15,15.739H5.4a1.7,1.7,0,0,1-1.8-1.8,1.8,1.8,0,0,1,1.8-1.8H23.1Z"-->
                            <!--                                  transform="translate(0.001 0.001)"/>-->
                            <!--                        </svg>-->
                            <!--                    </div>-->
                            <div class="book h-[192px] w-[128px] bg-[--secondary--accent-2] flex items-center justify-center">
                                <img class='book h-[192px] w-[128px]' src="{book.image_link}" alt="Book images">
                            </div>
                        {/each}
                    {:else}
                        <div class="book h-[192px] w-full bg-[--input-field-color] flex items-center justify-center">
                            <p>You have no books in your TBR pile yet, go add some <a href="/dashboard/library/add-book"><u><strong>here</strong></u></a></p>
                        </div>

                    {/if}
                {/await}
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
                {#if inProgress}
                    {#each inProgress as book}
                        <li class="mb-2">
                            <p><strong>{book.title}</strong></p>
                            <p class="text-sm"><i>{book.author}</i></p>
                        </li>
                    {/each}
                {:else}
                    <p>You do not have any books in progress</p>
                {/if}
            </ul>
        </div>
    </section>
<!--    <p class="text-[32px]"><strong>Welcome, {data.session.user.user_metadata.first_name}</strong></p>-->
<!--    Read-->

    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="flex flex-wrap items-center justify-center py-8">
        <div class="flex flex-col justify-center w-full max-w-4xl">
            <div class="flex items-start max-w-2xl">
                <div class="text-6xl mr-6"><strong>{totalBooksRead()}</strong></div>
                <div class="w-[350px]">
                    <p><strong>Books read</strong></p>
                    <p class="text-[14px]">You've read this many books</p>
                </div>
            </div>
            <div class="flex items-start self-end max-w-2xl mt-6">
                <div class="text-6xl mr-6"><strong>{totalPagesRead()}</strong></div>
                <div class="max-w-[350px]">
                    <p><strong>Pages read</strong></p>
                    <p class="text-[14px]">You've read this many pages, which makes the average book have a page count of 345</p>
                </div>
            </div>
            <div class="flex items-start mt-6 max-w-2xl">
                <div class="text-6xl mr-6"><strong>{totalHoursSpend()}</strong></div>
                <div class="w-[350px]">
                    <p><strong>Hours spend</strong></p>
                    <p class="text-[14px]">You've spend this many hours based on the average word count of a book and your reading speed of {readingSpeed} wpm</p>
                </div>
            </div>
        </div>
    </section>

    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="flex justify-center py-8">
        <BarChart data="{booksWithPageCount()}"/>
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