<script>
    /** @type {import('.$types').PageData} */
    export let data

    const { libraries } = data
    const { books } = data

    console.log("bookspage", books)
    console.log("bookspage", libraries)

</script>

<main class="flex flex-col">
    <div class="bg-white rounded-lg p-4">
        <div>
            <p class="text-3xl">Your libraries</p>
        </div>
        <div class="w-4/5">
            <p>Which library do you want to view?</p>
            <select name="library" id="library" class="input-text flex items-center">
                <option value="blank"></option>
                {#each libraries as library}
                    <option value="{library.name}">{library.name}</option>
                {/each}
            </select>
        </div>
        <p>This is your library</p>
        <!--{#each books as library}-->
        <!--    <div>-->
        <!--        <p>{library.name}</p>-->
        <!--    </div>-->
        <!--{/each}-->
        {#await books}
            <p>...loading</p>
        {:then result}
            <table>
                <tr>
                    <th>Title</th>
                    <th>page count</th>
                </tr>
                {#each result as book, i}
                <tr>
                    <td>{book.title}</td>
                    <td>{book.page_count}</td>

                </tr>
                {/each}
            </table>

        {:catch error}
            <p>Error {error}</p>
        {/await}
    </div>

    <div class="w-1/5 items-center flex flex-col bg-white rounded-lg p-4 mt-4">
        <p>Add a new library</p>
        <form action="?/create" method="POST" class="flex flex-col items-center w-full p-4">
            <div class="input-text">
                <label for="name">NAME</label>
                <input type="text" id="name" name="name">
            </div>

            <button type="submit" class="primary-button mt-4">Login</button>
        </form>
    </div>
</main>