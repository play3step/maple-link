import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

const Character = () => {
  const { loadUserInfo } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadUserInfo()
        console.log(data)
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }
    fetchData()
  }, [])
  return <div>Charter</div>
}

export default Character
