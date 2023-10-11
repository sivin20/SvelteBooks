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
        <div class="flex">
            <div class="hidden sm:flex items-center">
                <nav class="text-md ml-14">
                    <a class="block hover:font-bold pd-4" href="#howItWorks">How it works</a>
                </nav>
                <nav class="text-md ml-14">
                    <a class="block hover:font-bold pd-4" href="#">About us</a>
                </nav>
                <nav class="ml-14">
                    <a class="small-secondary-button pd-4" href="/dashboard/login">Login</a>
                </nav>
            </div>
            <div class="block sm:hidden" on:click={() => {openBurger()}}>
                <Burger burgerOpen="{burgerOpen}"/>
            </div>
        </div>
    </div>
    {#if burgerOpen}
        <div class="bg-[--secondary] text-white absolute w-full p-5 z-30"
             in:slide={{duration: 400}}
             out:slide={{duration: 400}}>
            <a href="#" on:click={() => {openBurger()}}><p class="mb-2">How it works</p></a>
            <a href="#" on:click={() => {openBurger()}}><p class="mb-2">About us</p></a>
            <a href="#" on:click={() => {openBurger()}}><p>Login</p></a>
        </div>
    {/if}
</div>