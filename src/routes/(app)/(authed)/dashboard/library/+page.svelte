<script lang="ts">
    import {BookService} from "../../../../../lib/bookService/book.service.js";

    /** @type {import('.$types').PageData} */
    export let data

    const { libraries } = data

    console.log("bookspage", books)
    console.log("bookspage", libraries)

    let current_library = Object.values(libraries)[0]?.id;
    $: current_library

    const getBooksFromLibrary = async () => {
        return BookService.getBooksFromLibrary(current_library)
    }

    $: books = getBooksFromLibrary();

    const handleSearch = async()  => {
        books = await getBooksFromLibrary()
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
                <select bind:value="{current_library}" on:change={() => handleSearch()} name="library" id="library" class="input-text flex items-center">
                    {#each libraries as library}
                        <option value="{library.id}">{library.name}</option>
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
        <p>This is your library</p>
        {#await books}
            <p>...loading</p>
        {:then result}
            <table class="w-full">
                <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Authors</th>
                    <th class="text-right">ISBN 13</th>
                    <th class="text-right">Page Count</th>
                </tr>
                {#each result as book, i}
                    <tr>
                        <td class="text-left">{book.title}</td>
                        <td class="text-left">{book.authors}</td>
                        <td class="text-right">{book.isbn_13}</td>
                        <td class="text-right">{book.page_count}</td>
                    </tr>
                {/each}
            </table>

        {:catch error}
            <p>Error {error}</p>
        {/await}
    </div>
</main>