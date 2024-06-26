import { Dayjs } from 'dayjs'
export type ProductStatuses = 'hidden' | 'published'

export interface Product {
    id: string
    name: string
    price: number
    image?: string
    category: string
    createdAt: string
    description: string
    status: ProductStatuses
    releaseDate: string | Dayjs
}
