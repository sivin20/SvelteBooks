<script lang="ts">
    import type {Book} from "$lib/models/Book";

    export let book: Book
    export let active

    import {createEventDispatcher} from 'svelte'

    let bookAdded = false

    const dispatch = createEventDispatcher();

    function emitBookAddedEvent() {
        bookAdded = true
        console.log("Book added", bookAdded)
        dispatch('message', {
            text: book
        });
    }

    $: bookAdded
</script>

<main class="h-full w-[540px]">
    <div class='card flex flex-row h-full p-4' class:open={active}>
        {#if book.image_link}
            <img src='{book.image_link}' alt="Book Cover" class='book h-[254px] w-[165px]'>
        {:else}
            <div>
                <div class='book h-[254px] w-[165px] bg-[--secondary--accent-2] flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="49.18" height="56.19" viewBox="0 0 25.192 28.788">
                        <path data-name="Path 4" d="M25.182,20.15V1.444A1.324,1.324,0,0,0,23.744,0H5.4A5.3,5.3,0,0,0,0,5.2c0,.067,0,.135,0,.2V23.388a5.3,5.3,0,0,0,5.2,5.4q.1,0,.2,0H23.744a1.418,1.418,0,0,0,1.439-1.4c0-.014,0-.028,0-.042v-.9a1.554,1.554,0,0,0-.54-1.079,15.921,15.921,0,0,1,0-4.137,1.088,1.088,0,0,0,.54-1.08ZM8.1,9.448A.45.45,0,0,1,8.544,9H11.7V5.85a.45.45,0,0,1,.45-.45h2.7a.45.45,0,0,1,.45.45V9h3.148a.45.45,0,0,1,.45.45v2.7a.45.45,0,0,1-.45.45H15.294v3.148a.45.45,0,0,1-.45.45h-2.7a.45.45,0,0,1-.45-.45V12.6H8.544a.45.45,0,0,1-.45-.45Zm15,15.739H5.4a1.7,1.7,0,0,1-1.8-1.8,1.8,1.8,0,0,1,1.8-1.8H23.1Z"
                              transform="translate(0.001 0.001)"/>
                    </svg>
                </div>
            </div>
        {/if}
        <div class='flex flex-col justify-between h-full w-full ml-5'>
            <div>
                <p class='text-[25px] trunc font-black'>{book.title}</p>
                <p class="text-[18px] trunc">{book.author ? book.author : 'Unknown author'}</p>
                <p class="text-[14px]"><i>ISBN-13: {book.isbn_13 ? book.isbn_13 : 'N/A'}</i></p>
            </div>
            <div>
                <p class="mb-2">Pages: <strong class="font-semibold">{book.page_count}</strong></p>
                <div class="flex gap-6">

<!--                BOOKS READ-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.43" height="22.21" viewBox="0 0 19.433 22.207">
                        <path id="Path_5" data-name="Path 5" d="M132.01,19.568a12.282,12.282,0,0,1,0-3.191.839.839,0,0,0,.416-.833h0V1.114A1.022,1.022,0,0,0,131.316,0H117.164A4.087,4.087,0,0,0,113,4.011q0,.078,0,.156V18.041a4.087,4.087,0,0,0,4.008,4.164h14.308a1.094,1.094,0,0,0,1.11-1.078c0-.011,0-.022,0-.033V20.4a1.2,1.2,0,0,0-.416-.833M118.625,9.032h0l.685-.687a.484.484,0,0,1,.685,0h0l2.121,2.122,4.543-4.544a.485.485,0,0,1,.685,0h0l.685.686a.484.484,0,0,1,0,.685l-5.57,5.57a.485.485,0,0,1-.685,0h0l-3.148-3.148a.484.484,0,0,1,0-.685m12.19,10.4H117.164a1.311,1.311,0,0,1-1.388-1.388,1.388,1.388,0,0,1,1.388-1.388h13.651Z" transform="translate(-112.999 0.001)"/>
                    </svg>

<!--                TBR-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="23.01" height="22.01" viewBox="0 0 23.095 22.207">
                        <path id="Icon_ionic-ios-heart" data-name="Icon ionic-ios-heart" d="M20.252,3.938H20.2a6.317,6.317,0,0,0-5.274,2.887A6.317,6.317,0,0,0,9.648,3.938H9.593a6.277,6.277,0,0,0-6.218,6.273,13.514,13.514,0,0,0,2.654,7.367,46.505,46.505,0,0,0,8.894,8.566,46.505,46.505,0,0,0,8.894-8.566,13.514,13.514,0,0,0,2.654-7.367A6.277,6.277,0,0,0,20.252,3.938Z" transform="translate(-3.375 -3.938)"/>
                    </svg>

<!--                IN PROGRESS-->
                    <svg id="Group_4" data-name="Group 4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16.6" height="22.21" viewBox="0 0 16.598 22.207">
                        <defs>
                            <clipPath id="clip-path">
                                <rect id="Rectangle_11" data-name="Rectangle 11" width="16.598" height="22.207" fill="#fed9d9"/>
                            </clipPath>
                        </defs>
                        <g id="Group_3" data-name="Group 3" clip-path="url(#clip-path)">
                            <path id="Path_3" data-name="Path 3" d="M15.583,22.208H2.368a.375.375,0,0,0-.061-.023A2.9,2.9,0,0,1,0,19.267C.025,13.829.01,8.391.011,2.954a3.335,3.335,0,0,1,.02-.519A2.808,2.808,0,0,1,2.877.006Q5.9,0,8.922.006c.341,0,.342,0,.342.352q0,2.947,0,5.893a2.241,2.241,0,0,0,.013.346.313.313,0,0,0,.515.226,1.016,1.016,0,0,0,.293-.343c.357-.569.711-1.139,1.068-1.708.145-.231.159-.23.307.007q.524.835,1.046,1.671a1.293,1.293,0,0,0,.282.354.317.317,0,0,0,.535-.148.948.948,0,0,0,.034-.343c0-2.008,0-4.015,0-6.023,0-.211.054-.294.279-.288.534.015,1.069,0,1.6.005A1.288,1.288,0,0,1,16.6,1.367q0,9.749,0,19.5a1.409,1.409,0,0,1-.033.365,1.358,1.358,0,0,1-.98.977M8.932,21.118h6.044c.087,0,.173,0,.26,0a.222.222,0,0,0,.256-.249c0-.188,0-.376,0-.563,0-.331,0-.333-.342-.333H3.628c-.087,0-.174,0-.26,0A.546.546,0,0,1,3.232,18.9a1.31,1.31,0,0,1,.429-.042l11.4,0c.072,0,.145,0,.217,0,.155.01.228-.057.224-.215s0-.332,0-.5c0-.409-.022-.43-.427-.43H3c-.087,0-.173,0-.26,0a1.7,1.7,0,0,0-1.408,2.516,1.683,1.683,0,0,0,1.6.887c2-.006,4,0,6,0" transform="translate(0 -0.001)"/>
                        </g>
                    </svg>

<!--                WISHLIST-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="21.39" height="22.35" viewBox="0 0 22.346 21.388">
                        <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M11.416.743,8.688,6.273l-6.1.89a1.337,1.337,0,0,0-.739,2.281l4.415,4.3L5.217,19.823a1.336,1.336,0,0,0,1.938,1.408l5.459-2.87,5.459,2.87a1.337,1.337,0,0,0,1.938-1.408l-1.044-6.077,4.415-4.3a1.337,1.337,0,0,0-.739-2.281l-6.1-.89L13.813.743a1.338,1.338,0,0,0-2.4,0Z" transform="translate(-1.441 0.001)"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    .card {
      box-shadow: 0 4px 10px #00000029;
      border-radius: 10px;
      color: var(--secondary);

      .trunc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .book {
        border-radius: 6px;

        svg {
          fill: var(--secondary--accent-1);
        }
      }

      svg:not(.book svg) {
        fill: var(--primary-accent-1);
        cursor: pointer;
      }
      svg:not(.book svg):hover {
        fill: var(--primary);
      }
    }
</style>