<script lang="ts">
    export let inProgress
</script>

<div class="w-full flex flex-col gap-6">
    <div class="flex justify-between items-center">
        <p class="text-[25px]"><strong>Books In Progress</strong></p>
        <div class="h-[12px] flex-auto ml-6 bg-[--primary-accent-1] rounded-[6px]"></div>
    </div>
    <div class="flex flex-col lg:flex-row gap-6">
        <p class="w-full lg:w-1/2">
            Look at all these books in progress! Get reading!
        </p>
        <ul class="flex justify-between items-center flex-auto flex-wrap">
            {#if inProgress}
                {#each inProgress as book}
                    <li class="mb-2">
                        <p><strong>{book.title}</strong></p>
                        <p class="text-sm"><i>{book.author}</i></p>
                    </li>
                {/each}
            {:else}
                <p>You do not have any books in progress</p>
            {/if}
        </ul>
    </div>
    <div class="flex justify-between items-center">
        <div class="h-[12px] flex-auto mr-6 bg-[--primary-accent-1] rounded-[6px]"></div>
        <button class="small-primary-button"><a href="/dashboard/library">See full list</a></button>
    </div>
</div>