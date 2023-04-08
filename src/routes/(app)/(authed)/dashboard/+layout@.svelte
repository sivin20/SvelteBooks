<script lang="ts">
    import '../../../../app.css'
    import Sidebar from '$lib/sidebar/sidebar.svelte'
    import Fa from 'svelte-fa'
    import { faUser } from '@fortawesome/free-solid-svg-icons'

    /** @type {import('.$types').PageData} */
    export let data;
</script>


<main class="flex w-screen h-screen">
    <div class="w-[350px]">
        <Sidebar/>
    </div>
    <div class="flex-auto overflow-y-auto flex justify-center">
        <div class="w-[1280px] mt-10 bg-white rounded-lg p-4 relative overflow-y-auto">
            <slot></slot>
            <div class="absolute fixed right-10 top-10 flex rounded-xl border-slate-100 bg-gray-100 items-center p-2">
                <p class="mr-2">{data.session.user.user_metadata.first_name}</p>
                <Fa icon={faUser} />
            </div>
        </div>
    </div>
</main>