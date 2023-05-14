<script>
    import {crossfade, fly} from "svelte/transition";
    import {quintOut} from "svelte/easing";
    import {flip} from "svelte/animate";

    let currentPageIsLogin = true

    function change() {
        console.log("current", currentPageIsLogin)
        currentPageIsLogin = !currentPageIsLogin
        currentPageIsLogin = currentPageIsLogin
    }
    $: currentPageIsLogin

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),

        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });
</script>

<main class="h-screen items-start justify-center flex relative overflow-hidden">
    {#if !!currentPageIsLogin}
        <section class="items-center justify-center flex h-5/6 absolute"
                 in:fly={{ y: '100%', duration: 2000, opacity: 1}}
                 out:fly={{ y: '100%', duration: 2000, opacity: 1}}>
            <div class="bg-[--primary] w-[125px] h-full flex flex-col justify-between">
                <div class="mt-10 h-full flex items-center justify-center">
                    <a href="/">
                        <img src="src/lib/assets/siglib_blue_white.svg" alt="logo" class="h-[285px]">
                    </a>
                </div>
                <div class="arrow-up"></div>
            </div>
            <div class="h-full relative ml-[100px] flex flex-col items-center justify-center w-[425px]">
                    <!--        Login-->
                    <div class="flex flex-col items-center w-[425px]">
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

                            <button type="submit" class="secondary-button mt-5">LOGIN</button>
                        </form>
                        <p class="mt-5 font-bold cursor-pointer"><u>Forgot password?</u></p>
                        <p class="mt-5 font-bold cursor-pointer" on:click={() => {change()}}><u>Don't have an account yet?</u></p>
                    </div>
            </div>
        </section>
    {:else}
        <section class="items-center justify-center flex h-full absolute"
                 in:fly={{ y: '-100%', duration: 2000, opacity: 1}}
                 out:fly={{ y: '-100%', duration: 2000, opacity: 1}}>
            <div class="bg-[--primary] w-[125px] h-full flex flex-col justify-between">
                <div class="mt-10 h-full flex items-center justify-center">
                    <a href="/">
                        <img src="src/lib/assets/siglib_blue_white.svg" alt="logo" class="h-[285px]">
                    </a>
                </div>
            </div>
            <div class="h-full relative ml-[100px] flex flex-col items-center justify-center w-[425px]">
                <!--        Register-->
                <div class="flex flex-col items-center w-[425px]"
                     >
                    <h1 class="text-[50px] mb-10 text-[--secondary] font-bold">REGISTER</h1>
                    <form action="?/register" method="POST" class="flex flex-col items-center w-full">
                        <div class="input-text">
                            <label for="registerName">Name</label>
                            <input type="text" id="registerName" name="name" >
                        </div>

                        <div class="input-text mt-3">
                            <label for="registerEmail">Email</label>
                            <input type="text" id="registerEmail" name="email">
                        </div>

                        <div class="input-text mt-3">
                            <label for="registerPassword">Password</label>
                            <input type="password" id="registerPassword" name="password">
                        </div>

                        <button type="submit" class="secondary-button mt-4">Login</button>
                    </form>
                    <p class="mt-5 font-bold cursor-pointer"><u>Forgot password?</u></p>
                    <p class="mt-5 font-bold cursor-pointer" on:click={() => {change()}}><u>Already have an account?</u></p>
                </div>
            </div>
        </section>
    {/if}
</main>

<style>

    .arrow-up {
        width: 0;
        height: 0;
        border-left: 60px solid transparent;
        border-right: 60px solid transparent;

        border-bottom: 40px solid #FFF;
    }

</style>