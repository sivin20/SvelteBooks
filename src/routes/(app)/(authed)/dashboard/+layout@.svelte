<script lang="ts">
    import '../../../../app.css'
    import Header from '$lib/components/navbar/navbar.svelte'
    import Sidebar from '$lib/components/sidebar/sidebar.svelte'
    import Fa from 'svelte-fa'
    import { faUser } from '@fortawesome/free-solid-svg-icons'
    import {navigating} from "$app/stores";

    /** @type {import('.$types').PageData} */
    export let data;

    let pageContent
    let scrollBar
    let yScroll = 0
    let pct = 0

    //Reset scrollbar pos at route navigation
    $: if($navigating) pageContent.scrollTop = 0

    function handleScrollProgress() {
        yScroll=pageContent.scrollTop
        pct = pageContent.scrollTop / (pageContent.scrollHeight - pageContent.offsetHeight) * 100
        scrollBar.style.width = pct + "%";
    }

    let showUserInfoBox = false

</script>

<div class="w-full mb-4 relative absolute block lg:hidden">
    <Header/>
</div>
<main class="flex w-screen h-screen">
    <!--{#if toggleSidebar}-->
    <div class="w-32 mb-4 relative hidden lg:block">
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
    <div class="flex-auto flex justify-center relative">
        <div class='w-full px-4 absolute max-w-[1400px]'>
            <div class="w-full h-[8px] bg-[#ccc]">
                <div class="h-[8px] bg-[--primary]" bind:this={scrollBar}></div>
            </div>
        </div>
        <div class="w-full pt-10 px-0 md:px-4 relative max-w-[1400px] overflow-y-auto">
            <!--
            <div class="absolute fixed top-12 right-10 rounded-xl hidden sm:block z-10" on:mouseleave={() => {showUserInfoBox = false}} on:mouseenter={() => {showUserInfoBox = true}}>
                <div class="flex flex-col border-slate-100 bg-gray-100 items-center p-2" style='width: max-content'>
                    <div class="flex border-slate-100 bg-gray-100 items-center relative" style='width: max-content'>
                        <img class="h-[50px] w-[50px] rounded-full absolute left-[-25px]" src="{avatar}" alt="profile image">
                        <p class="ml-6 p-2">{data.session.user.user_metadata.first_name}</p>
                    </div>
                    {#if showUserInfoBox}
                        <form action="/logout" method="POST">
                            <button type="submit">Logout</button>
                        </form>
                    {/if}
                </div>
            </div>
            -->
            <div class="h-full p-4 overflow-x-hidden" bind:this={pageContent} on:scroll={handleScrollProgress}>
                <slot></slot>
            </div>
        </div>
    </div>
</main>