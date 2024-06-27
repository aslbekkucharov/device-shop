import { Dayjs } from 'dayjs'
import { ProductStatuses } from "./product"

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

export interface LoginPayload {
    username: string
    password: string
}

export interface NewProductPayload {
    name: string
    price: number
    image?: string
    category: string
    createdAt: string
    description: string
    status: ProductStatuses
    releaseDate: string | Dayjs
}

export interface Status {
    label: string
    value: string
}

export interface User {
    username: string
    password: string
}