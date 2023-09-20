import {redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";
import {supabase} from "$lib/supabaseClient";
import {BookService} from "$lib/services/book.service";
import type {Library} from "$lib/models/Library";
import type {Book} from "$lib/models/Book";

export const load: PageServerLoad = async ({url, locals: { getSession }}) => {
    const session = await getSession();

    // if the user is already logged in return them to the dashboard page
    if (!session) {
        throw redirect(303, '/login');
    }

    const libData = await supabase.from('libraries').select('name, id').eq('owner_id', session.user.id)
    const libraries: Library[] | null = libData.data

    let booksRead: Book[] = []
    let tbrs: Book [] = []
    let inProgress: Book[] = []
    if (libraries) {
        booksRead = await BookService.getBooksFromLibrary(libraries[0].id)
        tbrs = await BookService.getBooksFromLibrary(libraries[1].id, 4)
        inProgress = await BookService.getBooksFromLibrary(libraries[2].id, 2)
    }

    return {
        booksRead: booksRead,
        tbrs: tbrs,
        inProgress: inProgress
    }
}