import type { Product } from "@/types/product"
import type { Category } from "@/types/category"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface GlobalStateType {
    products: Product[]
    categories: Category[]
    isProductModalVisible: boolean
}

const initialState: GlobalStateType = {
    products: [],
    categories: [],
    isProductModalVisible: false
}

export const globalState = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload
        },

        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload
        },

        setProductModalVisibility(state, action: PayloadAction<boolean>) {
            state.isProductModalVisible = action.payload
        }
    }
})

export const { setCategories, setProducts, setProductModalVisibility } = globalState.actions

export default globalState.reducer