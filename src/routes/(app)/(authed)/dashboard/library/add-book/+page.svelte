<script lang="ts">
    import BookCard from '$lib/components/bookCard.svelte'
    import type {Book} from "../../../../../../lib/models/Book";
    import {BookService} from "../../../../../../lib/services/book.service";
    import toast, {Toaster} from "svelte-french-toast";
    import Fa from 'svelte-fa'
    import {faSearch, faTrashCan, faPlus} from '@fortawesome/free-solid-svg-icons'
    import {SEARCH_TYPE} from "../../../../../../lib/models/SearchType";

    /** @type {import('.$types').PageData} */
    export let data;
    let searchParam = ''

    let searchType = [];
    $: console.log("st", searchType)
    let searchValue = [];
    $: console.log("sv", searchValue)

    let searchTypeList: SEARCH_TYPE[] = [SEARCH_TYPE.intitle, SEARCH_TYPE.inauthor, SEARCH_TYPE.isbn]

    let activeFilters: string[] = []
    $: console.log("af", activeFilters)

    $: activeCard = 0

    const { libraries } = data

    let library;
    $: library

    const searchBooks = async () => {
        console.log("searchType", searchType)
        let query = `q=${searchParam.replace(/ /g, '+')}`;
        for (let i = 0; i < searchType.length; i++) {
            query = query + `+${searchType[i]}:${searchValue[i].replace(/ /g, '+')}`
        }
        console.log("q", query)
        let bookData
        try {
            bookData = await BookService.searchBook(query)
            return bookData as Book[]
        } catch (e) {
            toast.error(`${e}`, {
                position: "top-right"
            });
            return []
        }
    }

    function addSearchFilter() {
        if(activeFilters.length < 3) {
            activeFilters.push(`${activeFilters.length}`);
            activeFilters = activeFilters;
        }
    }

    function removeSearchFilter(index: number) {
        activeFilters.splice(index, 1)
        activeFilters = activeFilters

        searchValue.splice(index, 1)
        searchValue = searchValue

        searchType.splice(index, 1)
        searchType = searchType
    }

    let books: Book[] = [];
    $: books

    async function handleSearch(): Promise<void> {
        books = await searchBooks() as Book[]
    }

    async function addBook(event) {
        let book: Book = event.detail.text as Book
        books = books.filter(b => b.id != book.id)
        const error = await BookService.addBook(book, library)

        if(error) {
            toast.error(`Error: ${error.message}`, {
                position: "top-right"
            });
        } else {
            toast.success(`Succesfully added ${book.title}`, {
                position: "top-right"
            });
        }
    }

</script>

<main class="h-full flex flex-col">
    <div class="mb-2">
        <p class="text-3xl"><strong>Add books</strong></p>
    </div>
    <h1 class="text-xl">Search for books you wish to add to your library</h1>
    <form class="flex bg-[--background-primary] w-full mt-4">
        <div class="flex p-1 bg-[--input-field-color] rounded-[6px] w-full max-w-[650px] h-[52px] items-center mr-2">
            <Fa class="h-full mr-2 ml-2 text-[--secondary--accent-1]" icon="{faSearch}"></Fa>
            <input class="h-full w-full bg-transparent" type="text" id="bookSearch" bind:value={searchParam} placeholder="Search">
        </div>
        <button type="submit" on:click={handleSearch} class="secondary-button">Search</button>
    </form>
    <div class="flex flex-col w-full max-w-[650px] mt-4">
        {#if activeFilters.length > 0}
            <div class="flex">
                <select name="filter" id="1" class="mb-4" bind:value={searchType[0]} disabled="{searchType.length > 1}">>
                    {#each searchTypeList as type}
                        <option value="{type}" >{type}</option>
                    {/each}
                </select>
                <div class="flex p-1 bg-[--input-field-color] rounded-[6px] h-[32px] items-center mr-2 ml-2">
                    <input type="text" class="h-full w-full bg-transparent" bind:value={searchValue[0]}>
                </div>
                <div class="h-[32px] flex items-center justify-center cursor-pointer" on:click={() => {removeSearchFilter(0)}}>
                    <Fa icon="{faTrashCan}" class=""></Fa>
                </div>
            </div>
        {/if}
        {#if activeFilters.length > 1}
            <div class="flex">
                <select name="filter" id="2" class="mb-4" bind:value={searchType[1]} disabled="{searchType.length > 2}">
                    {#each searchTypeList as type}
                        {#if type !== searchType[0]}
                            <option value="{type}" >{type}</option>
                        {/if}
                    {/each}
                </select>
                <div class="flex p-1 bg-[--input-field-color] rounded-[6px] h-[32px] items-center mr-2 ml-2">
                    <input type="text" class="h-full w-full bg-transparent" bind:value={searchValue[1]}>
                </div>
                <div class="h-[32px] flex items-center justify-center cursor-pointer" on:click={() => {removeSearchFilter(1)}}>
                    <Fa icon="{faTrashCan}" class=""></Fa>
                </div>
            </div>
        {/if}
        {#if activeFilters.length > 2}
            <div class="flex">
                <select name="filter" id="3" class="mb-4" bind:value={searchType[2]}>
                    {#each searchTypeList as type}
                        {#if type !== searchType[0] && type !== searchType[1]}
                            <option value="{type}" >{type}</option>
                        {/if}
                    {/each}
                </select>
                <div class="flex p-1 bg-[--input-field-color] rounded-[6px] h-[32px] items-center mr-2 ml-2">
                    <input type="text" class="h-full w-full bg-transparent" bind:value={searchValue[2]}>
                </div>
                <div class="h-[32px] flex items-center justify-center cursor-pointer" on:click={() => {removeSearchFilter(2)}}>
                    <Fa icon="{faTrashCan}"></Fa>
                </div>
            </div>
        {/if}
        {#if activeFilters.length < 3}
            <div class="flex items-center">
                <button class="bg-[--secondary--accent-2] text-[--secondary-accent-1] rounded-[6px] w-[149px] h-8 flex items-center justify-center" on:click={() => {addSearchFilter()}}>
                    <Fa icon="{faPlus}"></Fa>
                </button>
                <p class="ml-2"><strong>Add more criteria</strong></p>
            </div>
        {/if}
    </div>
    <section class="mt-4 md:mt-0 flex flex-col items-center">
        <div class="grid gap-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 mt-6">
            {#await books}
                <p>...loading</p>
            {:then result}
                {#each result as book, i (book.id)}
                    <div on:mouseenter="{() => activeCard = i}" on:mouseleave="{() => activeCard = 999}">
                        <BookCard on:message={addBook} active="{activeCard === i}" book="{book}"/>
                    </div>
                {/each}
            {:catch error}
                <p>Error {error}</p>
            {/await}
        </div>
    </section>
    <Toaster/>
</main>

<style lang="scss">

</style>