<script lang="ts">
    import BookCard from '$lib/bookCard.svelte'
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
    import type {Book} from "$lib/models/Book"
    /** @type {import('.$types').PageData} */
    export let data;
    let searchParam = 'Brandon Sanderson'
    $: activeCard = 0


    type bookData = {
        data: Book[];
    }

    const searchBooks = async (): Promise<Book> => {
        console.log("Searching for books..")
        searchParam = searchParam.replace(/ /g, '+');
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}&langRestrict=en&projection=full&printType=books&key=${API_KEY}`);
        const responseData =  await res.json();
        const books = responseData.items as bookData
        console.log("books", typeof books)
        if(res.ok) {
            return books
        } else {
            throw new Error(responseData.items)
        }
    }

    let books = searchBooks();

    function handleSearch() {
        books = searchBooks()
    }

    function addBook(event) {
        console.log(event.detail.text)
    }

</script>

<main class="p-4 bg-white rounded-xl">
    <div>
        <form action="#" class="flex">
            <input type="text" class="border border-solid rounded-lg border-slate-400 mr-2 p-2" bind:value={searchParam}>
            <button type="submit" on:click={handleSearch} class="primary-button">Search</button>
        </form>
    </div>
    <div><p>You searched for: {searchParam.replace(/\+/g, ' ')}</p></div>
    <div class="m-0 flex flex-col items-center overflow-y-auto">
        {#await books}
            <p>...loading</p>
            {:then result}
                {#each result as book, i}
                    <div on:mouseenter="{() => activeCard = i}" on:mouseleave="{() => activeCard = 999}">
                        <BookCard on:message={addBook} active="{activeCard === i}" book="{book.volumeInfo}"/>
                    </div>
                {/each}
            {:catch error}
                <p>Error {error}</p>
        {/await}
    </div>
</main>