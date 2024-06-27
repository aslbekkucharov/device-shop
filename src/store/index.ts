import { configureStore } from "@reduxjs/toolkit"
import globalReducers from '@/store/global/store'

export const store = configureStore({
    reducer: {
        global: globalReducers
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>