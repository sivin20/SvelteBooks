<script lang="ts">
    import '../../../../app.css'
    import Sidebar from '$lib/components/sidebar/sidebar.svelte'
    import Fa from 'svelte-fa'
    import { faUser } from '@fortawesome/free-solid-svg-icons'

    /** @type {import('.$types').PageData} */
    export let data;

    // let toggleSidebar = true
    let showUserInfoBox = false
</script>


<main class="flex w-screen h-screen">
    <!--{#if toggleSidebar}-->
    <div class="w-32 mb-4 relative hidden md:block">
        <Sidebar/>
    </div>
<!--        <button class="self-start flex m-5" on:click={() => {toggleSidebar = !toggleSidebar}}>-->
<!--            <Fa icon="{faCaretLeft}"/>-->
<!--            <Fa class="ml-1" icon="{faBars}"/>-->
<!--        </button>-->
<!--        {:else}-->
<!--        <button class="self-start flex m-5" on:click={() => {toggleSidebar = !toggleSidebar}}>-->
<!--            <Fa icon="{faBars}"/>-->
<!--            <Fa class="ml-1" icon="{faCaretRight}"/>-->
<!--        </button>-->
<!--    {/if}-->
    <div class="flex-auto flex justify-center">
        <div class="w-full mt-10 px-4 relative">
            <div class="absolute fixed top-4 right-10 rounded-xl" on:mouseleave={() => {showUserInfoBox = false}} on:mouseenter={() => {showUserInfoBox = true}}>
                {#if showUserInfoBox}
                    <div class="flex flex-col border-slate-100 bg-gray-100 items-center p-2" style='width: max-content'>
                        <div class="flex">
                            <p class="mr-2">{data.session.user.user_metadata.first_name}</p>
                            <Fa icon={faUser} color="var(--primary)"/>
                        </div>
                        <p><u>logout</u></p>
                    </div>
                {:else}
                    <div class="flex border-slate-100 bg-gray-100 items-center p-2" style='width: max-content'>
                        <p class="mr-2">{data.session.user.user_metadata.first_name}</p>
                        <Fa icon={faUser} color="var(--primary)"/>
                    </div>
                {/if}
            </div>
            <div class="overflow-y-auto h-full p-4">
                <slot></slot>
            </div>
        </div>
    </div>
</main>