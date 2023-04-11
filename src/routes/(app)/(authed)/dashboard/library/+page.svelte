<script lang="ts">
    import {BookService} from "../../../../../lib/services/book.service.js";
    import Modal from "../../../../../lib/components/modal.svelte";
    import type {Book} from "../../../../../lib/models/Book";
    import Fa from "svelte-fa";
    import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
    import type {Library} from "../../../../../lib/models/Library";

    /** @type {import('.$types').PageData} */
    export let data

    const { libraries } = data

    let current_library: Library = Object.values(libraries)[0]
    $: current_library

    const getBooksFromLibrary = async () => {
        return BookService.getBooksFromLibrary(current_library.id)
    }

    $: books = getBooksFromLibrary();

    const handleGetBooks = async()  => {
        books = await getBooksFromLibrary()
    }

    let showModal = false
    let bookToBeDeleted: Book;

    function openDeleteModal(book: Book) {
        console.log("Book", book)
        bookToBeDeleted = book
        showModal = true
    }

</script>

<main class="flex flex-col">
    <div class="bg-white rounded-lg p-4">
        <div>
            <p class="text-3xl">Your libraries</p>
        </div>
        <div class="w-4/5 flex">
            <div class="p-4 flex items-center flex-col flex-auto">
                <p class="p-4">Which library do you want to view?</p>
                <select bind:value="{current_library}" on:change={() => handleGetBooks()} name="library" id="library" class="input-text flex items-center">
                    {#each libraries as library}
                        <option value="{library}">{library.name}</option>
                    {/each}
                </select>
            </div>

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

    <div class=" items-center flex flex-col bg-white rounded-lg p-4 mt-4">
        {#if !!current_library}
            <p class="self-start text-2xl mb-2">{current_library.name}</p>
        {/if}
        {#await books}
            <p>...loading</p>
        {:then result}
            <table class="w-full border-separate border-spacing-[1rem]">
                <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Authors</th>
                    <th class="text-right">ISBN 13</th>
                    <th class="text-right">Page Count</th>
                    <th class="text-right"></th>
                </tr>
                {#each result as book, i}
                    <tr>
                        <td class="text-left">{book.title}</td>
                        <td class="text-left">{book.authors}</td>
                        <td class="text-right">{book.isbn_13}</td>
                        <td class="text-right">{book.page_count}</td>
                        <td class="text-right"><button on:click={() => openDeleteModal(book)}> <Fa icon={faTrashCan} color="--primary"/></button></td>
                    </tr>
                {/each}
            </table>
        {:catch error}
            <p>Error {error}</p>
        {/await}
    </div>
    {#if showModal}
        <Modal bind:showModal>
            <h2 slot="header" class="text-[--primary]">Deleting</h2>
            <div>
                <p>Are you sure you want to remove {bookToBeDeleted.title} from this library?</p>
            </div>
        </Modal>
    {/if}

</main>