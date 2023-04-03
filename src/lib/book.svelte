<script>
    export let book
</script>

<div class="flex shadow m-10 rounded-lg border-slate-100">
    <div class="w-1/3">
        <img src="{book.imageLinks?.thumbnail}" alt="imagelink" class="rounded-s-lg">
    </div>
    <div class="w-2/3">
        <p class="text-[16px]"><strong>{book.title}</strong></p>
        <p class="text-[12px] text-slate-400">{book.authors}</p>
        <p class="mt-4"><strong>{book.publishedDate} Pages:</strong> {book.pageCount}</p>
        {#if book.industryIdentifiers}
            <p class="mt-4">
                <strong>{book.industryIdentifiers[0]?.type}:</strong> {book.industryIdentifiers[0]?.identifier}
            </p>
            <p><strong>{book.industryIdentifiers[1]?.type}:</strong> {book.industryIdentifiers[1]?.identifier}</p>
        {/if}
        <p>{book.description}</p>
    </div>
</div>