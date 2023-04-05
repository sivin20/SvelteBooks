<script>
    import Header from '$lib/header.svelte'
</script>

<main class="h-screen flex flex-col">
    <Header/>
    <div class="flex-auto">
        <slot></slot>
    </div>
</main>