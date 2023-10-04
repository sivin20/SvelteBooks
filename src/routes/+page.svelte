
<script>
    import UnauthedHeader from '$lib/components/navbar/unauthedNavbar.svelte'
    import LandingImage from '$lib/assets/woman_reading.jpeg'

    /** @type {import('.$types').PageData} */
    export let data;

    console.log(data.posts)
</script>


<main class="h-screen flex flex-col items-center">
    <div class="w-full">
        <UnauthedHeader/>
    </div>
    <section class="w-full flex items-center justify-center p-10 bg-[--primary]">
        <div class="flex w-full max-w-[1400px]">
            <div class="w-1/2 py-[64px] flex flex-col justify-center">
                <p class="text-[50px] font-bold">Organize</p>
                <p class="text-[50px] text-white font-bold mt-[-20px]">your reading life</p>
                <p class="text-[25px] text-white pt-4">All your books tracked in <strong>one place</strong>. Plans, reviews, and goals. <strong>Completely private</strong>.</p>
                <div class="flex pt-8">
                    <button class="secondary-button">Get started</button>
                </div>
            </div>
            <div class="w-1/2 py-[64px] flex items-center justify-center">
                <img src="{LandingImage}" class="w-auto max-h-[400px]" alt="Woman reading a book in front of a bookshelf">
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