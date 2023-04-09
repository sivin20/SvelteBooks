<script lang="ts">
    import BookCard from '$lib/bookCard.svelte'
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
    import {supabase} from "../../../../../../lib/supabaseClient";
    import type {Book} from "$lib/models/Book"

    /** @type {import('.$types').PageData} */
    export let data;
    let searchParam = 'Brandon Sanderson'
    $: activeCard = 0

    const { libraries } = data
    let library = 'e094ff4e-a131-4e04-abe9-e7bf2c138e4c'

    const searchBooks = async (): Promise<Book> => {
        console.log("Searching for books..")
        searchParam = searchParam.replace(/ /g, '+');
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}&langRestrict=en&projection=full&printType=books&key=${API_KEY}`);
        const responseData =  await res.json();
        const bookList = []
        console.log("response", responseData.items)
        for (let book of responseData.items) {
            console.log("Booklist", bookList.length)
            bookList.push(
                {
                    id: book.id,
                    title: book.volumeInfo.title ? book.volumeInfo.title : '',
                    authors: book.volumeInfo.authors ? book.volumeInfo.authors : '',
                    image_link: !!book.volumeInfo.imageLinks ?.thumbnail ? book.volumeInfo.imageLinks?.thumbnail : null,
                    page_count: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 0,
                    isbn_13: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0]?.identifier : '',
                    description: book.volumeInfo.description ? book.volumeInfo.description : ''
                }
        )}
        if(res.ok) {
            console.log("booklist", bookList)
            return bookList
        } else {
            throw new Error("Error here")
        }
    }

    $: books = searchBooks();

    async function handleSearch() {
        const res = await searchBooks()
        console.log("res", res)
        books = await searchBooks()
    }

    async function addBook(event) {
        console.log("library", library)
        const book: Book = event.detail.text
        console.log("Book", book)
        const { data, error: err } = await supabase.from('books').insert({
            ...book,
            library_id: library
        })

        if (err) {
            console.log("My error", err.message)
        }
    }

</script>

<main class="p-4 bg-white rounded-xl">
    <p>Which library do you want to view?</p>
    <select name="library" id="library" class="input-text flex items-center" bind:value="{library}">
        <option value="blank"></option>
        {#each libraries as library}
            <option value="{library.id}">{library.name}</option>
        {/each}
    </select>
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
                        <BookCard on:message={addBook} active="{activeCard === i}" book="{book}"/>
                    </div>
                {/each}
            {:catch error}
                <p>Error {error}</p>
        {/await}
    </div>
</main>