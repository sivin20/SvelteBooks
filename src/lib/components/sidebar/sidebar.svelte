<script>
    import '../../../app.css';
    import Fa from 'svelte-fa'
    import { faHome, faBookMedical, faRightFromBracket, faFolder } from '@fortawesome/free-solid-svg-icons'
    import {page} from '$app/stores'

    $: console.log($page.url.pathname)
</script>

<aside class="absolute fixed left-0 top-0 w-24 h-full flex flex-col bg-[--primary]">
    <div class="flex items-center flex-col text-white h-full w-full text-[32px]">
        <div class="flex flex-col justify-between h-full w-full items-center">
            <div class="flex items-center flex-col text-white w-full">
                <a href="/dashboard" class="mt-10 mb-14">
                    <img src="src/lib/assets/siglib_blue_white.svg" alt="logo">
                </a>
                <a href="/dashboard" class="h-1/5 w-full flex flex-col justify-center items-center h-24">
                    <div class="flex justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard'}>
                        <Fa icon="{faHome}"></Fa>
                    </div>
                </a>
                <a href="/dashboard/library" class="h-1/5 w-full flex flex-col justify-center items-center h-24">
                    <div class="flex justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard/library'}>
                        <img src="src/lib/assets/book_stack.svg" alt="">
                    </div>
                </a>
                <a href="/dashboard/library/add-book" class="h-1/5 w-full flex flex-col justify-center items-center h-24">
                    <div class="flex justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard/library/add-book'}>
                        <Fa icon="{faBookMedical}"></Fa>
                    </div>
                </a>
            </div>
            <div class="arrow-up">
            </div>
        </div>
    </div>
</aside>

<style lang="scss">
    .arrow-up {
      width: 0;
      height: 0;
      border-left: 45px solid transparent;
      border-right: 45px solid transparent;

      border-bottom: 40px solid #FFF;
    }

    .active {
        background-color: var(--background-primary);
        color: var(--primary);
        border-radius: 6px;
        height: 52px;
        width: 52px;
    }

    a:hover .nav-item, form:hover .nav-item {
        background-color: var(--background-primary);
        border-radius: 6px;
        height: 52px;
        width: 52px;

        color: var(--primary);
    }
</style>