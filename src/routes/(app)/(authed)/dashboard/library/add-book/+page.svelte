<script>
    import BookCard from '$lib/bookCard.svelte'
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
    /** @type {import('.$types').PageData} */
    export let data;
    let searchParam = ''
    $: books = []
    $: activeCard = 0

    const searchBooks = async () => {
        searchParam = searchParam.replace(/ /g, '+');
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}&printType=books&key=${API_KEY}`);
        const responseData =  await res.json();
        books = responseData.items
        books = books
        console.log("books", books)
        console.log(data.session.user)
    }

    const changeActiveCard = (index) => {
        console.log("index", index)
        console.log("card", activeCard)
        if(activeCard === index) {
            activeCard = 999
        } else {
            activeCard = index
        }
        activeCard = activeCard
    }
</script>

<main>
    <div>
        <form action="#" class="flex">
            <input type="text" class="border border-solid rounded-lg border-slate-400 mr-2 p-2" bind:value={searchParam}>
            <button type="submit" on:click={searchBooks} class="primary-button">Search</button>
        </form>
    </div>
    <div><p>You searched for: {searchParam.replace(/\+/g, ' ')}</p></div>
    <div class="m-0 flex flex-col items-center overflow-y-auto">
        {#each books as book, i}
            <div on:click={() => changeActiveCard(i)}>
                <BookCard active="{activeCard === i}" book="{book.volumeInfo}"/>
            </div>
        {/each}
    </div>
</main>