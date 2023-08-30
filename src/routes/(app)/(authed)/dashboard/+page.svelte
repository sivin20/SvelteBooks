
<script lang="ts">
    import BarChart from "$lib/components/barChart.svelte"
    import DrawnArrow from "$lib/assets/drawn_arrow_up.svg"
    import type {Book} from "$lib/models/Book";
    import LoadingSpinner from "$lib/components/loadingSpinner.svelte";
    import Countup from "svelte-countup";
    import {SortService} from "$lib/services/sort.service";


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

    type AuthorFrequency = {author: string, count: number}

    $: getMostPopularAuthors = (): AuthorFrequency[] => {
        let authormap: AuthorFrequency[] = [];

        for (let book of booksRead) {
            let existingAuthor = authormap.find(author => author.author === book.author);
            if (existingAuthor) {
                existingAuthor.count++;
            } else {
                authormap.push({ author: book.author, count: 1 });
            }
        }

        authormap.sort((a, b) => b.count - a.count);

        return authormap.slice(0, 5);
    }

    $: getLongestBooks = (): Book[] => {
        return booksRead.sort((a,b) => b.page_count - a.page_count).slice(0, 5)
    }

    $: getShortestBooks = (): Book[] => {
        return booksRead.sort((a,b) => a.page_count - b.page_count).slice(0, 5)
    }

</script>

<main class="content-box rounded-lg overflow-x-hidden">
    <section>
        <p class="text-[50px] mb-2"><strong>DASHBOARD</strong></p>
        <p class="text-[25px]">Welcome, {data.session.user.user_metadata.first_name}</p>
        <p class="max-w-xl pt-2">View statistics about your reading, including how many books you've read, how many pages that amounts to
            and how many hours you have spend reading based on your words read per minute</p>
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
<!--    Read-->
    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="py-8 md:w-1/2 w-full">
        <p class="text-[25px]">Monitor your reading</p>
        <p class="pt-2">Track your book count, pages read, and time spent immersed in your reads.
            Time calculations are based on an average of 300 words per page and a default reading speed set at 250 words per minute,
            which can be customized to reflect your own pace.</p>
    </section>

    <section class="flex flex-wrap items-center justify-center my-8 w-full md:h-[380px] rounded-2xl">
        <table class="h-full w-full md:w-2/6 text-white p-4 bg-[--secondary] rounded-s-2xl rounded-br-2xl">
            <tr class="flex flex-col items-start ml-10 justify-center h-1/3">
                <td>
                    <p class="text-sm mb-1"><strong>Books read</strong></p>
                    <p class="text-5xl">
                        <strong>
                            <Countup value={totalBooksRead()}
                                     initial={0}
                                     duration={1500}
                                     step={1}
                                     roundto={1}
                                     format={true}/>
                        </strong>
                    </p>
                </td>
            </tr>
            <tr class="flex flex-col items-start ml-10 justify-center h-1/3">
                <td>
                    <p class="text-sm mb-1"><strong>Pages read</strong></p>
                    <p class="text-5xl">
                        <strong>
                            <Countup value={totalPagesRead()}
                                     initial={0}
                                     duration={1500}
                                     step={1}
                                     roundto={1}
                                     format={true}/>
                        </strong>
                    </p>
                </td>
            </tr>
            <tr class="flex flex-col items-start ml-10 justify-center h-1/3">
                <td>
                    <p class="text-sm mb-1"><strong>Hours spend</strong></p>
                    <p class="text-5xl">
                        <strong>
                            <Countup value={totalHoursSpend()}
                                     initial={0}
                                     duration={1500}
                                     step={1}
                                     roundto={1}
                                     format={true}/>
                        </strong>
                    </p>

                </td>
            </tr>
        </table>
        <div class="md:w-4/6 w-full">
            <BarChart data="{booksWithPageCount()}"/>
        </div>
    </section>

    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="flex py-8">
        <div class="md:w-1/2 w-full">
            <p class="text-[25px]">Explore Your Reading Trends</p>
            <p> Here, we spotlight the authors you frequent the most, as well as the longest and shortest books that you've read.
                Gain valuable insights into your reading preferences, discovering the writers and book lengths that have truly captivated your interest.</p>
        </div>
    </section>
    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="flex justify-center flex-wrap py-8 gap-4">
        <div class="w-[300px] flex flex-col self-end">
            <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                <p class="text-white">Most Read Authors</p>
            </div>
            <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                {#each getMostPopularAuthors() as authorFrequency, i}
                    <li class="flex items-center">
                        <div class="flex flex-row justify-between w-full">
                            <p class="overflow-hidden text-ellipsis whitespace-nowrap">{authorFrequency.author}</p>
                            <p>({authorFrequency.count})</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
        <div class=" w-[300px] flex flex-col self-center">
            <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                <p class="text-white">Longest Books</p>
            </div>
            <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                {#each getLongestBooks() as book, i}
                    <li class="flex items-center">
                        <div class="flex flex-row justify-between w-full">
                            <p class="overflow-hidden text-ellipsis whitespace-nowrap">{book.title}</p>
                            <p>({book.page_count})</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
        <div class=" w-[300px] flex flex-col self-start">
            <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                <p class="text-white">Shortest Books</p>
            </div>
            <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                {#each getShortestBooks() as book, i}
                    <li class="flex items-center">
                        <div class="flex flex-row justify-between w-full">
                            <p class="overflow-hidden text-ellipsis whitespace-nowrap">{book.title}</p>
                            <p>({book.page_count})</p>
                        </div>
                    </li>
                {/each}
            </ol>
        </div>
    </section>
</main>

<style lang="scss">
    .book {
        border-radius: 6px;

        svg {
            fill: var(--secondary--accent-1);
        }
    }
</style>