<script lang="ts" xmlns="http://www.w3.org/1999/html">
    import UserProfileChanger from "$lib/components/user/userProfileChanger.svelte";
    import {
        userProfilePicture,
        getImageFromCloud,
        loggedInUser,
        getUserFromId,
    } from "$lib/stores/userStore";
    import {onMount} from "svelte";
    import {enhance} from "$app/forms";
    import Modal from '$lib/components/modal.svelte'
    import toast from "svelte-french-toast";

    export let data
    const imageId = data.session.user.id;
    let userFirstName: string
    let userLastName: string
    let userReadingSpeed: number
    let userEmail: string = data.session.user.email

    let userNameHasBeenChanged: boolean = false
    let readingSpeedHasBeenChanged: boolean = false
    let emailHasBeenChanged: boolean = false

    let showDeleteModal: boolean = false

    let userFormLoading: boolean = false
    let readingFormLoading: boolean = false

    function resetNameField() {
        userNameHasBeenChanged = false
        userFirstName = $loggedInUser.first_name
        userLastName = $loggedInUser.last_name
    }

    function resetReadingSpeed() {
        readingSpeedHasBeenChanged = false
        userReadingSpeed = $loggedInUser.reading_speed
    }

    function resetEmailField() {
        emailHasBeenChanged = false
        userEmail = data.session.user.email
    }

    function enhanceUserForm() {
        userFormLoading = true;
        return async ({ update }) => {
            await getUserFromId(imageId)
            resetNameField()
            userFormLoading = false;
            toast.success(`Succesfully updated your name`, {
                position: "top-right"
            })
            update({reset: false});
        };
    }

    function enhanceReadingForm() {
        readingFormLoading = true;
        return async ({ update }) => {
            await getUserFromId(imageId)
            resetReadingSpeed()
            readingFormLoading = false;
            toast.success(`Succesfully updated your name`, {
                position: "top-right"
            })
            update({reset: false});
        };
    }

    onMount(() => {
        getUserFromId(imageId).then(() => {
            userFirstName = $loggedInUser.first_name
            userLastName = $loggedInUser.last_name
            userReadingSpeed = $loggedInUser.reading_speed
        })
        getImageFromCloud(imageId)
    });

</script>

<main>
    <div class="mb-6">
        <p class="text-[50px]"><strong>USER SETTINGS</strong></p>
    </div>
    <div class="h-1 border-t-2 border-[--input-field-color]"></div>

    <div class="grid grid-cols-7 gap-6 mt-6 mb-[200px]">
