<script lang="ts">
    import toast, {Toaster} from "svelte-french-toast";
    import {enhance} from "$app/forms";
    import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import {userProfilePicture, getImageFromCloud} from "$lib/stores/userStore";

    import {onMount} from "svelte";

    let avatar, fileinput;

    export let imageId

    let formLoading: boolean = false;

    onMount(async () => {
        await getImageFromCloud(imageId)
    });


    const onFileSelected = (e:any)=>{
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            avatar = e.target.result
        };
    }

    function clearInputFile(){
        fileinput.value = null
        avatar = 'empty'
    }

    function enhanceForm() {
        formLoading = true;
        return async ({ update }) => {
            await getImageFromCloud(imageId);
            formLoading = false;
            avatar = null;
            toast.success(`Succesfully changed avatar`, {
                position: "top-right"
            })
            update();
        };
    }

    const authorizedExtensions = ['.jpg', '.jpeg', '.png'];
</script>


<div class="border-2 border-[--input-field-color] rounded-xl">
    <div class="p-4 grid grid-cols-3">
        <div class="col-span-2">
            <p class="text-xl font-bold">Change user profile image</p>
            <p class="pt-2">This is your avatar</p>
            <p class="pt-2">Click on the avatar to upload a custom one from your files.</p>
        </div>
        <div class="relative col-span-1 justify-self-end self-center relative">
            <form action="?/avatar" method="post" enctype="multipart/form-data"
                  id="avatarform" use:enhance={enhanceForm}>
                {#if avatar || $userProfilePicture}
                    {#if $userProfilePicture && (!avatar || avatar === 'empty')}
                        <img class="h-[100px] w-[100px] rounded-full cursor-pointer border-2 border-[--input-field-color]" src="{$userProfilePicture}"
                             alt="User avatar" on:click|preventDefault={()=>{fileinput.click();}}/>
                    {:else if avatar !=='empty'}
                        <img class="h-[100px] w-[100px] rounded-full cursor-pointer border-2 border-[--input-field-color]" src="{avatar}"
                             alt="User avatar" on:click|preventDefault={()=>{fileinput.click();}}/>
                        <button class="cursor-pointer absolute right-0 top-0"
                                on:click|preventDefault={() => {clearInputFile()}} disabled={!avatar || avatar === 'empty' || formLoading}>
                            <Fa color="red" icon="{faCircleXmark}"/>
                        </button>
                    {/if}
                {:else}
                    <img class="h-[100px] w-[100px] cursor-pointer" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                         alt="User avatar" on:click|preventDefault={()=>{fileinput.click();}}/>
                {/if}
                <input style="display:none"
                       type="file"
                       name="avatar"
                       placeholder="avatar"
                       accept="{authorizedExtensions.join(',')}" on:change={(e)=>onFileSelected(e)} bind:this={fileinput}>
            </form>
        </div>
    </div>
    <div class="border-t-2 border-[--input-field-color] grid grid-cols-3 items-center p-4 bg-[--input-field-color]">
        <p class="col-span-2">An avatar is optional, but very cool</p>
        <div class="w-[100px] flex justify-center col-span-1 justify-self-end">
            <button class="small-primary-button" form="avatarform"
                    type="submit" disabled={!avatar || avatar === 'empty' || formLoading}>
                {formLoading? 'Loading...' : 'SAVE'}
            </button>
        </div>
    </div>
    <Toaster/>
</div>
