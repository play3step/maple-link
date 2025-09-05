import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useAuthStore } from '../store/authStore'
import { authService } from '../firebase'
import { fetchUserInfo } from '../apis/user/userController'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ErrorResponse } from '../types'
import { useShallow } from 'zustand/react/shallow'
import { useState } from 'react'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [storeLogin, storeLogout] = useAuthStore(
    useShallow(s => [s.storeLogin, s.storeLogout])
  )
  const nav = useNavigate()

  const userLogin = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(authService, provider)
      const token = await result.user.getIdToken()

      if (!token || !result.user.uid) {
        throw new Error('로그인에 필요한 정보를 가져올 수 없습니다.')
      }

      storeLogin(token, result.user.uid, 'member')
      const userInfo = await fetchUserInfo(result.user.uid)

      if (!userInfo) {
        throw new Error('사용자 정보를 가져올 수 없습니다.')
      }
      return userInfo
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        alert(errorData.data.message)
      } else {
        // Firebase 로그인 에러나 기타 에러 처리
        console.error('로그인 에러:', error)
        alert('로그인 중 오류가 발생했습니다.')
      }
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const userLogout = async () => {
    try {
      setIsLoading(true)
      await signOut(authService)
      storeLogout()
      nav('/')
    } catch (error) {
      console.error('로그아웃 에러:', error)
      alert('로그아웃 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    userLogin,
    userLogout,
    isLoading
  }
}
