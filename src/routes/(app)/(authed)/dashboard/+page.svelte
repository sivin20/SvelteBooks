
<script lang="ts">
    /** @type {import('.$types').PageData} */
    export let data;

    // function customIn(node, params) {
    //     return {
    //         duration: params.duration,
    //         css: (t, u) => {
    //             const line = linear(u);
    //             return `
    //                 transform-origin: center right;
    //                 transform: rotatey(${line * 180}deg);
    //             `
    //         }
    //     }
    // }
    // function customOut(node, params) {
    //     return {
    //         duration: params.duration,
    //         css: (t, u) => {
    //             const line = linear(u);
    //             return `
    //                 transform-origin: center left;
    //                 transform: rotatey(${line * 180}deg);
    //             `
    //         }
    //     }
    // }
</script>

<main class="bg-[--accents-1] rounded-lg p-4">
    <p>Welcome, {data.session.user.user_metadata.first_name}</p>
    <a href="/dashboard/library"><p><u>Go to your libraries</u></p></a>
    <div class="mt-5">
        <form action="/logout" method="POST">
            <button type="submit">Logout</button>
        </form>
    </div>
</main>