
<script>
    import UnauthedHeader from '$lib/components/navbar/unauthedNavbar.svelte'
    /** @type {import('.$types').PageData} */
    export let data;

    console.log(data.posts)
</script>


<main class="h-screen flex flex-col items-center">
    <div class="w-full">
        <UnauthedHeader/>
    </div>
    <section class="w-full flex items-center p-10 bg-[--primary]">
        <div class="flex w-full max-w-[1400px]">
            <div class="w-1/2 py-[64px]">
                <p class="text-[50px]">Organize your reading life</p>
                <p class="text-[25px]">All your books tracked in one place. Plans, reviews, and goals. Completely private.</p>
                <div class="flex">
                    <button class="primary-button">Get started</button>
                </div>
            </div>
            <div class="w-1/2 py-[64px]">
                image
            </div>
        </div>
    </section>
    <div class="w-full mt-10 px-4 relative max-w-[1400px]">
        <p>Please login or register</p>
        <div>
            <a href="/login">Login</a>
        </div>
        <div>
            <a href="/login">Register</a>
        </div>
    </div>
    <div>
        Track your books
        https://www.candlapp.com/
    </div>
    <div>
        Ready for your phone
        show phone images
    </div>
    <div>
        What our amazing users say
        4 blocks of fake quotes || many cards in a row that you can hover over to show
    </div>
</main>