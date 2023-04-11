<script lang="ts">
    import BookCard from '$lib/components/bookCard.svelte'
    import type { Book } from "../../../../../../lib/models/Book";
    import {BookService} from "../../../../../../lib/services/book.service";
    import toast, { Toaster } from "svelte-french-toast";

    /** @type {import('.$types').PageData} */
    export let data;
    let searchParam = ''
    $: activeCard = 0

    const { libraries } = data

    let library;
    $: library

    const searchBooks = async () => {
        const books = await BookService.searchBook(searchParam)
        return books as Book[]
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

<main class="p-4 bg-white rounded-xl">
    <Toaster/>
    <div class="w-1/2">
        <div class="mt-5">
            <p>Search for a book...</p>
            <form action="#" class="flex mt-1">
                <div class="input-text">
                    <label for="search">Search query</label>
                    <input type="text" id="search" bind:value={searchParam} placeholder="E.g. 'Harry Potter'">
                </div>
                <button type="submit" on:click={handleSearch} class="primary-button">Search</button>
            </form>
        </div>
        <p class="mt-5">Which library do you want to add the book to?</p>
        <select name="library" id="library" class="input-text flex items-center mt-1" bind:value="{library}">
            {#each libraries as library}
                <option value="{library.id}">{library.name}</option>
            {/each}
        </select>
    </div>
    <div class="mt-5 flex flex-col items-center overflow-y-auto">
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
</main>