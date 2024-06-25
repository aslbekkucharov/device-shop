import { api } from "@/api"
import type { AxiosResponse } from "axios"
import type { Category } from "@/types/category"
import { type PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react"

interface GlobalContextType {
    categories: Category[]
    isProductAddModalVisible: boolean
    setIsProductAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalContext = createContext<GlobalContextType>({
    categories: [],
    isProductAddModalVisible: false,
    setIsProductAddModalVisible: () => { }
})

export function GlobalProvider({ children }: PropsWithChildren) {

    const [categories, setCategories] = useState<Category[]>([])
    const [isProductAddModalVisible, setIsProductAddModalVisible] = useState(false)

    const value = useMemo(() => ({

        categories,
        isProductAddModalVisible,
        setIsProductAddModalVisible

    }), [isProductAddModalVisible, categories])

    useEffect(() => {
        api.get('/categories').then((res: AxiosResponse<Category[]>) => {
            setCategories(res.data)
        })
    }, [])

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export const useGlobal = () => {
    return useContext(GlobalContext)
}