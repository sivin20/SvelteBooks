

<script lang="ts">
    import UserProfileChanger from "$lib/components/user/userProfileChanger.svelte";
    export let data
    const imageId = data.session.user.id;

</script>

<main>
    <div class="mb-2">
        <p class="text-[50px]"><strong>USER SETTINGS</strong></p>
    </div>

    <section class="flex flex-col xl:flex-row flex-wrap">
        <div class="w-full xl:w-1/2">
            <UserProfileChanger imageId={imageId}/>
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

    <form action="/logout" method="POST">
        <button type="submit">Logout</button>
    </form>

</main>