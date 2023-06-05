<script lang="ts">
    import {BookService} from "../../../../../lib/services/book.service.js";
    import Modal from "../../../../../lib/components/modal.svelte";
    import type {Book} from "../../../../../lib/models/Book";
    import BookCard from '$lib/components/bookCard.svelte'
    import type {Library} from "../../../../../lib/models/Library";
    import toast, {Toaster} from "svelte-french-toast";
    import {onMount} from "svelte";
    import LibraryCard from '$lib/components/library/libraryCard.svelte'
    import {SortService} from "$lib/services/sort.service";

    /** @type {import('.$types').PageData} */
    export let data

    const { libraries } = data

    let current_library: Library = Object.values(libraries)[0]

    let showDeleteBookModal: boolean = false
    let showDeleteAllModal: boolean = false
    let bookToBeDeleted: Book;

    let books: Book[] = [];

    let sortParam
    let sortAscending: boolean

    const getBooksFromLibrary = async () => {
        return BookService.getBooksFromLibrary(current_library.id)
    }

    function sortBooks(sortArg) {
        if(sortParam === sortArg) {
            sortAscending = !sortAscending
        } else {
            sortAscending = true;
        }
        SortService.sort(books, sortAscending ? sortArg : `-${sortArg}`)
        sortParam = sortArg
        books = books
    }

    async function handleGetBooks(library: Library) {
        current_library = library
        books = await getBooksFromLibrary() as Book[]
        SortService.sort(books, sortParam)
        console.log(Array.isArray(books))
    }

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
        <p class="text-[50px]"><strong>MY LIBRARIES</strong></p>
    </div>
    <div class="flex flex-col w-full items-center box-border">
        <div class="md:flex items-start justify-start w-full">
            <div class="">
                <p class="self-start text-[25px]">Active libraries</p>
                <div class="flex mt-4">
                    {#each libraries as library}
                        <div on:click={() => handleGetBooks(library)}>
                            <LibraryCard active="{current_library === library}" library="{library}"></LibraryCard>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="md:flex items-center w-full mt-4">
            <div class="filter-button flex items-center mr-4 justify-between"
                 on:click={() => {sortBooks('title')}}
                 class:active={sortParam === 'title'}>
                <p>A-Z</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="9.33" height="6.02" viewBox="0 0 11.5 7.425" class:flipped={sortAscending && sortParam === 'title'}>
                    <path id="Icon_awesome-angle-up" data-name="Icon awesome-angle-up" d="M6.357,10.987l4.886,4.886a.859.859,0,0,1,0,1.218l-.812.812a.859.859,0,0,1-1.218,0l-3.467-3.46L2.283,17.906a.859.859,0,0,1-1.218,0L.25,17.094a.859.859,0,0,1,0-1.218l4.886-4.886a.86.86,0,0,1,1.221,0Z" transform="translate(11.496 18.16) rotate(180)"/>
                </svg>
            </div>
            <div class="filter-button flex items-center mr-4 justify-between"
                 on:click={() => {sortBooks('page_count')}}
                 class:active={sortParam === 'page_count'}>
                <p>Pages</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="9.33" height="6.02" viewBox="0 0 11.5 7.425" class:flipped={sortAscending && sortParam === 'page_count'}>
                    <path id="Icon_awesome-angle-up" data-name="Icon awesome-angle-up" d="M6.357,10.987l4.886,4.886a.859.859,0,0,1,0,1.218l-.812.812a.859.859,0,0,1-1.218,0l-3.467-3.46L2.283,17.906a.859.859,0,0,1-1.218,0L.25,17.094a.859.859,0,0,1,0-1.218l4.886-4.886a.86.86,0,0,1,1.221,0Z" transform="translate(11.496 18.16) rotate(180)"/>
                </svg>
            </div>
            <div></div>
        </div>

        <section class="mt-4 md:mt-0 flex flex-col items-center w-full">
            <div class="grid gap-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 mt-6 w-full">
                {#await books}
                    <p>...loading</p>
                {:then result}
                    {#each result as book, i (book.id)}
                        <div>
                            <BookCard book="{book}"/>
                            <button on:click={() => { openDeleteModal(book) }}>Delete</button>
                        </div>
                    {/each}
                {:catch error}
                    <p>Error {error}</p>
                {/await}
            </div>
        </section>

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

    .flipped {
        transform: rotate(180deg);
    }
</style>