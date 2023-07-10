
<script>
    import Header from '$lib/components/navbar/navbar.svelte'
    /** @type {import('.$types').PageData} */
    export let data;

    console.log(data.posts)
</script>


<main class="h-screen flex flex-col">
    <Header/>
    <div class="w-full mt-10 px-4 relative max-w-[1400px]">
        <p>Please login or register</p>
        <div>
            <a href="/login">Login</a>
        </div>
        <div>
            <a href="/login">Register</a>
        </div>
    </div>
    <div>
        Track your books
        https://www.candlapp.com/
    </div>
    <div>
        Ready for your phone
        show phone images
    </div>
    <div>
        What our amazing users say
        4 blocks of fake quotes || many cards in a row that you can hover over to show
    </div>
</main>