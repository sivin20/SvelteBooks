<script>
    import Sidebar from '../lib/sidebar.svelte'
    import '../app.css';
</script>

<main class="flex w-screen h-screen">
    <div class="w-1/5">
        <Sidebar/>
    </div>
    <div class="w-4/5 overflow-y-auto p-10">
        <slot></slot>
    </div>
    <div class="absolute fixed right-10 top-10 flex rounded-xl border-slate-100 bg-gray-100 items-center p-2">
        <p class="mr-2">Sigurd Vind</p>
        <i class="fa-regular fa-user"></i>
    </div>
</main>

<style>

</style>

