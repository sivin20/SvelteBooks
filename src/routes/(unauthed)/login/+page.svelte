<script>
    let current = 1

    const flipPage = () => {
        console.log("current", current)
        current = current === 1 ? 0 : 1
        current = current
    }
    $: current
</script>

<main class="h-full items-center justify-center flex">
    <div class="loginBook">
        <div class="loginPage bg-slate-200" class:transformed180={current === 1}></div>
        <div class="pg pg1 p-10 flex items-center bg-slate-200 border-r-2 border-black">
            <div class="w-full flex flex-col items-center">
                <h1 class="text-lg mb-10">Login</h1>
                <form action="?/login" method="POST" class="flex flex-col items-center">
                    <label class="self-start" for="loginEmail">Email</label>
                    <input type="text" id="loginEmail" name="email" class="border border-solid rounded-lg border-slate-400 p-2 text-black">

                    <label class="self-start mt-3" for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" name="password" class="border border-solid rounded-lg border-slate-400 p-2 text-black">

                    <button type="submit" class="bg-purple-400 rounded-lg p-2 text-white  w-1/2 mt-4">Login</button>
                </form>
            </div>
            <button on:click="{flipPage}" class="absolute bottom-5 right-5 text-right">
                <u>
                    <p>Don't have an account yet?</p>
                    <p>Register</p>
                </u>
            </button>
        </div>
        <div class="pg pg2 p-10 flex items-center bg-slate-200 border-l-2 border-black">
            <div class="w-full flex flex-col items-center">
                <h1 class="text-lg mb-10">Register</h1>
                <form action="?/register" method="POST" class="flex flex-col items-center">
                    <label class="self-start" for="registerName">Name</label>
                    <input type="text" id="registerName" name="name" class="border border-solid rounded-lg border-slate-400 p-2 text-black">

                    <label class="self-start mt-3" for="registerEmail">Email</label>
                    <input type="text" id="registerEmail" name="email" class="border border-solid rounded-lg border-slate-400 p-2 text-black">

                    <label class="self-start mt-3" for="registerPassword">Password</label>
                    <input type="password" id="registerPassword" name="password" class="border border-solid rounded-lg border-slate-400 p-2">

                    <button type="submit" class="bg-purple-400 rounded-lg p-2 text-white  w-1/2 mt-4">Login</button>
                </form>
            </div>
            <button on:click="{flipPage}" class="absolute bottom-5 left-5 text-left">
                <u>
                    <p>Already have an account?</p>
                    <p>Login</p>
                </u>
            </button>
        </div>
    </div>
</main>

<style>

    .loginBook {
        background-color: #fff;
        width: 800px;
        height: 600px;
        border-radius: 20px;
        perspective: 1000px;
    }

    .loginPage {
        content: '';
        position: absolute;
        z-index: 5;
        width: 50%;
        height: 100%;
        right: 50%;
        border-radius: 20px 0 0 20px;
        transform-origin: center right;
        transition: 0.7s ease all;
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