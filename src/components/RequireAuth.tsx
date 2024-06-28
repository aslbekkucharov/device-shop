import { type PropsWithChildren, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

export default function RequireAuth({ children }: PropsWithChildren) {
    const location = useLocation()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true })
        }
    }, [isAuthenticated, location, navigate])

    return isAuthenticated ? children : null
}
