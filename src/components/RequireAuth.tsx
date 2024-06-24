import { PropsWithChildren, useEffect } from "react"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"

import { useAuth } from "@/hooks/useAuth"

export default function RequireAuth({ children }: PropsWithChildren) {

    const location = useLocation()
    const navigate = useNavigate()
    const navigation = useNavigation()
    const { isAuthenticated } = useAuth()

    useEffect(() => {

        if (!isAuthenticated) {
            navigate('/login', { replace: true })
        }

    }, [isAuthenticated, location])


    return isAuthenticated ? children : null
}