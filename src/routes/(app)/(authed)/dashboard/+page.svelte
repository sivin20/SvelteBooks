
<script>
    /** @type {import('.$types').PageData} */
    export let data;
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
</main>