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
            <a href="#" on:click={() => {openBurger()}}><p class="mb-2">How it works</p></a>
            <a href="#" on:click={() => {openBurger()}}><p class="mb-2">About us</p></a>
            <a href="#" on:click={() => {openBurger()}}><p>Login</p></a>
        </div>
    {/if}
</div>