<script lang="ts">
    import '../../../../app.css'
    import Sidebar from '$lib/components/sidebar/sidebar.svelte'
    import Fa from 'svelte-fa'
    import { faUser } from '@fortawesome/free-solid-svg-icons'
    import { faBars } from "@fortawesome/free-solid-svg-icons";
    import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

    /** @type {import('.$types').PageData} */
    export let data;

    let toggleSidebar = true
</script>


<main class="flex w-screen h-screen">
    {#if toggleSidebar}
        <div class="w-[350px]" >
            <Sidebar/>
        </div>
        <button class="self-start flex m-5" on:click={() => {toggleSidebar = !toggleSidebar}}>
            <Fa icon="{faCaretLeft}"/>
            <Fa class="ml-1" icon="{faBars}"/>
        </button>
        {:else}
        <button class="self-start flex m-5" on:click={() => {toggleSidebar = !toggleSidebar}}>
            <Fa icon="{faBars}"/>
            <Fa class="ml-1" icon="{faCaretRight}"/>
        </button>
    {/if}
    <div class="flex-auto overflow-y-auto flex justify-center">
        <div class="w-[1280px] mt-10 relative overflow-y-auto">
            <slot></slot>
            <div class="absolute fixed right-10 top-10 flex rounded-xl border-slate-100 bg-gray-100 items-center p-2">
                <p class="mr-2">{data.session.user.user_metadata.first_name}</p>
                <Fa icon={faUser} />
            </div>
        </div>
    </div>
</main>