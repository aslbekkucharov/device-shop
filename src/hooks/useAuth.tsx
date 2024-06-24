import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { PropsWithChildren, createContext, useContext, useMemo } from "react"

interface AuthContextType {
    login: () => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
    login() { },
    logout() { },
    isAuthenticated: false
})

export function AuthProvider({ children }: PropsWithChildren) {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isLogged", false)

    function login() {
        setIsAuthenticated(true)
        navigate("/")
    }

    function logout() {
        setIsAuthenticated(false)
        navigate("/", { replace: true })
    }

    const value = useMemo(() => ({
        login,
        logout,
        isAuthenticated
    }), [isAuthenticated])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}