
<script context="module">

</script>

<script>
    import Book from '$lib/book.svelte'
    /** @type {import('.$types').PageData} */
    export let data;
    let searchParam = ''
    const { posts } = data
    console.log("posts", posts)
    $: books = []


    const searchBooks = async () => {
        searchParam = searchParam.replace(/ /g, '+');
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}&printType=books&key=AIzaSyAOD8ljkCrmkUamc2sOxNXFZipW9p4xmW4`);
        data =  await res.json();
        books = data.items
        books = books
        console.log("books", books)
    }
</script>

<div class="flex">
    <input type="text" class="border border-solid rounded-lg border-slate-400 mr-2 p-2" bind:value={searchParam}>
    <button on:click={searchBooks} class="bg-purple-400 rounded-lg p-2">Search</button>
</div>
<div><p>You searched for: {searchParam.replace(/\+/g, ' ')}</p></div>
<div class="m-0">
    {#each books as book}
        <Book book="{book.volumeInfo}"/>
    {/each}
</div>