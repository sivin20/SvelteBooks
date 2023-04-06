<script>
    import Fa from 'svelte-fa'
    import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'
    import '../app.css';
</script>

<aside class="absolute fixed left-0 top-0 overflow-y-auto w-1/5 h-full bg-gray-200 p-10">
    <a class="flex items-center text-5xl" href="/dashboard">
        <h1 class="mr-[5px]">SigLib</h1>
        <Fa icon="{faBookBookmark}"/>
    </a>
    <nav class="text-xl mt-10">
        <a class="block hover:bg-purple-400 pd-4" href="/dashboard/library">Library</a>
    </nav>
</aside>