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
    let showUserInfoBox = false
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
    <div class="flex-auto flex justify-center">
        <div class="w-[1280px] mt-10 relative">
            <div class="absolute fixed right-10 top-10 rounded-xl border-slate-100 bg-gray-100 items-center p-2"
                 on:mouseover={() => {showUserInfoBox = true}} on:mouseout={() => {showUserInfoBox = false}}>
                {#if showUserInfoBox}
                    <div>
                        <div class="flex">
                            <p class="mr-2">{data.session.user.user_metadata.first_name}</p>
                            <Fa icon={faUser} color="var(--primary)"/>
                        </div>
                        <p><u>logout</u></p>
                    </div>
                {:else}
                    <div class="flex">
                        <p class="mr-2">{data.session.user.user_metadata.first_name}</p>
                        <Fa icon={faUser} color="var(--primary)"/>
                    </div>
                {/if}
            </div>
            <div class="overflow-y-auto h-full">
                <slot></slot>
            </div>
        </div>
    </div>
</main>