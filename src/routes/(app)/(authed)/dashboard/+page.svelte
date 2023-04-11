
<script>
    /** @type {import('.$types').PageData} */
    export let data;
</script>

<main class="bg-white rounded-lg p-4">
    {#if data.session}
        <p>Welcome, {data.session.user.user_metadata.first_name}</p>
        <a href="/dashboard/library"><p><u>Go to your libraries</u></p></a>
        <div class="mt-5">
            <form action="/logout" method="POST">
                <button type="submit">Logout</button>
            </form>
        </div>
    {:else}
        <p>Please login</p>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    {/if}
</main>