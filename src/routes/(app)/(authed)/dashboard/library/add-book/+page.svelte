<script lang="ts">
    import BookCard from '$lib/components/bookCard.svelte'
    import type { Book } from "../../../../../../lib/models/Book";
    import {BookService} from "../../../../../../lib/services/book.service";
    import toast, { Toaster } from "svelte-french-toast";
    import Fa from 'svelte-fa'
    import { faSearch } from '@fortawesome/free-solid-svg-icons'

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

<main class="h-full flex flex-col">
    <div class="mb-2">
        <p class="text-3xl"><strong>Add books</strong></p>
    </div>
    <h1 class="text-xl">Search for books you wish to add to your library</h1>
    <form class="flex bg-[--background-primary] w-full">
        <div class="flex p-1 bg-[--input-field-color] rounded-[6px] w-full max-w-[650px] h-[52px] items-center mr-2">
            <Fa class="h-full mr-2 ml-2 text-[--secondary--accent-1]" icon="{faSearch}"></Fa>
            <input class="h-full w-full bg-transparent" type="text" id="bookSearch" bind:value={searchParam} placeholder="Search">
        </div>
        <button type="submit" on:click={handleSearch} class="secondary-button">Search</button>
    </form>
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
    input, input:focus, input:active {
      outline: none;
      background-color: transparent;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
</style>