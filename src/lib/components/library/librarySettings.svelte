<script>
    import Fa from 'svelte-fa'
    import { faCog, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

    let toggle = false
</script>

<main class="content-box p-4">
    {#if !toggle}
        <div class="flex items-center justify-between" on:click={() => {toggle=true}}>
            <div class="flex items-center">
                <p class="mr-2">Open settings for libraries</p>
                <div class="fa">
                    <Fa icon="{faCog}"></Fa>
                </div>
            </div>
            <div class="fa">
                <Fa  icon="{faCaretDown}"></Fa>
            </div>
        </div>
    {:else}
        <div class="flex-col flex"  on:click={() => {toggle=false}}>
            <div class="flex items-center justify-between" on:click={() => {toggle=true}}>
                <div class="flex items-center">
                    <p class="mr-2">Open settings for libraries</p>
                    <div class="fa">
                        <Fa icon="{faCog}"></Fa>
                    </div>
                </div>
                <div class="fa">
                    <Fa  icon="{faCaretUp}"></Fa>
                </div>
            </div>
            <p>Add a new library</p>
            <form action="?/create" method="POST" class="flex flex-col items-center w-full p-4">
                <div class="input-text">
                    <label for="name">NAME</label>
                    <input type="text" id="name" name="name">
                </div>

                <button type="submit" class="primary-button mt-4">Login</button>
            </form>
        </div>
    {/if}
</main>

<style lang="scss">
    .fa {
      color: var(--primary);
    }
</style>