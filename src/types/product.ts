enum ProductStatuses {
    hidden = "hidden",
    published = "published"
}

export interface Product {
    id: string
    name: string
    price: number
    category: string
    createdAt: string
    description: string
    releaseDate: string
    status: ProductStatuses
}