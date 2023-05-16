<script>
    export let error;
</script>

{#if error}
    <ul class="error-messages">
        <li>{error}</li>
    </ul>
{/if}