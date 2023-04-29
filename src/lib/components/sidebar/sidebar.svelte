<script>
    import '../../../app.css';
    import Fa from 'svelte-fa'
    import { faHome, faBookMedical, faRightFromBracket, faFolder } from '@fortawesome/free-solid-svg-icons'
    import {page} from '$app/stores'

    $: console.log($page.url.pathname)
</script>

<aside class="absolute fixed left-0 top-0 w-32 h-full flex flex-col bg-[--primary] rounded-xl">
    <div class="flex items-center flex-col text-white h-full w-full text-[32px]">
        <div class="flex flex-col justify-between h-full w-full items-center mt-10 mb-10">
            <div class="flex items-center flex-col text-white h-full w-full">
                <a href="/dashboard" class="h-1/5 w-full flex flex-col justify-center items-center">
                    <div class="h-1/4 w-full bg-white">
                        <div class="h-full w-full bg-[--primary] fill-box-start" class:rounded-ee-[30px]={$page.url.pathname === '/dashboard'}></div>
                    </div>
                    <div class="flex w-full ml-10 h-1/2 justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard'}>
                        <Fa class="mr-10" icon="{faHome}"></Fa>
                    </div>
                    <div class="h-1/4 w-full bg-white">
                        <div class="h-full w-full bg-[--primary] fill-box-end" class:rounded-se-[30px]={$page.url.pathname === '/dashboard'}></div>
                    </div>
                </a>
                <a href="/dashboard/library" class="h-1/5 w-full flex flex-col justify-center items-center">
                    <div class="h-1/4 w-full bg-white">
                        <div class="h-full w-full bg-[--primary] fill-box-start" class:rounded-ee-[30px]={$page.url.pathname === '/dashboard/library'}></div>
                    </div>
                    <div class="flex w-full ml-10 h-1/2 justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard/library'}>
                        <Fa class="mr-10" icon="{faFolder}"></Fa>
                    </div>
                    <div class="h-1/4 w-full bg-white">
                        <div class="h-full w-full bg-[--primary] fill-box-end" class:rounded-se-[30px]={$page.url.pathname === '/dashboard/library'}></div>
                    </div>
                </a>
                <a href="/dashboard/library/add-book" class="h-1/5 w-full flex flex-col justify-center items-center">
                    <div class="h-1/4 w-full bg-white">
                        <div class="h-full w-full bg-[--primary] fill-box-start" class:rounded-ee-[30px]={$page.url.pathname === '/dashboard/library/add-book'}></div>
                    </div>
                    <div class="flex w-full ml-10 h-1/2 justify-center items-center nav-item"
                         class:active={$page.url.pathname === '/dashboard/library/add-book'}>
                        <Fa class="mr-10" icon="{faBookMedical}"></Fa>
                    </div>
                    <div class="h-1/4 w-full bg-white">
                        <div class="h-full w-full bg-[--primary] fill-box-end" class:rounded-se-[30px]={$page.url.pathname === '/dashboard/library/add-book'}></div>
                    </div>
                </a>
            </div>
            <form action="/logout" method="POST" class="h-1/5 w-full flex flex-col justify-center items-center cursor-pointer">
                <div class="h-1/4 w-full bg-white">
                    <div class="h-full w-full bg-[--primary] fill-box-start"></div>
                </div>
                <div class="flex w-full ml-10 h-1/2 justify-center items-center nav-item">
                    <button type="submit"><Fa class="mr-10" icon="{faRightFromBracket}"></Fa></button>
                </div>
                <div class="h-1/4 w-full bg-white">
                    <div class="h-full w-full bg-[--primary] fill-box-end"></div>
                </div>
            </form>
        </div>
    </div>
</aside>

<style lang="scss">
    .active {
        background-color: #FFF;
        color: var(--primary);
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
    }
    a:hover .nav-item, form:hover .nav-item {
        background-color: #FFF;
        color: var(--primary);
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
    }
    a:hover .fill-box-end, form:hover .fill-box-end {
      border-top-right-radius: 30px;
    }
    a:hover .fill-box-start, form:hover .fill-box-start {
      border-bottom-right-radius: 30px;
    }
</style>