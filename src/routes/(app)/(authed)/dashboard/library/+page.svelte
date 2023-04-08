<script>
    /** @type {import('.$types').PageData} */
    export let data

    const { libraries } = data
    console.log("libs", data.libraries)
</script>

<main class="flex flex-col">
    <div>
        <p class="text-3xl">Your libraries</p>
    </div>
    <div class="w-4/5">
        <p>Which library do you want to view?</p>
        <select name="library" id="library" class="input-text flex items-center">
            <option value="blank"></option>
            {#each libraries as library}
                <option value="{library.name}">{library.name}</option>
            {/each}
        </select>
    </div>
    <p>This is your library</p>
    {#each libraries as library}
        <div>
            <p>{library.name}</p>
        </div>
    {/each}

    <div class="w-1/5 border-slate-400 border-2 rounded-lg p-5 items-center flex flex-col">
        <p>Add a new library</p>
        <form action="?/create" method="POST" class="flex flex-col items-center w-full p-4">
            <div class="input-text">
                <label for="name">NAME</label>
                <input type="text" id="name" name="name">
            </div>

            <button type="submit" class="primary-button mt-4">Login</button>
        </form>
    </div>
</main>