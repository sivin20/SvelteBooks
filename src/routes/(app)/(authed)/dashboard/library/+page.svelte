<script lang="ts">
    import {BookService} from "../../../../../lib/services/book.service.js";
    import Modal from "../../../../../lib/components/modal.svelte";
    import type {Book} from "../../../../../lib/models/Book";
    import Fa from "svelte-fa";
    import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
    import type {Library} from "../../../../../lib/models/Library";
    import toast, {Toaster} from "svelte-french-toast";
    import {onMount} from "svelte";

    /** @type {import('.$types').PageData} */
    export let data

    const { libraries } = data

    let current_library: Library = Object.values(libraries)[0]
    $: current_library

    const getBooksFromLibrary = async () => {
        return BookService.getBooksFromLibrary(current_library.id)
    }

    let books: Book[] = [];
    $: books;

    async function handleGetBooks(library: Library) {
        current_library = library
        books = await getBooksFromLibrary() as Book[]
        console.log(Array.isArray(books))
    }

    let showDeleteBookModal = false
    let showDeleteAllModal = false
    let bookToBeDeleted: Book;

    function openDeleteModal(book: Book) {
        bookToBeDeleted = book
        showDeleteBookModal = true
    }

    function openDeleteAllModal() {
        showDeleteAllModal = true
    }

    async function deleteBook() {
        await BookService.deleteBook(bookToBeDeleted).then(() => {
            showDeleteBookModal = false
            toast.success(`Succesfully deleted ${bookToBeDeleted.title}`, {
                duration: 5000,
                position: "top-right"
            })
            books = books.filter(b => b.id != bookToBeDeleted.id)
        })
    }

    async function deleteAllBooks() {
        await BookService.deleteAllBooks(current_library.id).then(() => {
            showDeleteAllModal = false
            toast.success(`Succesfully deleted all books`, {
                duration: 5000,
                position: "top-right"
            })
            books = []
        })
    }

    onMount(async () => {
        books = await getBooksFromLibrary()
    })

</script>

<main>
    <div class="mb-2">
        <p class="text-3xl"><strong>Your libraries</strong></p>
    </div>
    <div class="flex flex-col w-full items-center box-border">
        <div class="flex items-start justify-start w-full">
            <div class="flex mt-4">
                {#each libraries as library}
                    <div class="p-4 content-box mr-5" class:active-library={current_library === library}
                         on:click={() => handleGetBooks(library)}>
                        <p>{library.name}</p>
                        <p>Number of books: {library.books}</p>
                        <p>Total number of pages: {library.pages}</p>
                    </div>
                {/each}
            </div>
            <div class="content-box p-4 w-full">
                <div class="p-4 flex items-center flex-col self-end">
                    <p>Add a new library</p>
                    <form action="?/create" method="POST" class="flex flex-col items-center w-full p-4">
                        <div class="input-text">
                            <label for="name">NAME</label>
                            <input type="text" id="name" name="name">
                        </div>

                        <button type="submit" class="primary-button mt-4">Login</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="items-center flex flex-col content-box p-4 mt-4 w-full">
            {#if !!current_library}
                <p class="self-start text-2xl mb-2">{current_library.name}</p>
            {/if}
            {#await books}
                <p>...loading</p>
            {:then result}
                <button class="secondary-button self-end" on:click={() => openDeleteAllModal()}>Delete all</button>
                <table class="w-full border-separate border-spacing-[0]">
                    <thead>
                    <tr>
                        <th class="text-left">Title</th>
                        <th class="text-left">Authors</th>
                        <th class="text-right">ISBN 13</th>
                        <th class="text-right">Page Count</th>
                        <th class="text-right"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each result as book, i (book.id)}
                        <tr>
                            <td class="text-left">{book.title}</td>
                            <td class="text-left">{book.author}</td>
                            <td class="text-right">{book.isbn_13}</td>
                            <td class="text-right">{book.page_count}</td>
                            <td class="text-right"><button on:click={() => openDeleteModal(book)}> <Fa icon={faTrashCan} color="--primary"/></button></td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {:catch error}
                <p>Error {error}</p>
            {/await}
        </div>
        {#if showDeleteBookModal}
            <Modal showModal="{showDeleteBookModal}">
                <h2 slot="header" class="text-[--primary]">Deleting</h2>
                <div>
                    <p>Are you sure you want to remove {bookToBeDeleted.title} from this library?</p>
                </div>
                <button slot="yes-button" class="secondary-button" on:click={() => deleteBook()}>Yes</button>
            </Modal>
        {/if}
        {#if showDeleteAllModal}
            <Modal showModal="{showDeleteAllModal}">
                <h2 slot="header" class="text-[--primary]">Deleting</h2>
                <div>
                    <p>Are you sure you want to remove EVERY book from this library?</p>
                </div>
                <button slot="yes-button" class="secondary-button" on:click={() => deleteAllBooks()}>Yes</button>
            </Modal>
        {/if}

        <Toaster/>
    </div>
</main>

<style>
    table tbody tr:nth-child(even) {
        background-color: #F1F5F8;
    }

    table thead tr th {
        border-bottom: 2px solid var(--primary);
        padding: 0.5rem;
    }

    td {
        padding: 0.5rem;
    }
    .active-library {
        background-color: var(--primary);
        color: var(--background-primary);
    }
</style>