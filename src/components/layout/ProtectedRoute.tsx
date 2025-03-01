import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isloggedIn } = useAuthStore()
  if (!isloggedIn) {
    return <Navigate to="/" />
  }
  return children
}
