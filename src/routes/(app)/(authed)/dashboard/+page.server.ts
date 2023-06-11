import {redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";
import {supabase} from "$lib/supabaseClient";
import {booksReadStore, tbrStore, inProgressStore, wishlistStore } from "$lib/stores/bookStore";

export const load: PageServerLoad = async ({url, locals: { getSession }}) => {
    const session = await getSession();

    // if the user is already logged in return them to the dashboard page
    if (!session) {
        throw redirect(303, '/login');
    }
}