<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let buttons = [-2, -1, 0, 1, 2];
    export let bookCount;
    export let page = 0;
    export let pageSize;

    export let labels = {
        first: "FIRST",
        last: "LAST",
        next: "NEXT",
        previous: "PREVIOUS",
    };

    $: pageCount = Math.floor(bookCount / pageSize);

    function onChange(event, page) {
        const detail = {
            originalEvent: event,
            page,
            pageIndex: page * pageSize,
            pageSize: pageSize
        };
        dispatch("pageChange", detail);
    }
</script>

<div>
    <ul>
        <li>
            <button disabled={page === 0} on:click={e => onChange(e, 0)}>
                {labels.first}
            </button>
        </li>
        <li>
            <button disabled={page === 0} on:click={e => onChange(e, page - 1)}>
                {labels.previous}
            </button>
        </li>
        {#each buttons as button}
            {#if page + button >= 0 && page + button <= pageCount}
                <li>
                    <button
                            class:active={page === page + button}
                            on:click={e => onChange(e, page + button)}>
                        {page + button + 1}
                    </button>
                </li>
            {/if}
        {/each}
        <li>
            <button
                    disabled={page > pageCount - 1}
                    on:click={e => onChange(e, page + 1)}>
                {labels.next}
            </button>
        </li>
        <!--    Last button temp unavailable due to error in google book api fetch-->
        <!--    <li>-->
        <!--        <button disabled={page >= pageCount} on:click={e => onChange(e, pageCount)}>-->
        <!--            {labels.last}-->
        <!--        </button>-->
        <!--    </li>-->
    </ul>
</div>

<style>
    .active {
        background-color: var(--primary);
        color: white;
    }

    ul {
        flex: 1;
        float: right;
        list-style: none;
    }

    li {
        float: left;
    }

    button {
        background: transparent;
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 5px 10px;
        margin-left: 3px;
        float: left;
        cursor: pointer;
    }
</style>