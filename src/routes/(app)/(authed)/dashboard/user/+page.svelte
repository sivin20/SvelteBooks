

<script lang="ts">
    import Fa from 'svelte-fa'
    import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

    let avatar, fileinput;

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
        avatar = null
    }

    const authorizedExtensions = ['.jpg', '.jpeg', '.png'];
</script>

<main>
    <div class="mb-2">
        <p class="text-[50px]"><strong>USER SETTINGS</strong></p>
    </div>
    <section class="flex flex-row flex-wrap">
        <div class="border-2 border-[--input-field-color] w-1/2">
            <form action="?/avatar" method="post" enctype="multipart/form-data" class="relative">
                <div class="p-4 grid grid-cols-3">
                    <div class="col-span-2">
                        <p class="text-xl font-semibold">Change user profile image</p>
                        <p class="pt-2">This is your avatar</p>
                        <p class="pt-2">Click on the avatar to upload a custom one from your files.</p>
                    </div>
                    <div class="col-span-1 justify-self-end self-center relative">
                        {#if avatar}
                            <img class="h-[100px] w-[100px] rounded-full cursor-pointer" src="{avatar}"
                                 alt="User avatar" on:click|preventDefault={()=>{fileinput.click();}}/>
                            <button on:click|preventDefault={() => {clearInputFile()}} class="cursor-pointer absolute right-0 top-0">
                                <Fa color="red" icon="{faCircleXmark}"/>
                            </button>
                        {:else}
                            <img class="h-[100px] w-[100px] cursor-pointer" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                                 alt="User avatar" on:click|preventDefault={()=>{fileinput.click();}}/>
                        {/if}
                        <input style="display:none"
                               type="file"
                               name="avatar"
                               placeholder="avatar"
                               accept="{authorizedExtensions.join(',')}" on:change={(e)=>onFileSelected(e)} bind:this={fileinput}>
                    </div>
                </div>
               <div class="border-t-2 border-[--input-field-color] grid grid-cols-3 items-center p-4 bg-[--input-field-color]">
                   <p class="col-span-2">An avatar is optional, but is cool</p>
                   <div class="w-[100px] flex justify-center col-span-1 justify-self-end">
                       <button class="small-primary-button" type="submit" disabled="{!avatar}">SAVE</button>
                   </div>
               </div>
            </form>
        </div>
        <div class="ml-6 border-l-2 border-[--input-field-color] p-4">
            <p>Change user settings</p>
            <form action="?/user" method="POST" class="flex flex-col items-center w-full">
                <div class="input-text">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email">
                </div>

                <button type="submit" class="secondary-button mt-5">SAVE</button>
            </form>
        </div>
    </section>

    <div class="h-1 border-t-2 border-[--input-field-color] my-4 "></div>

    <p>Change email</p>

</main>