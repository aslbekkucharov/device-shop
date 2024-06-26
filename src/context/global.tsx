import { $api } from "@/api"
import type { AxiosResponse } from "axios"
import type { Category } from "@/types/category"
import { type PropsWithChildren, createContext, useEffect, useMemo, useState } from "react"

interface GlobalContextType {
    categories: Category[]
    isProductModalVisible: boolean
    setIsProductModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContextType>({
    categories: [],
    isProductModalVisible: false,
    setIsProductModalVisible: () => { }
})

export function GlobalProvider({ children }: PropsWithChildren) {

    const [categories, setCategories] = useState<Category[]>([])
    const [isProductModalVisible, setIsProductModalVisible] = useState<boolean>(false)

    const value = useMemo(() => ({

        categories,
        isProductModalVisible,
        setIsProductModalVisible

    }), [isProductModalVisible, categories])

    useEffect(() => {
        $api.get('/categories').then((res: AxiosResponse<Category[]>) => {
            setCategories(res.data)
        })
    }, [])

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}
