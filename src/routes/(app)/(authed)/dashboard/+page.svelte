
<script lang="ts">
    import BarChart from "$lib/components/barChart.svelte"
    import type {Book} from "$lib/models/Book";
    import LoadingSpinner from "$lib/components/loadingSpinner.svelte";
    import CountupBar from "$lib/components/dashboard/countupBar.svelte";
    import WelcomeSection from "$lib/components/dashboard/welcomeSection.svelte";
    import BookChartMonitor from "$lib/components/dashboard/bookChartMonitor.svelte";
    import TbrPile from "$lib/components/dashboard/tbrPile.svelte";
    import {getImageFromCloud, userProfilePicture} from "$lib/stores/userStore";
    import {onMount} from "svelte";


    /** @type {import('.$types').PageData} */
    export let data;

    const { booksRead, tbrs, inProgress }: Book[] = data

    const readingSpeed: number = 238
    const avgWordsPerPage: number = 300
    const imageId = data.session.user.id;

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
        const list = [
            { pages: '<300', books: lowCount, id: 1 },
            { pages: '300-500', books: midCount, id: 2 },
            { pages: '500<', books: highCount, id:3 }]
        return list;
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

    onMount(async () => {
        await getImageFromCloud(imageId)
    });

</script>

<main class="content-box rounded-lg flex flex-col gap-[42px]">
    <section>
        <WelcomeSection
                first_name="{data.session.user.user_metadata.first_name}"
                userProfilePicture="{$userProfilePicture}"/>
    </section>

    <section>
        <CountupBar
                totalBooksRead="{totalBooksRead()}"
                totalPagesRead="{totalPagesRead()}"
                totalHoursSpend="{totalHoursSpend()}"/>
    </section>

    <section>
        <TbrPile tbrs="{tbrs}"/>
    </section>
<!--    Read-->
<!--    <div class="h-1 border-t-2 border-[&#45;&#45;input-field-color]"></div>-->
    <section>
        <BarChart data="{booksWithPageCount()}"/>
    </section>

    <div class="h-1 border-t-2 border-[--input-field-color]"></div>
    <section class="flex py-8">
        <div class="md:w-1/2 w-full">
            <p class="text-[25px]">Explore Your Reading Trends</p>
            <p> Here, we spotlight the authors you frequent the most, as well as the longest and shortest books that you've read.
                Gain valuable insights into your reading preferences, discovering the writers and book lengths that have truly captivated your interest.</p>
        </div>
    </section>


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

</style>