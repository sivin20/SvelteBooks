

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
        <div>
            <p>Change user profile image</p>
            <form action="?/avatar" method="post" enctype="multipart/form-data" class="flex items-center flex-col relative w-[150px]">
                {#if avatar}
                    <img class="h-[100px] w-[100px] rounded-full" src="{avatar}" alt="d" />
                    <button on:click|preventDefault={() => {clearInputFile()}} class="cursor-pointer absolute right-5 top-0">
                        <Fa color="red" icon="{faCircleXmark}"/>
                    </button>
                {:else}
                    <img class="h-[100px] w-[100px]" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="User profile" />
                {/if}
                <button class="flex items-center cursor-pointer flex-col mt-2" on:click|preventDefault={()=>{fileinput.click();}}>
                    <img class="h-[40px] w-[40px] flex" src="https://static.thenounproject.com/png/625182-200.png" alt="upload image icon" />
                    <div class="chan">Choose Image</div>
                </button>
                <input style="display:none"
                       type="file"
                       name="avatar"
                       placeholder="avatar"
                       accept="{authorizedExtensions.join(',')}" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
                <button class="primary-button mt-4" type="submit" disabled="{!avatar}">SAVE</button>
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