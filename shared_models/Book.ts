
export interface Book {
    title: string,
    authors: string[],
    categories: string[],
    imagelinks?: {
        thumbnail: string
    }
    pageCount: number,
}