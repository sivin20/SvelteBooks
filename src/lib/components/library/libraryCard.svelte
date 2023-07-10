<script>
    export let library
    export let active
</script>

<main>
    <div class="p-2 content-box mr-5 cursor-pointer w-[185px] h-[96px] bg-[--primary-accent-1] rounded-[6px]" class:active={active}>
        <div class="flex flex-row justify-between items-center">
            <p class="font-bold">{library.name}</p>
            {#if library.name === 'BOOKS READ'}
                <svg xmlns="http://www.w3.org/2000/svg" width="12.69" height="14.5" viewBox="0 0 19.433 22.207">
                    <path id="Path_5" data-name="Path 5" d="M132.01,19.568a12.282,12.282,0,0,1,0-3.191.839.839,0,0,0,.416-.833h0V1.114A1.022,1.022,0,0,0,131.316,0H117.164A4.087,4.087,0,0,0,113,4.011q0,.078,0,.156V18.041a4.087,4.087,0,0,0,4.008,4.164h14.308a1.094,1.094,0,0,0,1.11-1.078c0-.011,0-.022,0-.033V20.4a1.2,1.2,0,0,0-.416-.833M118.625,9.032h0l.685-.687a.484.484,0,0,1,.685,0h0l2.121,2.122,4.543-4.544a.485.485,0,0,1,.685,0h0l.685.686a.484.484,0,0,1,0,.685l-5.57,5.57a.485.485,0,0,1-.685,0h0l-3.148-3.148a.484.484,0,0,1,0-.685m12.19,10.4H117.164a1.311,1.311,0,0,1-1.388-1.388,1.388,1.388,0,0,1,1.388-1.388h13.651Z" transform="translate(-112.999 0.001)"/>
                </svg>
            {:else if library.name === 'TBR'}
                <svg xmlns="http://www.w3.org/2000/svg" width="15.08" height="14.5" viewBox="0 0 23.095 22.207">
                    <path id="Icon_ionic-ios-heart" data-name="Icon ionic-ios-heart" d="M20.252,3.938H20.2a6.317,6.317,0,0,0-5.274,2.887A6.317,6.317,0,0,0,9.648,3.938H9.593a6.277,6.277,0,0,0-6.218,6.273,13.514,13.514,0,0,0,2.654,7.367,46.505,46.505,0,0,0,8.894,8.566,46.505,46.505,0,0,0,8.894-8.566,13.514,13.514,0,0,0,2.654-7.367A6.277,6.277,0,0,0,20.252,3.938Z" transform="translate(-3.375 -3.938)"/>
                </svg>
            {:else if library.name === 'IN PROGRESS'}
                <svg id="Group_4" data-name="Group 4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10.84" height="14.5" viewBox="0 0 16.598 22.207">
                    <defs>
                        <clipPath id="clip-path">
                            <rect id="Rectangle_11" data-name="Rectangle 11" width="16.598" height="22.207" fill="#fed9d9"/>
                        </clipPath>
                    </defs>
                    <g id="Group_3" data-name="Group 3" clip-path="url(#clip-path)">
                        <path id="Path_3" data-name="Path 3" d="M15.583,22.208H2.368a.375.375,0,0,0-.061-.023A2.9,2.9,0,0,1,0,19.267C.025,13.829.01,8.391.011,2.954a3.335,3.335,0,0,1,.02-.519A2.808,2.808,0,0,1,2.877.006Q5.9,0,8.922.006c.341,0,.342,0,.342.352q0,2.947,0,5.893a2.241,2.241,0,0,0,.013.346.313.313,0,0,0,.515.226,1.016,1.016,0,0,0,.293-.343c.357-.569.711-1.139,1.068-1.708.145-.231.159-.23.307.007q.524.835,1.046,1.671a1.293,1.293,0,0,0,.282.354.317.317,0,0,0,.535-.148.948.948,0,0,0,.034-.343c0-2.008,0-4.015,0-6.023,0-.211.054-.294.279-.288.534.015,1.069,0,1.6.005A1.288,1.288,0,0,1,16.6,1.367q0,9.749,0,19.5a1.409,1.409,0,0,1-.033.365,1.358,1.358,0,0,1-.98.977M8.932,21.118h6.044c.087,0,.173,0,.26,0a.222.222,0,0,0,.256-.249c0-.188,0-.376,0-.563,0-.331,0-.333-.342-.333H3.628c-.087,0-.174,0-.26,0A.546.546,0,0,1,3.232,18.9a1.31,1.31,0,0,1,.429-.042l11.4,0c.072,0,.145,0,.217,0,.155.01.228-.057.224-.215s0-.332,0-.5c0-.409-.022-.43-.427-.43H3c-.087,0-.173,0-.26,0a1.7,1.7,0,0,0-1.408,2.516,1.683,1.683,0,0,0,1.6.887c2-.006,4,0,6,0" transform="translate(0 -0.001)"/>
                    </g>
                </svg>
            {:else if library.name === 'WISHLIST'}
                <svg xmlns="http://www.w3.org/2000/svg" width="15.15" height="14.5" viewBox="0 0 22.346 21.388">
                    <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M11.416.743,8.688,6.273l-6.1.89a1.337,1.337,0,0,0-.739,2.281l4.415,4.3L5.217,19.823a1.336,1.336,0,0,0,1.938,1.408l5.459-2.87,5.459,2.87a1.337,1.337,0,0,0,1.938-1.408l-1.044-6.077,4.415-4.3a1.337,1.337,0,0,0-.739-2.281l-6.1-.89L13.813.743a1.338,1.338,0,0,0-2.4,0Z" transform="translate(-1.441 0.001)"/>
                </svg>
            {/if}

        </div>
        <p>Number of books: {library.books}</p>
        <p>Page count: {library.pages}</p>
    </div>
</main>

<style lang="scss">
  .content-box:hover {
    background-color: var(--primary);
    color: var(--background-primary);

    svg {
      fill: var(--background-primary)
    }
  }
  .active {
    background-color: var(--primary);
    color: var(--background-primary);

    svg {
      fill: var(--background-primary)
    }
  }
  svg {
    fill: var(--primary)
  }
</style>