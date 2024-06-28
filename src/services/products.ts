import { $api } from '@/api'
import type { AxiosResponse } from 'axios'
import type { Product } from '@/types/product'
import type { NewProductPayload, Primitive } from '@/types'

export const productsApi = {
    getProducts<T>(params?: Record<string, Primitive | object>): Promise<AxiosResponse<T>> {
        return $api.get('/products', { params })
    },

    getProductDetail(id: string): Promise<AxiosResponse<Product>> {
        return $api.get(`/products/${id}`)
    },

    createProduct(body: NewProductPayload): Promise<AxiosResponse<Product>> {
        return $api.post('/products', body)
    },

    updateProduct(id: string, payload: NewProductPayload): Promise<AxiosResponse<Product>> {
        return $api.put(`/products/${id}`, payload)
    },

    deleteProduct(id: string) {
        return $api.delete(`/products/${id}`)
    }
}