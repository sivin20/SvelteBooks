import type {Book} from "../models/Book";
import {supabase} from "../supabaseClient";

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
                        img = img.replace('zoom=1','zoom=2')
                        console.log(img)
                    }
                    bookList.push(
                        {
                            id: book.id,
                            title: book.volumeInfo.title ? book.volumeInfo.title : '',
                            author: book.volumeInfo.authors ? book.volumeInfo.authors : '',
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
        const { data, error: err } = await supabase.from('books').insert({
            ...book,
            library_id: libraryId,
            author: book.author[0]
        })

        if (err) {
            return err
        }
    }

    export async function deleteBook(book:any) {
        const res = await supabase.from('books').delete().eq('id', book.id)
        if(res.status === 204) {
            return "successful"
        } else {
            return new Error("Error here")
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
        const res  = await supabase.from("books").select().eq('library_id', libraryId);
        const data = res.data
        if(res.status === 200) {
            return data as Book[]
        } else {
            throw new Error("Error here")
        }
    }
}