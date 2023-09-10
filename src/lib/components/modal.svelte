<script>
    import {createEventDispatcher} from "svelte";

    export let showModal; // boolean
    import Fa from "svelte-fa";
    import { faXmark } from '@fortawesome/free-solid-svg-icons'

    const dispatch = createEventDispatcher()

    let dialog; // HTMLDialogElement

    function closeDialog() {
        showModal = false
        dispatch("close", {});
        dialog.close()
    }

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
        bind:this={dialog}
        on:close={() => closeDialog()}
        on:click|self={() => closeDialog()}
>
    <div class="p-6 w-[500px]" on:click|stopPropagation>
        <div class="flex items-center justify-center mb-4">
            <div class="flex-auto ">
                <slot name="header"/>
            </div>
            <button class="flex text-2xl text-right" autofocus on:click={() => closeDialog()}><Fa icon="{faXmark}"/></button>
        </div>
        <hr/>
        <div class="">
            <div class="my-4">
                <slot />
            </div>
            <hr/>
            <div class="flex items-center justify-between pt-4">
                <button class="cancel-button" on:click|self={() => closeDialog()}>No</button>
                <slot name="yes-button"></slot>
            </div>
        </div>
    </div>
</dialog>

<style>
    dialog {
        max-width: 32rem;
        border-radius: 1rem;
        padding: 0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
