<script>
    import Fa from 'svelte-fa'
    import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'

    let current = 1

    const flipPage = () => {
        console.log("current", current)
        current = current === 1 ? 0 : 1
        current = current
    }
    $: current
</script>

<main class="h-screen items-center justify-center flex flex-col drop-shadow-xl">
    <a class="flex items-center text-4xl mb-10 text-[--primary]" href="/">
        <img class="mr-[5px] h-[30px]" src="./src/lib/assets/siglib_logo.png" alt="">
        <h1 class="italic" style="font-family: 'Brush Script MT'">Siglib</h1>
    </a>
    <div class="p-2 bg-[--primary-second] rounded-md">
        <div class="loginBook drop-shadow-lg">
            <div class="loginPage bg-white drop-shadow-lg shadow-[inset_-40px_0px_50px_-30px_rgba(0,0,0,0.6)]" class:transformed180={current === 1}>
                {#if current !== 1}
                    <button on:click="{flipPage}" class="absolute bottom-10 left-10 text-left text-[--secondary]">
                        <u>
                            <p>Already have an account?</p>
                            <p>Login</p>
                        </u>
                    </button>
                {:else}
                    <button on:click="{flipPage}" class="absolute bottom-10 left-10 text-right transformed180 text-[--secondary]">
                        <u>
                            <p>Don't have an account yet?</p>
                            <p>Register</p>
                        </u>
                    </button>
                {/if}
            </div>
            <div class="pg pg1 p-10 flex items-center bg-white border-r-2 border-slate-600 shadow-[inset_-40px_0px_50px_-30px_rgba(0,0,0,0.6)]">
                <div class="w-full flex flex-col items-center">
                    <h1 class="text-lg mb-10 text-[--primary]">Login</h1>
                    <form action="?/login" method="POST" class="flex flex-col items-center w-full p-4">
                        <div class="input-text">
                           <label for="loginEmail">EMAIL</label>
                           <input type="text" id="loginEmail" name="email">
                        </div>
                        <div class="input-text mt-3">
                            <label for="loginPassword">PASSWORD</label>
                            <input type="password" id="loginPassword" name="password">
                        </div>

                        <button type="submit" class="primary-button mt-4">Login</button>
                    </form>
                </div>
            </div>
            <div class="pg pg2 p-10 flex items-center bg-white border-l-2 border-slate-600 shadow-[inset_30px_0px_50px_-20px_rgba(0,0,0,0.6)]">
                <div class="w-full flex flex-col items-center">
                    <h1 class="text-lg mb-10 text-[--primary]">Register</h1>
                    <form action="?/register" method="POST" class="flex flex-col items-center w-full p-4">
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

                        <button type="submit" class="primary-button mt-4">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<style>

    .loginBook {
        background-color: #fff;
        width: 800px;
        height: 600px;
        border-radius: 20px;
        perspective: 3000px;
    }

    .loginPage {
        position: absolute;
        z-index: 5;
        width: 50%;
        height: 100%;
        right: 50%;
        border-radius: 20px 0 0 20px;
        transform-origin: center right;
        transition: 1s ease all;

    }

    .transformed180 {
        transform: rotateY(180deg);
    }

    .loginBook .pg {
        position: absolute;
        width: 50%;
        top: 0;
        bottom: 0;
        font-weight: bold;
    }

    .loginBook .pg.pg1 {
        border-radius: 20px 0 0 20px;
        left: 0;
    }

    .loginBook .pg.pg2 {
        right: 0;
        border-radius: 0 20px 20px 0;
    }
</style>