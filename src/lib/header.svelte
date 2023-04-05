<script>
    import Fa from 'svelte-fa'
    import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'
</script>

<aside class="bg-gray-200 p-10">
    <a class="flex text-5xl" href="/dashboard">
        <h1 class="mr-[5px]">SigLib</h1>
        <Fa icon="{faBookBookmark}"/>
    </a>
    <nav class="text-xl mt-10">
        <a class="block hover:bg-purple-400 pd-4" href="/dashboard/library">Library</a>
    </nav>
</aside>