
<script lang="ts">
    import BarChart from "$lib/components/barChart.svelte"
    import type {Book} from "$lib/models/Book";
    import LoadingSpinner from "$lib/components/loadingSpinner.svelte";
    import CountupBar from "$lib/components/dashboard/countupBar.svelte";
    import WelcomeSection from "$lib/components/dashboard/welcomeSection.svelte";
    import BooksInProgress from "$lib/components/dashboard/booksInProgress.svelte";
    import BookCarousel from "$lib/components/dashboard/bookCarousel.svelte";
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

    <section>
        <BarChart data="{booksWithPageCount()}"/>
    </section>

    <section>
        <BooksInProgress inProgress="{inProgress}"/>
    </section>

    <section>
        <BookCarousel
                getLongestBooks="{getLongestBooks()}"
                getMostPopularAuthors="{getMostPopularAuthors()}"
                getShortestBooks="{getShortestBooks()}"/>
    </section>
</main>

<style lang="scss">

</style>