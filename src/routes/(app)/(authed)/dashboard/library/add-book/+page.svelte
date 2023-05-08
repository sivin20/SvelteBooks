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
    <section class="md:flex mt-4 flex-auto overflow-hidden h-full">
        <div class="md:mr-4 flex md:w-2/6 p-4 content-box">
            <div >
                <p>Which library do you want to add the book to?</p>
                <select name="library" id="library" class="input-text flex items-center mt-1" bind:value="{library}">
                    {#each libraries as library}
                        <option value="{library.id}">{library.name}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="p-4 mt-4 md:mt-0 content-box md:w-4/6 flex flex-col items-center overflow-y-auto">
            <form class="flex mt-1 w-1/2 sticky top-0 z-[100] bg-[--background-primary] rounded w-full border-slate-200 border-2 p-4">
                <div class="flex p-1 bg-slate-200 rounded-xl w-full h-[36px] items-center mr-2">
                    <Fa class="h-full mr-2 ml-2 text-[--primary]" icon="{faSearch}"></Fa>
                    <input class="h-full w-full bg-transparent" type="text" id="bookSearch" bind:value={searchParam} placeholder="Search">
                </div>
                <button type="submit" on:click={handleSearch} class="primary-button">Search</button>
            </form>
            <div class="flex flex-col items-center mt-6">
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