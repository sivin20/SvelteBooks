import type {Book} from "../models/Book";
import {supabase} from "../supabaseClient";
import {booksReadStore, tbrStore, inProgressStore, wishlistStore} from "$lib/stores/bookStore";
import type {BookComposite} from "$lib/models/BookComposite";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY


export namespace BookService {

    export async function searchBook(query: string): Promise<[Book[], number]> {
        console.log("Searching for books..")
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?${query}&zoom=0&langRestrict=en&maxResults=12&projection=full&printType=books&key=${API_KEY}`);
        const response = await res.json()

        if(!res.ok){
            throw new Error(`${response.error.errors[0].message}`)
        } else {
            const responseData = response;
            const bookList: Book[] = []
            if(!!responseData.items) {
                for (let book of responseData.items) {
                    let img: string = ''
                    if(!!book.volumeInfo.imageLinks?.thumbnail) {
                        img = book.volumeInfo.imageLinks?.thumbnail.replace('http', 'https')
                        console.log(img)
                    }
                    bookList.push(
                        {
                            id: book.id,
                            title: book.volumeInfo.title ? book.volumeInfo.title : '',
                            author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : '',
                            image_link: img,
                            page_count: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 0,
                            isbn_13: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0]?.identifier : '',
                            description: book.volumeInfo.description ? book.volumeInfo.description : ''
                        }
                    )}
                return [bookList, responseData.totalItems]
            } else {
                throw new Error('No books found')
            }
        }
    }

    export async function addBook(book: Book, libraryId: string) {
        const { error: err } = await supabase.from('books').upsert({
            ...book,
            author: book.author
        }, {onConflict: 'id'})

        const { error: err2 } = await supabase.from('books_composite').upsert({
            id: `${libraryId}_${book.id}`,
            book_id: book.id,
            library_id: libraryId
        }, {onConflict: 'id'})

        if (err) {
            return err
        }

        if (err2) {
            return err2
        }
    }

    export function setBookStore(list: BookComposite[], libraryName: string): void {
        switch (libraryName) {
            case "BOOKS READ":
                booksReadStore.set(list)
                console.log("SET STORE BOOKS READ", list)
                break;
            case "TBR":
                console.log("SET STORE TBR", list)
                tbrStore.set(list)
                break;
            case "IN PROGRESS":
                console.log("SET STORE INPROGS", list)
                inProgressStore.set(list)
                break;
            case "WISHLIST":
                console.log("SET STORE WIHSLIST", list)
                wishlistStore.set(list)
                break;
        }
    }

    export async function deleteBook(book:any) {
        const { error: err } = await supabase.from('books').delete().eq('id', book.id)
        console.log("res", err)
        if(err) {
            return err
        }
    }

    export async function removeBookFromLibrary(book_id: string, library_id: string) {
        const { error: err } = await supabase.from('books_composite').delete().eq('id', `${library_id}_${book_id}`)
        console.log("res", err)
        if(err) {
            return err
        }
    }

    export async function deleteAllBooks(libraryId: string) {
        const res = await supabase.from('books').delete().eq('library_id', libraryId);
        if(res.status === 204) {
            return "successful"
        } else {
            return new Error("Error here")
        }
    }

    export async function getBooksFromLibrary(libraryId: string) {
        const res =  await supabase.rpc('get_books_from_library', {lib_id: libraryId})
        const data = res.data
        if(res.status === 200) {
            return data as Book[]
        } else {
            throw new Error("Error here")
        }
    }
}