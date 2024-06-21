export interface PageableResponse<T> {
    first: number
    prev: string | null
    next: string | null
    last: number
    pages: number
    items: number
    data: Array<T>
}

export interface Pagination {
    total: number
    perPage?: number
    current?: number
}