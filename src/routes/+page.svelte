
<script>
    import Header from '$lib/components/navbar/navbar.svelte'
    /** @type {import('.$types').PageData} */
    export let data;

    console.log(data.posts)
</script>


<main class="h-screen flex flex-col">
    <Header/>
    <div class="flex flex-col align-center justify-center h-full w-full">
        <p>Please login</p>
        <a href="/login">Login</a>
        <a href="/login">Register</a>
    </div>
</main>
<main>

</main>