<script>
    export let first_name, userProfilePicture
</script>

<p class="text-[50px] mb-2"><strong>DASHBOARD</strong></p>
<div class="flex justify-between">
    <div>
        <p class="text-[25px] font-bold">Welcome</p>
        <p class="max-w-xl pt-2">View statistics about your reading, including how many books you've read, how many pages that amounts to
            and how many hours you have spend reading based on your words read per minute</p>
    </div>
    <div class="hidden xl:flex gap-[15px]">
        <div>
            <p class="text-[20px] font-bold">{first_name}</p>
            <p>Go to your settings <a href="/dashboard/user"><u>here</u></a> </p>
        </div>
        {#if userProfilePicture}
            <img class="h-[50px] w-[50px] rounded-full" src="{userProfilePicture}"
                 alt="User avatar"/>
        {:else}
            <img class="h-[50px] w-[50px]" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                 alt="User avatar"/>
        {/if}
    </div>
</div>