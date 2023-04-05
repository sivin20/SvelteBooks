import type {PageLoad} from "./$types";

export const load: PageLoad = async ({fetch}) => {

    const fetchPosts = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        return await res.json();
    }

    return {
        posts: fetchPosts()
    };
}