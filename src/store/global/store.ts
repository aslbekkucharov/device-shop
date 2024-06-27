import type { Product } from "@/types/product"
import type { Category } from "@/types/category"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { NewProductPayload } from "@/types"

interface GlobalStateType {
    products: Product[]
    categories: Category[]
    editingProduct: NewProductPayload
    isProductEditing: boolean
    isProductModalVisible: boolean
}

const initialState: GlobalStateType = {
    products: [],
    categories: [],
    isProductEditing: false,
    isProductModalVisible: false,
    editingProduct: {} as NewProductPayload
}

export const globalState = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload
        },

        setEditingProduct(state, action: PayloadAction<NewProductPayload>) {
            state.editingProduct = action.payload
        },

        setIsProductEditing(state, action: PayloadAction<boolean>) {
            state.isProductEditing = action.payload
        },

        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload
        },

        setProductModalVisibility(state, action: PayloadAction<boolean>) {
            state.isProductModalVisible = action.payload
        }
    }
})

export const { setCategories, setProducts, setProductModalVisibility, setEditingProduct, setIsProductEditing } = globalState.actions

export default globalState.reducer