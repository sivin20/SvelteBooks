
<script lang="ts">
    import Burger from '$lib/components/navbar/burger.svelte'
    import {slide} from "svelte/transition";
    let burgerOpen: boolean = false

    function openBurger() {
        burgerOpen = !burgerOpen;
        burgerOpen = burgerOpen;
        console.log("burger", burgerOpen)
    }
</script>

<div class="relative">
    <div class="bg-[--primary] text-white w-full p-5 flex items-center justify-between">
        <a class="" href="/dashboard">
            <strong class="text-2xl"><span>SIG</span><span class="text-[#1e3f6d]">LIB</span></strong>
        </a>
        <!--    <nav class="text-xl ml-10">-->
        <!--        <a class="block hover:bg-purple-400 pd-4" href="/dashboard/library">Library</a>-->
        <!--    </nav>-->
        <div on:click={() => {openBurger()}}>
            <Burger burgerOpen="{burgerOpen}"/>
        </div>
    </div>
    {#if burgerOpen}
        <div class="bg-[--secondary] text-white absolute w-full p-5 z-10"
                in:slide={{duration: 400}}
                out:slide={{duration: 400}}>
            <a href="/dashboard" on:click={() => {openBurger()}}><p class="mb-2">Dashboard</p></a>
            <a href="/dashboard/library" on:click={() => {openBurger()}}><p class="mb-2">Library</p></a>
            <a href="/dashboard/library/add-book" on:click={() => {openBurger()}}><p>Add books</p></a>
        </div>
    {/if}
</div>