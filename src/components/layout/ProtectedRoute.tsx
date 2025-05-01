import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useUserStore } from '../../store/userStore'
import { useAuth } from '../../hooks/useAuth'
interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuthStore()
  const { userInfo, clearUserInfo } = useUserStore()
  const location = useLocation()
  const { userLogout } = useAuth()

  if (!isLoggedIn && location.pathname === '/') {
    clearUserInfo()
    userLogout()
    return <Navigate to="/" />
  }

  if (!userInfo?.nexonApiKey && location.pathname !== '/signup') {
    return <Navigate to="/signup" />
  }

  if (userInfo?.nexonApiKey && location.pathname === '/signup') {
    return <Navigate to="/character" />
  }

  return children
}
