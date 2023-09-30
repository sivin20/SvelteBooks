<script>
    import {fly} from "svelte/transition";
    import toast, { Toaster } from "svelte-french-toast";
    import logo from '../../../../lib/assets/siglib_blue_white.svg'

    let currentPageIsLogin = true

    /** @type {import('./$types').ActionData} */
    export let form;

    $: if(form?.error) {
        makeErrorToast()
    }

    function makeErrorToast() {
        toast.error(`Error: ${form?.error}`, {
            position: "top-right"
        });
    }

    function change() {
        console.log("current", currentPageIsLogin)
        currentPageIsLogin = !currentPageIsLogin
        currentPageIsLogin = currentPageIsLogin
    }
    $: currentPageIsLogin
</script>

<main class="h-screen items-start justify-center flex relative overflow-hidden w-full">
    {#if !!currentPageIsLogin}
        <section class="items-center justify-center flex h-full absolute w-full"
                 in:fly={{ y: '100%', duration: 1000, opacity: 1}}
                 out:fly={{ y: '100%', duration: 1000, opacity: 1}}>
            <div class="bg-[--primary] sm:w-[75px] md:w-[125px] w-[50px] h-full flex flex-col justify-between mb-[200px]">
                <div class="mt-10 h-full flex items-center justify-center">
                    <a href="/">
                        <img src="{logo}" alt="logo" class="h-[285px]">
                    </a>
                </div>
                <div class="arrow-up"></div>
            </div>
            <div class="h-full relative md:ml-[100px] flex flex-col items-center justify-center md:w-[425px] w-full"
                 in:fly={{ duration: 1000}}
                 out:fly={{duration: 1000}}>
                    <!--        Login-->
                    <div class="flex flex-col items-center sm:w-[425px]">
                        <h1 class="text-[50px] mb-10 text-[--secondary] font-bold">LOGIN</h1>
                        <form action="?/login" method="POST" class="flex flex-col items-center w-full">
                            <div class="input-text">
                                <label for="loginEmail">Email</label>
                                <input type="text" id="loginEmail" name="email">
                            </div>
                            <div class="input-text mt-5">
                                <label for="loginPassword">Password</label>
                                <input type="password" id="loginPassword" name="password">
                            </div>

                            <button type="submit" class="md:secondary-button small-secondary-button mt-5">LOGIN</button>
                        </form>
<!--                        <p class="mt-5 font-bold cursor-pointer"><u>Forgot password?</u></p>-->
                        <p class="mt-5 font-bold cursor-pointer" on:click={() => {change()}}><u>Don't have an account yet?</u></p>
                    </div>
            </div>
        </section>
    {:else}
        <section class="items-center justify-center flex h-full absolute w-full"
                 in:fly={{ y: '-100%', duration: 1000, opacity: 1}}
                 out:fly={{ y: '-100%', duration: 1000, opacity: 1}}>
            <div class="bg-[--primary] sm:w-[75px] md:w-[125px] w-[50px] h-full flex flex-col justify-between">
                <div class="mt-10 h-full flex items-center justify-center">
                    <a href="/">
                        <img src="{logo}" alt="logo" class="h-[285px]">
                    </a>
                </div>
                <div class="arrow-up no-show"></div>
            </div>
            <div class="h-full relative md:ml-[100px] flex flex-col items-center justify-center md:w-[425px] w-full"
                 in:fly={{ duration: 1000}}
                 out:fly={{duration: 1000}}>
                <!--        Register-->
                <div class="flex flex-col items-center sm:w-[425px]"
                     >
                    <h1 class="text-[50px] mb-10 text-[--secondary] font-bold">REGISTER</h1>
                    <form action="?/register" method="POST" class="flex flex-col items-center w-full">
                        <div class="input-text">
                            <label for="first_name">First name</label>
                            <input type="text" id="first_name" name="first_name" >
                        </div>

                        <div class="input-text mt-3">
                            <label for="last_name">Last name</label>
                            <input type="text" id="last_name" name="last_name" >
                        </div>

                        <div class="input-text mt-3">
                            <label for="registerEmail">Email</label>
                            <input type="text" id="registerEmail" name="email">
                        </div>

                        <div class="input-text mt-3">
                            <label for="registerPassword">Password</label>
                            <input type="password" id="registerPassword" name="password">
                        </div>

                        <button type="submit" class="md:secondary-button small-secondary-button mt-4">CREATE</button>
                    </form>
<!--                    <p class="mt-5 font-bold cursor-pointer"><u>Forgot password?</u></p>-->
                    <p class="mt-5 font-bold cursor-pointer" on:click={() => {change()}}><u>Already have an account?</u></p>
                </div>
            </div>
        </section>
    {/if}
    <Toaster/>
</main>

<style>

    .arrow-up {
        width: 0;
        height: 0;
        border-left: 60px solid transparent;
        border-right: 60px solid transparent;
        border-bottom: 40px solid #FFF;
    }

    .no-show {
        border-bottom: 40px solid transparent !important;
    }

    @media only screen and (max-width:  768px) {
        .arrow-up {
            border-left: 37px solid transparent;
            border-right: 37px solid transparent;
            border-bottom: 30px solid #FFF;
        }
    }

    @media only screen and (max-width: 640px) {
        .arrow-up {
            border-left: 25px solid transparent;
            border-right: 25px solid transparent;
            border-bottom: 20px solid #FFF;
        }
    }

</style>