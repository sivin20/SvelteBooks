<script lang="ts">
    import '../../../../app.css'
    import Header from '$lib/components/navbar/navbar.svelte'
    import Sidebar from '$lib/components/sidebar/sidebar.svelte'
    import Fa from 'svelte-fa'
    import {faSearch} from '@fortawesome/free-solid-svg-icons'
    import {navigating, page} from "$app/stores";

    /** @type {import('.$types').PageData} */
    export let data;

    let pageContent
    let scrollBar
    let yScroll = 0
    let pct = 0

    let searchString: string;
    let searchBox: HTMLElement

    //Reset scrollbar pos at route navigation
    $: if($navigating) pageContent.scrollTop = 0

    function handleScrollProgress() {
        yScroll=pageContent.scrollTop
        pct = pageContent.scrollTop / (pageContent.scrollHeight - pageContent.offsetHeight) * 100
        scrollBar.style.width = pct + "%";
    }

    function onKeyDown(e: KeyboardEvent) {
        if(e.ctrlKey && e.key == 'k') {
            console.log("go search")
            e.preventDefault()
            searchBox.focus()
        }
    }

    let searchBoxFocused = false

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
            {#if !($page.url.pathname.includes('add-book'))}
                <div class="absolute sm:top-12 sm:right-10 rounded-xl block z-10 opacity-50"
                     class:opacity-100={searchBoxFocused}
                     on:mouseleave={() => {searchBoxFocused = false}} on:mouseenter={() => {searchBoxFocused = true}}>
                    <div class="flex flex-col border-slate-100 bg-gray-100 items-center p-2" style='width: max-content'>
                        <form class="flex" action="/dashboard/library/add-book/{searchString}">
                            <div class="flex p-1 bg-[--input-field-color] rounded-[6px] w-full items-center mr-2">
                                <Fa class="h-full mr-2 ml-2 text-[--secondary--accent-1]" icon="{faSearch}"></Fa>
                                <input on:focus={() => {searchBoxFocused = true}} on:blur={() => {searchBoxFocused = false}}
                                       class="h-full w-full bg-transparent" type="text" id="bookSearch"
                                       bind:this={searchBox} bind:value={searchString} placeholder="Search">
                            </div>
                            <button class="small-secondary-button">SEARCH</button>
                        </form>
                    </div>
                </div>
            {/if}
            <div class="h-full p-4 overflow-x-hidden" bind:this={pageContent} on:scroll={handleScrollProgress}>
                <slot></slot>
            </div>
        </div>
    </div>
</main>
<svelte:window on:keydown={onKeyDown}/>
