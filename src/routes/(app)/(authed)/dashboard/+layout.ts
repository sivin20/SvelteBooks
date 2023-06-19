import {booksReadStore, inProgressStore, tbrStore, wishlistStore} from "$lib/stores/bookStore";
import type {PostgrestSingleResponse} from "@supabase/supabase-js";
import type {LayoutLoad} from "../../../../../.svelte-kit/types/src/routes/$types";
import type {BookComposite} from "$lib/models/BookComposite";

export const load: LayoutLoad = async ({parent}) => {

    const { supabase, session } = await parent()

    if(!!session) {
        const res: PostgrestSingleResponse<any> =  await supabase.rpc('get_all_libraries_and_books_for_user', {owner_uid: session.user.id})
        //: TODO: Remove usage of temp lists and just update the store directly for each entry
        let tempBooksRead: BookComposite[] = []
        let tempTBR: BookComposite[] = []
        let tempInProgress: BookComposite[] = []
        let tempWishlist: BookComposite[] = []
        for(let bookComposite of res.data) {
            if (bookComposite.library_name === 'BOOKS READ' && !!bookComposite.book_id) {
                tempBooksRead.push(bookComposite)
            }
            if (bookComposite.library_name === 'TBR' && !!bookComposite.book_id) {
                tempTBR.push(bookComposite)
            }
            if (bookComposite.library_name === 'IN PROGRESS' && !!bookComposite.book_id) {
                tempInProgress.push(bookComposite)
            }
            if (bookComposite.library_name === 'WISHLIST' && !!bookComposite.book_id) {
                tempWishlist.push(bookComposite)
            }
        }
        booksReadStore.set(tempBooksRead)
        tbrStore.set(tempTBR)
        inProgressStore.set(tempInProgress)
        wishlistStore.set(tempWishlist)
    }
}