import type {Book} from "../models/Book";
import {supabase} from "../supabaseClient";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY


export namespace BookService {

    export async function searchBook(searchParam: string): Promise<Book[]> {
        console.log("Searching for books..")
        searchParam = searchParam.replace(/ /g, '+');
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchParam}&langRestrict=en&projection=full&printType=books&key=${API_KEY}`);
        const responseData =  await res.json();
        const bookList: Book[] = []
        console.log("response", responseData.items)
        for (let book of responseData.items) {
            console.log("Booklist", bookList.length)
            bookList.push(
                {
                    id: book.id,
                    title: book.volumeInfo.title ? book.volumeInfo.title : '',
                    authors: book.volumeInfo.authors ? book.volumeInfo.authors : '',
                    image_link: !!book.volumeInfo.imageLinks ?.thumbnail ? book.volumeInfo.imageLinks?.thumbnail : null,
                    page_count: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 0,
                    isbn_13: book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0]?.identifier : '',
                    description: book.volumeInfo.description ? book.volumeInfo.description : ''
                }
            )}
        if(res.ok) {
            console.log("booklist", bookList)
            return bookList
        } else {
            throw new Error("Error here")
        }
    }

    export async function addBook(book: any, library: string) {
        const { data, error: err } = await supabase.from('books').insert({
            ...book,
            library_id: library
        })

        if (err) {
            return err
        }
    }

    export async function getBooksFromLibrary(libraryId: string) {
        const res  = await supabase.from("books").select().eq('library_id', libraryId);
        const data = res.data
        if(res.status === 200) {
            return data
        } else {
            throw new Error("Error here")
        }
    }
}