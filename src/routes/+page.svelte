
<script>
    import UnauthedHeader from '$lib/components/navbar/unauthedNavbar.svelte'
    import LandingImage from '$lib/assets/images/woman_reading.png'
    import WhySection from '$lib/components/landingpage/whySection.svelte'
    import HowItWorksSection from '$lib/components/landingpage/howItWorksSection.svelte'

    /** @type {import('.$types').PageData} */
    export let data;

    console.log(data.posts)
</script>


<main class="h-screen flex flex-col items-center">
    <div class="w-full fixed">
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
        <WhySection/>
    </section>

    <section class="w-full flex items-center justify-center">
        <HowItWorksSection/>
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