<!--    Sidepanel-->
        <div class="col-span-2">
            <div class="sticky top-0">
                <div class="flex items-center gap-4">
                    <p class="font-bold">{$loggedInUser.first_name}</p>
                    {#if $userProfilePicture}
                        <img class="h-[50px] w-[50px] rounded-full" src="{$userProfilePicture}"
                             alt="User avatar"/>
                    {:else}
                        <img class="h-[50px] w-[50px]" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                             alt="User avatar"/>
                    {/if}
                </div>
                <p class="italic mt-2">{data.session.user.email}</p>
                <form action="/logout" method="POST" class="mt-2">
                    <button class="cancel-button" type="submit">Logout</button>
                </form>
            </div>
        </div>
<!--    Main content-->
        <div class="col-span-5">
            <section class="gap-6 flex items-center flex-col">
<!--            Change user name-->
                <div class="border-2 rounded-xl border-[--input-field-color] w-full">
                    <div class="p-4">
                        <div class="col-span-2">
                            <p class="text-xl font-bold">Your name</p>
                            <p class="pt-2">Please enter your full name, or a display name you are comfortable with.</p>
                            <form action="?/user" method="POST" id="userForm" class="flex items-center gap-4 mt-2" use:enhance={enhanceUserForm}>
                                <div>
                                    <label for="first_name" class="font-semibold">First name</label>
                                    <input class="w-full focus:bg-[--input-field-color] bg-[--input-field-color] h-[40px] p-2 rounded-[6px]"
                                           type="text" id="first_name" name="first_name"
                                           bind:value={userFirstName} on:input={() => { userNameHasBeenChanged = true }}>
                                </div>

                                <div>
                                    <label for="last_name" class="font-semibold">Last name</label>
                                    <input class="w-full focus:bg-[--input-field-color] bg-[--input-field-color] h-[40px] p-2 rounded-[6px]"
                                           type="text" id="last_name" name="last_name"
                                           bind:value={userLastName} on:input={() => { userNameHasBeenChanged = true }}>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="border-t-2 border-[--input-field-color] grid grid-cols-3 items-center p-4 bg-[--input-field-color]">
                        <p class="col-span-2">Please use 20 characters maximum pr. field</p>
                        <div class="w-[100px] flex justify-center col-span-1 justify-self-end relative">
                            {#if userNameHasBeenChanged && !userFormLoading}
                                <div class="absolute right-[100px]">
                                    <button class="cancel-button" on:click|preventDefault={() => {resetNameField()}}>CANCEL</button>
                                </div>
                            {/if}
                            <button class="small-primary-button" form="userForm"
                                    disabled="{!userNameHasBeenChanged || userFormLoading}"
                                    type="submit">
                                {userFormLoading? 'Loading...' : 'SAVE'}
                            </button>
                        </div>
                    </div>
                </div>
<!--            Change user Reading speed    -->
                <div class="border-2 rounded-xl border-[--input-field-color] w-full">
                    <div class="p-4">
                        <div class="col-span-2">
                            <p class="text-xl font-bold">Your reading speed</p>
                            <p class="pt-2">Please enter your reading speed in Words pr. Minute (WPM)</p>
                            <form action="?/reading_speed" id="readingSpeedForm" method="POST" class="flex flex-col w-1/2 xl:w-2/3 mt-2"
                            use:enhance={enhanceReadingForm}>
                                <input class="w-full focus:bg-[--input-field-color] bg-[--input-field-color] h-[40px] p-2 rounded-[6px]"
                                       type="number" id="reading_speed" name="reading_speed"
                                       bind:value={userReadingSpeed} on:input={() => { readingSpeedHasBeenChanged = true }}>
                            </form>
                        </div>
                    </div>
                    <div class="border-t-2 border-[--input-field-color] grid grid-cols-3 items-center p-4 bg-[--input-field-color]">
                        <p class="col-span-2">This will affect your dashboard stats</p>
                        <div class="w-[100px] flex justify-center col-span-1 justify-self-end relative">
                            {#if readingSpeedHasBeenChanged}
                                <div class="absolute right-[100px]">
                                    <button class="cancel-button" on:click|preventDefault={() => {resetReadingSpeed()}}>CANCEL</button>
                                </div>
                            {/if}
                            <button class="small-primary-button" form="readingSpeedForm"
                                    disabled="{!readingSpeedHasBeenChanged}" type="submit">
                                {readingFormLoading ? 'Loading..' : 'SAVE'}
                            </button>
                        </div>
                    </div>
                </div>
<!--            Change user email-->
                <div class="border-2 rounded-xl border-[--input-field-color] w-full">
                    <div class="p-4">
                        <div class="col-span-2">
                            <p class="text-xl font-semibold">Your Email</p>
                            <p class="pt-2">Please enter the email address you want to log in with Vercel</p>
                            <form action="?/user" method="POST" class="flex flex-col w-1/2 xl:w-2/3 mt-2">
                                <input class="w-full focus:bg-[--input-field-color] bg-[--input-field-color] h-[40px] p-2 rounded-[6px]"
                                       type="text" id="email" name="email"
                                       bind:value={userEmail} on:input={() => { emailHasBeenChanged = true }}>
                            </form>
                        </div>
                    </div>
                    <div class="border-t-2 border-[--input-field-color] grid grid-cols-3 items-center p-4 bg-[--input-field-color]">
                        <p class="col-span-2">We'll send you an email to verify the change</p>
                        <div class="w-[100px] flex justify-center col-span-1 justify-self-end relative">
                            {#if emailHasBeenChanged}
                                <div class="absolute right-[100px]">
                                    <button class="cancel-button" on:click|preventDefault={() => {resetEmailField()}}>CANCEL</button>
                                </div>
                            {/if}
                            <button class="small-primary-button" disabled="{!emailHasBeenChanged}" type="submit">SAVE</button>
                        </div>
                    </div>
                </div>
<!--            Change user Profile Image-->
                <div class="w-full">
                    <UserProfileChanger imageId={imageId}/>
                </div>
<!--            Delete account-->
                <div class="border-2 rounded-xl border-[--primary-accent-1] w-full">
                    <div class="p-4">
                        <div class="col-span-2">
                            <p class="text-xl font-semibold">Delete Account</p>
                            <p class="pt-2">Permanently remove your Account and all of its contents from Siglib.
                                This action is not reversible, so please continue with caution</p>

                        </div>
                    </div>
                    <div class="border-t-2 border-[--primary-accent-1] grid grid-cols-3 items-center p-4 bg-[--primary-accent-1]">
                        <p class="col-span-2">We'll send you an email to verify the change</p>
                        <div class="w-[100px] flex justify-center col-span-1 justify-self-end relative">
                            <button class="small-primary-button" on:click|preventDefault={() => {showDeleteModal = true}}>DELETE</button>
                        </div>
                            <Modal showModal="{showDeleteModal}" on:close={() => {showDeleteModal = false}}>
                                <h2 slot="header" class="text-[--primary] text-2xl font-bold">Delete Account</h2>
                                <div class="mt-2">
                                    <p>Siglib will <strong>delete all</strong> of your libraries, along with the list of books read,
                                        books to be read, books in progress and books on wishlist,
                                        user information, reading speed, profile picture,
                                        and all other resources belonging to your Account.</p>
                                </div>

                                <div class="h-1 border-t-2 border-[--input-field-color] my-4 "></div>

                                <form action="?/deleteUser" method="POST" id="deleteUser" class="flex flex-col gap-4">
                                    <div>
                                        <label for="firstname">Enter your email <strong>{userEmail}</strong> to continue</label>
                                        <input class="w-full focus:bg-[--input-field-color] bg-[--input-field-color] h-[40px] p-2 rounded-[6px]"
                                               type="text" id="confirm_email" name="confirm_email">
                                    </div>
                                    <div>
                                        <label for="verify" >To verify, type <strong>delete my account</strong> to continue</label>
                                        <input class="w-full focus:bg-[--input-field-color] bg-[--input-field-color] h-[40px] p-2 rounded-[6px]"
                                               type="text" id="verify" name="verify">
                                    </div>
                                </form>
                                <button slot="yes-button" type="submit" form="deleteUser" class="small-primary-button" on:click={() => console.log('DELETE')}>Yes</button>
                            </Modal>
                    </div>
                </div>
            </section>
        </div>
    </div>
</main>