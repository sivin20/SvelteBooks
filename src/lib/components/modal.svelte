<script>
    export let showModal; // boolean
    import Fa from "svelte-fa";
    import { faXmark } from '@fortawesome/free-solid-svg-icons'

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
        bind:this={dialog}
        on:close={() => (showModal = false)}
        on:click|self={() => dialog.close()}
>
    <div class="p-4 w-[350px]" on:click|stopPropagation>
        <div class="flex items-center justify-center">
            <div class="flex-auto ">
                <slot name="header"/>
            </div>
            <button class="flex text-2xl text-right" autofocus on:click={() => dialog.close()}><Fa icon="{faXmark}"/></button>
        </div>
        <hr />
        <slot />
        <div class="flex items-center justify-center pt-4">
            <slot name="yes-button"></slot>
            <button class="small-primary-button ml-2" on:click|self={() => dialog.close()}>No</button>
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
