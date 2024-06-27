import { $api } from '@/api'
import { NewProductPayload } from '@/types'
import { Product } from '@/types/product'
import { AxiosResponse } from 'axios'

export const productsApi = {
    getProducts<T>(params?: Record<string, any>): Promise<AxiosResponse<T>> {
        return $api.get('/products', { params })
    },

    getProductDetail(id: number): Promise<AxiosResponse<Product>> {
        return $api.get(`/products/${id}`)
    },

    createProduct(body: NewProductPayload): Promise<AxiosResponse<Product>> {
        return $api.post('/products', body)
    },

    updateProduct(id: number, payload: NewProductPayload): Promise<AxiosResponse<Product>> {
        return $api.put(`/products/${id}`, payload)
    }
}