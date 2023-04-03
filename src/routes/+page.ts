
/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {

    const fetchPosts = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        return await res.json();
    }

    return {
        posts: fetchPosts()
    };
}