<script lang="ts">
    import {BookService} from "$lib/services/book.service";
    import type {Book} from "$lib/models/Book";
    import BookCard from '$lib/components/bookCard.svelte'
    import type {Library} from "$lib/models/Library";
    import toast, {Toaster} from "svelte-french-toast";
    import {onMount} from "svelte";
    import LibraryCard from '$lib/components/library/libraryCard.svelte'
    import {SortService} from "$lib/services/sort.service";
    import {faSearch, faXmark} from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import LoadingSpinner from "$lib/components/loadingSpinner.svelte";

    /** @type {import('.$types').PageData} */
    export let data

    let { libraries } = data

    let current_library: Library

    let books: Book[] = [];
    let unfilteredBooks: Book[] = [];

    let sortParam: any = 'title'
    let sortAscending: boolean = true
    let isbnSearch: string

    onMount(() => {
        current_library = Object.values(libraries)[0]
    })
    const getBooksFromLibrary = async () => {
        return BookService.getBooksFromLibrary(current_library.id)
    }

    function sortBooks(sortArg, skipFlip: boolean) {
        if(!skipFlip) {
            if(sortParam === sortArg) {
                sortAscending = !sortAscending
            } else {
                sortAscending = true;
            }
        }
        SortService.sort(books, sortAscending ? sortArg : `-${sortArg}`)
        sortParam = sortArg
        books = books
    }

    function filterBooksOnISBN() {
        if(!isbnSearch) {
            toast.error(`Please add input before attempting filtering`, {
                duration: 5000,
                position: "top-right"
            })
        } else {
            let b = books.filter(book => book.isbn_13 === isbnSearch)
            if(!!b) {
                unfilteredBooks = books
                books = b
            }
        }
    }

    function resetBookFilters() {
        books = unfilteredBooks;
        unfilteredBooks = [];
        unfilteredBooks = unfilteredBooks
        isbnSearch = ''
    }

    async function handleGetBooks(library: Library) {
        current_library = library
        books = await getBooksFromLibrary() as Book[]
        sortBooks(sortParam, true)
    }

    function updateLibraryInfo(event) {
        const bookToBeDeleted = event.detail.book
        const library_id = event.detail.library_id
        const isDeleteEvent = event.detail.isDelete
        const index: number = libraries.findIndex(function(element) {
            return element.id === event.detail.library_id
        })
        if(isDeleteEvent) {
            if(library_id === current_library.id) {
                books = books.filter(b => b.id != bookToBeDeleted.id)
            }
            libraries[index].books = libraries[index].books - 1
            libraries[index].pages = libraries[index].pages - event.detail.book.page_count
        } else {
            libraries[index].books = libraries[index].books + 1
            libraries[index].pages = libraries[index].pages + event.detail.book.page_count
        }
        libraries = libraries
    }

    onMount(async () => {
        books = await getBooksFromLibrary()
    })

</script>

<main>
    <div class="mb-2">
        <p class="text-[50px]"><strong>MY LIBRARIES</strong></p>
    </div>
    <div class="flex flex-col w-full items-start box-border">
<!--        Library cards-->
        <div class="flex items-start justify-start w-full">
            <div >
                <p class="self-start text-[25px]">Active libraries</p>
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {#each libraries as library}
                        <div class="mb-5" on:click={() => handleGetBooks(library)}>
                            <LibraryCard active="{current_library === library}" library="{library}"></LibraryCard>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

<!--        Library filtering-->
        <div class="md:flex items-center w-full mt-4">
            <div class="filter-button flex items-center mr-4 justify-between mb-4 md:mb-0"
                 on:click={() => {sortBooks('title')}}
                 class:active={sortParam === 'title'}>
                <p>A-Z</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="9.33" height="6.02" viewBox="0 0 11.5 7.425" class:flipped={sortAscending && sortParam === 'title'}>
                    <path id="Icon_awesome-angle-up" data-name="Icon awesome-angle-up" d="M6.357,10.987l4.886,4.886a.859.859,0,0,1,0,1.218l-.812.812a.859.859,0,0,1-1.218,0l-3.467-3.46L2.283,17.906a.859.859,0,0,1-1.218,0L.25,17.094a.859.859,0,0,1,0-1.218l4.886-4.886a.86.86,0,0,1,1.221,0Z" transform="translate(11.496 18.16) rotate(180)"/>
                </svg>
            </div>
            <div class="filter-button flex items-center mr-4 justify-between mb-4 md:mb-0"
                 on:click={() => {sortBooks('page_count')}}
                 class:active={sortParam === 'page_count'}>
                <p>PAGES</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="9.33" height="6.02" viewBox="0 0 11.5 7.425" class:flipped={sortAscending && sortParam === 'page_count'}>
                    <path id="Icon_awesome-angle-up" data-name="Icon awesome-angle-up" d="M6.357,10.987l4.886,4.886a.859.859,0,0,1,0,1.218l-.812.812a.859.859,0,0,1-1.218,0l-3.467-3.46L2.283,17.906a.859.859,0,0,1-1.218,0L.25,17.094a.859.859,0,0,1,0-1.218l4.886-4.886a.86.86,0,0,1,1.221,0Z" transform="translate(11.496 18.16) rotate(180)"/>
                </svg>
            </div>
            <div class="flex justify-center items-center mb-4 md:mb-0">
                <div class="flex p-1 bg-[--input-field-color] rounded-s-[6px] w-full max-w-[650px] h-[32px] items-center">
                    <Fa class="h-full mr-2 ml-2 text-[--secondary--accent-1]" icon="{faSearch}"></Fa>
                    <input class="h-full w-full bg-transparent" type="text" id="bookSearch"
                           placeholder="ISBN" bind:value={isbnSearch}
                           disabled="{unfilteredBooks.length}">
                </div>
                <button class="small-secondary-button"
                        style="border-bottom-left-radius: 0 !important;border-top-left-radius: 0 !important;"
                        on:click="{(() => {filterBooksOnISBN()})}"
                        disabled="{unfilteredBooks.length}">SEARCH</button>
            </div>
            {#if unfilteredBooks.length}
                <div class="ml-4 flex justify-center items-center border-2 border-[--secondary--accent-2] rounded-2xl p-1 cursor-pointer mb-4 md:mb-0"
                     on:click={() => {resetBookFilters()}}>
                    <p class="mr-2 p-0">{isbnSearch}</p>
                    <Fa color="red" icon="{faXmark}"></Fa>
                </div>
            {/if}
        </div>

<!--        Library books-->
        <section class="mt-0 flex flex-col items-center w-full">
<!--            <button on:click={() => {openDeleteAllModal()}}>DELETE ALL BOOKS</button>-->
            <div class="grid gap-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 mt-6 w-full">
                {#await books}
                    <LoadingSpinner />
                {:then result}
                    {#each result as book, i (book.id)}
                        <div class="items-center flex justify-center">
                            <BookCard book="{book}" on:message="{updateLibraryInfo}"/>
                        </div>
                    {/each}
                {:catch error}
                    <p>Error {error}</p>
                {/await}
            </div>
        </section>
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