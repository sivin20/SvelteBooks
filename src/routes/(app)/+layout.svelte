<script>
    import Header from '$lib/header.svelte'
</script>

<main class="h-screen flex flex-col">
    <Header/>
    <div class="flex-auto bg-[#f6f7f6]">
        <slot></slot>
    </div>
</main>