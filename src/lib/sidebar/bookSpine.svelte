<script>
    export let link
</script>

<a href="{link}">
    <main class="bg-[--primary] h-full items-center flex text-white w-full hover:bg-black">
        <div class="ml-2 bg-white w-[1rem] h-full"></div>
        <div class="ml-2 bg-white w-[1rem] h-full"></div>
        <div class="justify-center flex flex-auto h-full">
            <slot></slot>
        </div>
        <div class="mr-2 bg-white w-[1rem] h-full"></div>
    </main>
</a>