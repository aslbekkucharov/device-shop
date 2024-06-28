import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { PropsWithChildren, createContext, useCallback, useMemo } from 'react'

interface AuthContextType {
    login: () => void
    logout: () => void
    isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
    login() {},
    logout() {},
    isAuthenticated: false
})

export function AuthProvider({ children }: PropsWithChildren) {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isLogged', false)

    const login = useCallback(() => {
        setIsAuthenticated(true)
        navigate('/')
    }, [navigate, setIsAuthenticated])

    const logout = useCallback(() => {
        setIsAuthenticated(false)
        navigate('/', { replace: true })
    }, [navigate, setIsAuthenticated])

    const value = useMemo(
        () => ({
            login,
            logout,
            isAuthenticated
        }),
        [isAuthenticated, login, logout]
    )

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}
