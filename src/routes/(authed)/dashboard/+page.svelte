
<script>
    import Book from '$lib/book.svelte'
    import {onMount} from "svelte";
    import {invalidate} from "$app/navigation";
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
    /** @type {import('.$types').PageData} */
    export let data;
    let searchParam = ''
    $: books = []

    const searchBooks = async () => {
        searchParam = searchParam.replace(/ /g, '+');
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}&printType=books&key=${API_KEY}`);
        const responseData =  await res.json();
        books = responseData.items
        books = books
        console.log("books", books)
        console.log(data.session.user)
    }
</script>

<main>
    {#if data.session}
        <p>Welcome, {data.session.user.user_metadata.first_name}</p>
        <form action="/logout" method="POST">
            <button type="submit">Logout</button>
        </form>
    {:else}
        <p>Please login</p>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    {/if}
    <div class="flex">
        <input type="text" class="border border-solid rounded-lg border-slate-400 mr-2 p-2" bind:value={searchParam}>
        <button on:click={searchBooks} class="bg-purple-400 rounded-lg p-2 text-white">Search</button>
    </div>
    <div><p>You searched for: {searchParam.replace(/\+/g, ' ')}</p></div>
    <div class="m-0 grid grid-cols-2">
        {#each books as book}
            <Book book="{book.volumeInfo}"/>
        {/each}
    </div>
</main>