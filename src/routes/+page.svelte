
<script>
    import UnauthedHeader from '$lib/components/navbar/unauthedNavbar.svelte'
    import LandingImage from '$lib/assets/images/woman_reading.jpeg'
    import OpenBook from '$lib/assets/images/openbook.png'
    import BookStack from '$lib/assets/images/bookstack.png'
    import BookBarChart from '$lib/assets/images/bookbarchart.png'

    /** @type {import('.$types').PageData} */
    export let data;

    console.log(data.posts)
</script>


<main class="h-screen flex flex-col items-center">
    <div class="w-full">
        <UnauthedHeader/>
    </div>
    <section class="w-full flex items-center justify-center p-10 bg-[--primary]">
        <div class="flex flex-wrap w-full max-w-[1400px]">
            <div class="py-[32px] sm:py-[64px] flex flex-col justify-center max-w-[600px]">
                <p class="text-[38px] sm:text-[50px] font-bold">Organize</p>
                <p class="text-[38px] sm:text-[50px] text-white font-bold mt-[-20px]">your reading life</p>
                <p class="text-[18px] sm:text-[25px] text-white pt-4">All your books tracked in <strong>one place</strong>. Plans, reviews, and goals. <strong>Completely private</strong>.</p>
                <div class="flex pt-8">
                    <button class="secondary-button">Get started</button>
                </div>
            </div>
            <div class="py-[32px] sm:py-[64px] flex items-center justify-center flex-auto">
                <img src="{LandingImage}" class="w-auto max-h-[500px]" alt="Woman reading a book in front of a bookshelf">
            </div>
        </div>
    </section>

    <section class="w-full flex items-center justify-center p-10">
        <div class="w-full max-w-[1400px] flex flex-col justify-center items-center">
            <p class="text-[50px] font-bold">Why Siglib?</p>
            <p class="text-[25px] text-center pt-4 max-w-[800px]">
                We’re built for growing businesses.
                Put our marketing and sales tools behind your idea, dream, brand,
                or business and we’ll help you share it with the world.
            </p>
            <div class="flex flex-wrap py-10 justify-center items-center">
                <div class="flex flex-col justify-center items-center text-center">
                    <img class="w-auto max-h-[200px]" src="{BookStack}" alt="OpenBook">
                    <p class="text-[25px]">Effortless Book Management</p>
                    <p class="max-w-[450px]">Easily catalog your reading list and keep it organized. Access your books from anywhere, anytime.</p>
                </div>
                <div class="flex flex-col justify-center items-center text-center">
                    <img class="w-auto max-h-[200px]" src="{OpenBook}" alt="OpenBook">
                    <p class="text-[25px]">Track Your Reading Progress</p>
                    <p class="max-w-[450px]">Monitor your reading journey and set personal goals.Stay motivated as you watch your completed books pile up.</p>
                </div>
                <div class="flex flex-col justify-center items-center text-center">
                    <img class="w-auto max-h-[200px]" src="{BookBarChart}" alt="OpenBook">
                    <p class="text-[25px]">Explore Book Statistics</p>
                    <p class="max-w-[450px]">Get insights into your reading habits with detailed stats. Discover your longest books, shortest books, and top authors.</p>
                </div>
            </div>
        </div>
    </section>
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