<script>
    export let link
    import Logo from "../../assets/siglib_logo.png"
</script>

<a href="{link}">
    <main class="bg-[#86511d] h-full items-center flex text-white w-full">
        <div class="ml-2 bg-white w-[1rem] h-full"></div>
        <div class="ml-2 bg-white w-[1rem] h-full"></div>
        <div class="justify-center flex flex-auto h-full">
            <slot></slot>
        </div>
        <div class="mr-2 w-[2rem] h-full flex items-center justify-center rotate-90">
            <img src="{Logo}" alt="" class="rotate-180">
        </div>
    </main>
</a>