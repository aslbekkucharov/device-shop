import { AxiosResponse } from 'axios'

import { $api } from '@/api'
import { Category } from '@/types/category'

export const categoryApi = {
    getCategories(): Promise<AxiosResponse<Category[]>> {
        return $api.get('/categories')
    }
}
