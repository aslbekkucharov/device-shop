import { Dayjs } from 'dayjs'
import { ProductStatuses } from "./product"

export type Primitive = boolean | number | string | symbol | null | undefined

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

export interface UploadFiltType {
    filename: string
    name: string
    mime: string
    extension: string
    url: string
}

export interface UploadResponseType {
    data: {
        id: string
        title: string
        url_viewer: string
        url: string
        display_url: string
        width: number
        height: number
        size: number
        time: number
        expiration: number
        image: UploadFiltType
        thumb: UploadFiltType
        medium: UploadFiltType
        delete_url: string
    },
    success: boolean
    status: number
}