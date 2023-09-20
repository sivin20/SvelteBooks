<script lang="ts">
    import {onMount} from "svelte";
    import Fa from "svelte-fa";
    import {faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
    export let getMostPopularAuthors, getLongestBooks, getShortestBooks
    let contentBox;

    let slider: Element
    let slides
    let button

    onMount(() => {
        slides = slider.querySelectorAll(".item");
        button = slider.querySelectorAll(".button");
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
        }
    })

    let current = 0;
    let prev = 4;
    let next = 1;

    const gotoPrev = () => {
        current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1)
        console.log("slides.lentg", slides.length)
    };

    const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

    const gotoNum = number => {
        current = number;
        prev = current - 1;
        next = current + 1;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].classList.remove("prev");
            slides[i].classList.remove("next");
        }

        if (next == 5) {
            next = 0;
        }

        if (prev == -1) {
            prev = 4;
        }

        slides[current].classList.add("active");
        slides[prev].classList.add("prev");
        slides[next].classList.add("next");
    }
</script>

<div bind:this={contentBox}>
    <p class="text-[25px] mb-2"><strong>Explore Book Stats</strong></p>
    <div class="relative h-[400px]">
        <div class="items h-fit" bind:this={slider}>
            <div class="item active">
                <div class=" w-[400px] flex flex-col self-center">
                    <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                        <p class="text-white">Longest Books</p>
                    </div>
                    <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                        {#each getLongestBooks as book, i}
                            <li class="flex items-center">
                                <div class="flex flex-row justify-between w-full">
                                    <p class="overflow-hidden text-ellipsis whitespace-nowrap">{book.title}</p>
                                    <p>({book.page_count})</p>
                                </div>
                            </li>
                        {/each}
                    </ol>
                </div>
            </div>
            <div class="item next">
                <div class=" w-[400px] flex flex-col self-start">
                    <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                        <p class="text-white">Shortest Books</p>
                    </div>
                    <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                        {#each getShortestBooks as book, i}
                            <li class="flex items-center">
                                <div class="flex flex-row justify-between w-full">
                                    <p class="overflow-hidden text-ellipsis whitespace-nowrap">{book.title}</p>
                                    <p>({book.page_count})</p>
                                </div>
                            </li>
                        {/each}
                    </ol>
                </div>
            </div>
            <div class="item">
                <img src="https://books.google.com/books/content?id=ikeKlorsBCYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api">
            </div>
            <div class="item">
                <img src="https://books.google.com/books/content?id=ikeKlorsBCYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api">
            </div>
            <div class="item prev">
                <div class="w-[400px] flex flex-col self-end">
                    <div class="w-full rounded-t-xl bg-[--primary] p-4 text-center">
                        <p class="text-white">Most Read Authors</p>
                    </div>
                    <ol type="1" class="list-inside list-decimal p-4 border-b-2 border-x-2 border-[--input-field-color] rounded-b-xl">
                        {#each getMostPopularAuthors as authorFrequency, i}
                            <li class="flex items-center">
                                <div class="flex flex-row justify-between w-full">
                                    <p class="overflow-hidden text-ellipsis whitespace-nowrap">{authorFrequency.author}</p>
                                    <p>({authorFrequency.count})</p>
                                </div>
                            </li>
                        {/each}
                    </ol>
                </div>
            </div>
            <div class="button-container">
                <div class="button"><Fa icon="{faArrowLeft}"/></div>
                <div class="button"><Fa icon="{faArrowRight}"/></div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
  .items {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .items .item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: fit-content;
    overflow: hidden;
    transition: all 300ms ease-in-out;
    z-index: -1;
    opacity: 0;
  }

  .item div {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item img {
    width: 400px;
    height: 300px;
    object-fit: cover;
  }

  .item.active {
    opacity: 1;
    z-index: 99;
    box-shadow: 0px 0px 105px -35px rgba(0, 0, 0, 0.75);
  }

  .item.prev {
    z-index: 2;
    opacity: 0.25;
    transform: translate(-125%, -50%);
  }

  .item.next {
    z-index: 2;
    opacity: 0.25;
    transform: translate(25%, -50%);
  }

  .items .button-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    z-index: 100;
  }

  .button-container .button {
    color: #fff;
    font-size: 32px;
    cursor: pointer;
    position: relative;
    opacity: 0.75;
    transition: all 300ms ease-in-out;
  }

  .button-container .button:hover {
    opacity: 1;
  }

  .button-container .button:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 50%;
    z-index: -99;
  }

  .button-container .button:nth-child(1) {
    float: left;
  }

  .button-container .button:nth-child(2) {
    float: right;
  }
</style>