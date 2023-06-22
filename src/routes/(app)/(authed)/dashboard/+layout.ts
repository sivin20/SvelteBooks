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
            if (bookComposite.library_name === 'BOOKS READ') {
                tempBooksRead.push(bookComposite)
            }
            if (bookComposite.library_name === 'TBR') {
                tempTBR.push(bookComposite)
            }
            if (bookComposite.library_name === 'IN PROGRESS') {
                tempInProgress.push(bookComposite)
            }
            if (bookComposite.library_name === 'WISHLIST') {
                tempWishlist.push(bookComposite)
                console.log("temp", tempWishlist)
            }
        }
        booksReadStore.set([...tempBooksRead, {book_id: '', library_name: tempBooksRead[0].library_name, library_id: tempBooksRead[0].library_id}])
        tbrStore.set([...tempTBR, {book_id: '', library_name: tempTBR[0].library_name, library_id: tempTBR[0].library_id}])
        inProgressStore.set([...tempInProgress, {book_id: '', library_name: tempInProgress[0].library_name, library_id: tempInProgress[0].library_id}])
        wishlistStore.set([...tempWishlist, {book_id: '', library_name: tempWishlist[0].library_name, library_id: tempWishlist[0].library_id}])
    }
}