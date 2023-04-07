<script>
    import Fa from 'svelte-fa'
    import BookSpine from './bookSpine.svelte'
    import BookForeEdge from './bookForeEdge.svelte'
    import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'
    import '../../app.css';
</script>

<aside class="absolute fixed left-0 top-0 overflow-y-auto w-1/5 h-full bg-slate-100">
    <div class="w-[98%] h-[10%]">
        <BookForeEdge rotate="true" color="#942343" bookMark="true"></BookForeEdge>
    </div>
    <div class="w-[100%] h-[10%]">
        <BookSpine link="/dashboard">
            <div class="flex items-center text-4xl">
                <h1 class="mr-[5px]">SigLib</h1>
                <Fa icon="{faBookBookmark}"/>
            </div>
        </BookSpine>
    </div>
    <div class="w-[99%] h-[10%]">
        <BookForeEdge></BookForeEdge>
    </div>
    <div class="w-[100%] h-[10%]" >
        <BookSpine link="/dashboard/library">
            <div class="flex items-center text-2xl">
                <p>Library</p>
            </div>
        </BookSpine>
    </div>
    <div class="w-[97%] h-[10%]">
        <BookForeEdge bookMark="true"></BookForeEdge>
    </div>
    <div class="w-[94%] h-[10%]">
        <BookForeEdge color="#004d25"></BookForeEdge>
    </div>
    <div class="w-[98%] h-[10%]">
        <BookForeEdge color="#ed6d35"></BookForeEdge>
    </div>
    <div class="w-[95%] h-[10%]">
        <BookForeEdge></BookForeEdge>
    </div>
    <div class="w-[98%] h-[10%]">
        <BookForeEdge bookMark="true" color="#622d18"></BookForeEdge>
    </div>
    <div class="w-[100%] h-[10%]">
        <BookForeEdge bookMark="true" rotate="true" color="#fcc800"></BookForeEdge>
    </div>
</aside>