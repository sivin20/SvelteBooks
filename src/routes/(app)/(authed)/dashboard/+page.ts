import type {PageLoad} from "./$types";
import {booksReadStore, inProgressStore, tbrStore, wishlistStore} from "$lib/stores/bookStore";
import type {PostgrestSingleResponse} from "@supabase/supabase-js";

export const load: PageLoad = async ({parent}) => {
    const { supabase, session } = await parent()
    console.log("ses", session)
    if(!!session) {
        const res: PostgrestSingleResponse<any> =  await supabase.rpc('get_all_libraries_and_books_for_user', {owner_uid: session.user.id})
        //: TODO: Remove usage of temp lists and just update the store directly for each entry
        let tempBooksRead: any[] = []
        let tempTBR: any[] = []
        let tempInProgress: any[] = []
        let tempWishlist: any[] = []
        for(let book of res.data) {
            console.log("book", book)
            if (book.library_name === 'BOOKS READ' && !!book.book_id) {
                tempBooksRead.push(book)
            }
            if (book.library_name === 'TBR' && !!book.book_id) {
                tempTBR.push(book)
            }
            if (book.library_name === 'IN PROGRESS' && !!book.book_id) {
                tempInProgress.push(book)
            }
            if (book.library_name === 'WISHLIST' && !!book.book_id) {
                tempWishlist.push(book)
            }
        }
        console.log("books_read", tempBooksRead)
        booksReadStore.set(tempBooksRead)
        tbrStore.set(tempTBR)
        inProgressStore.set(tempInProgress)
        wishlistStore.set(tempWishlist)
    }
}