<script>
    import SearchPageImg from '$lib/assets/images/searchpage.png'
    import LibraryPageImg from '$lib/assets/images/librarypage.png'
    import DashboardPage from '$lib/assets/images/dashboardpage.png'
</script>

<div class="w-full flex flex-col justify-center items-center gap-[80px] py-[80px] p-4">
    <div class="flex flex-col items-center justify-center text-center">
        <p class="text-[50px]">Organize with Siglib</p>
        <p class="text-[25px]">Now matter how many books you read, our tools help you organize and read more</p>
    </div>
    <div class="flex justify-center lg:justify-between items-center w-full max-w-[1000px] gap-10 flex-wrap-reverse">
        <div class="max-w-[500px]">
            <img class=" rounded-[6px] shadow-xl" src="{SearchPageImg}" alt="">
        </div>
        <div class="max-w-[400px]">
            <p class="text-[25px] font-bold">Explore a vast library</p>
            <p>Quickly find books by searching with author names, titles, ISBN, or keywords.
                Easily add discovered books to your personal library.</p>
        </div>
    </div>
    <div class="flex justify-center lg:justify-between items-center w-full max-w-[1000px] gap-10 flex-wrap">
        <div class="max-w-[400px]">
            <p class="text-[25px] font-bold">Organize Your Collection</p>
            <p>Access your personalized libraries with ease.
                Manage your books, mark them as read or in progress, and categorize them.</p>
        </div>
        <div class="max-w-[500px]">
            <img class=" rounded-[6px] shadow-xl" src="{LibraryPageImg}" alt="">
        </div>
    </div>
    <div class="flex justify-center lg:justify-between items-center w-full max-w-[1000px] gap-10 flex-wrap-reverse">
        <div class="max-w-[500px]">
            <img class="rounded-[6px] shadow-xl" src="{DashboardPage}" alt="">
        </div>
        <div class="max-w-[400px]">
            <p class="text-[25px] font-bold">Visualize Your Reading Journey</p>
            <p>Gain insights with a dynamic dashboard.
                See your reading progress with a bar chart of books read over time.
                Discover your shortest books, longest books, and top authors.</p>
        </div>
    </div>

</div>