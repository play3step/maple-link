import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useUserStore } from '../../store/userStore'
import { useAuth } from '../../hooks/useAuth'
interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, userType } = useAuthStore()
  const { userInfo, clearUserInfo } = useUserStore()
  const location = useLocation()
  const { userLogout } = useAuth()

  const path = location.pathname

  // 1. 로그인도 안 됐는데 루트가 아닌 경로 접근 시
  if (!isLoggedIn && path !== '/') {
    clearUserInfo()
    userLogout()
    return <Navigate to="/" />
  }

  // 2. 가입 유저가 넥슨 API 키가 없고, 회원가입 페이지가 아닐 때 → signup으로 이동
  if (userType === 'member' && !userInfo?.nexonApiKey && path !== '/signup') {
    return <Navigate to="/signup" />
  }

  // 3. 가입 유저가 API 키가 있을경우  → character로 이동
  if (userType === 'member' && userInfo?.nexonApiKey && path === '/signup') {
    return <Navigate to="/character" />
  }

  // 4. 로그인 안 한 상태에서 조작 접근 시 → 홈으로
  if (!isLoggedIn && path === '/signup') {
    return <Navigate to="/" />
  }

  return children
}
