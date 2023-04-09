
export interface Book {
    title: string,
    authors: string[],
    imagelinks?: {
        thumbnail: string
    }
    pageCount: number,
}