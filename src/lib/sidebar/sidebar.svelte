<script>
    import BookSpine from './bookSpine.svelte'
    import BookForeEdge from './bookForeEdge.svelte'
    import '../../app.css';
</script>

<aside class="absolute fixed left-0 top-0 w-[350px] h-full flex flex-col">
    <div class="w-[98%] h-[5%]">
        <BookForeEdge rotate="true" color="#ad7743" bookMark="true"></BookForeEdge>
    </div>
    <div class="w-[99%] h-[5%]">
        <BookForeEdge color="#885e35"></BookForeEdge>
    </div>
    <div class="w-[100%] h-[8%] hover:w-[105%] hover:ml-[1rem]">
        <BookSpine link="/dashboard">
            <div class="flex items-center text-4xl">
                <h1 class="mr-[5px]">SigLib</h1>
            </div>
        </BookSpine>
    </div>
    <div class="w-[99%] h-[5%]">
        <BookForeEdge></BookForeEdge>
    </div>
    <div class="w-[94%] h-[5%] self-end">
        <BookForeEdge rotate="true" color="#da9858"></BookForeEdge>
    </div>
    <div class="w-[100%] h-[6%] hover:w-[105%] hover:ml-[1rem]">
        <BookSpine link="/dashboard/library">
            <div class="flex items-center text-2xl">
                <p>Library</p>
            </div>
        </BookSpine>
    </div>
    <div class="w-[97%] h-[5%]">
        <BookForeEdge bookMark="true"></BookForeEdge>
    </div>
    <div class="w-[100%] h-[6%] hover:w-[105%] hover:ml-[1rem]">
        <BookSpine link="/dashboard/library/add-book">
            <div class="flex items-center text-2xl">
                <p>Add books</p>
            </div>
        </BookSpine>
    </div>
    <div class="w-[94%] h-[5%] self-end">
        <BookForeEdge rotate="true" color="#ba844f"></BookForeEdge>
    </div>
    <div class="w-[98%] h-[5%]">
        <BookForeEdge color="#885e35"></BookForeEdge>
    </div>
    <div class="w-[95%] h-[5%]">
        <BookForeEdge></BookForeEdge>
    </div>
    <div class="w-[98%] h-[5%]">
        <BookForeEdge bookMark="true" color="#622d18"></BookForeEdge>
    </div>
    <div class="w-[100%] h-[5%]">
        <BookForeEdge bookMark="true" rotate="true" color="#ad7743"></BookForeEdge>
    </div>
    <div class="w-[94%] h-[5%] self-end">
        <BookForeEdge rotate="true" color="#da9858"></BookForeEdge>
    </div>
    <div class="w-[98%] h-[5%]">
        <BookForeEdge color="#ad7743"></BookForeEdge>
    </div>
    <div class="w-[95%] h-[5%] self-end">
        <BookForeEdge></BookForeEdge>
    </div>
    <div class="w-[98%] h-[5%]">
        <BookForeEdge bookMark="true" color="#622d18"></BookForeEdge>
    </div>
    <div class="w-[100%] h-[5%]">
        <BookForeEdge bookMark="true" rotate="true" color="#ba844f"></BookForeEdge>
    </div>
    <div class="w-[95%] h-[5%]">
        <BookForeEdge color="#885e35"></BookForeEdge>
    </div>
</aside>