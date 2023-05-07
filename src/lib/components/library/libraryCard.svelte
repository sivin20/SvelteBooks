<script>
    export let library
    export let active
</script>

<main>
    <div class="p-4 content-box mr-5 cursor-pointer" class:active={active}>
        <p class="font-bold">{library.name}</p>
        <p>Number of books: {library.books}</p>
        <p>Total number of pages: {library.pages}</p>
    </div>
</main>

<style lang="scss">
  .active {
    background-color: var(--primary);
    color: var(--background-primary);
  }
</style>