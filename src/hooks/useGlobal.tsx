import { useContext } from "react"
import { GlobalContext } from "@/context/global"

export const useGlobal = () => {
    return useContext(GlobalContext)
}