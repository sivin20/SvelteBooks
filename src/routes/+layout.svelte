<script lang="ts">
    import Sidebar from '../lib/sidebar.svelte'
    import '../app.css';
    import Fa from 'svelte-fa'
    import { faUser } from '@fortawesome/free-solid-svg-icons'

    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import type { LayoutData } from './$types';
    export let data: LayoutData;

    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => subscription.unsubscribe();
    });
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
        <Fa icon={faUser} />
    </div>
</main>

<style>

</style>

