
<script>
    /** @type {import('.$types').PageData} */
    export let data;

    console.log(data.posts)
</script>

<main>
    {#if data.session}
        <p>Welcome, {data.session.user.email}</p>
        <form action="/logout" method="POST">
            <button type="submit">Logout</button>
        </form>
    {:else}
        <p>Please login</p>
        <a href="/login">Login</a>
        <a href="/login">Register</a>
    {/if}
</main>