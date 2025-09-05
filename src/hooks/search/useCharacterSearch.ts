import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useUserStore } from '../../store/userStore'
import { useNavigate } from 'react-router-dom'
import { searchCharacterOcid } from '../../apis/character/characterController'

export const useCharacterSearch = () => {
  const [characterName, setCharacterName] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const storeLogin = useAuthStore(s => s.storeLogin)
  const setCharacterOcid = useUserStore(s => s.setCharacterOcid)
  const nav = useNavigate()

  const searchCharacterHandler = async () => {
    if (characterName.trim() === '') {
      alert('캐릭터 이름을 입력해주세요.')
      return
    }

    setSearchLoading(true)
    try {
      const { ocid } = await searchCharacterOcid(characterName.trim())

      if (!ocid) {
        alert('캐릭터를 찾을 수 없습니다.')
        return
      }
      await storeLogin('', '', 'search')
      setCharacterOcid(ocid)
      nav('/searchCharacter')
    } catch {
      alert('캐릭터 검색에 실패했습니다.')
    } finally {
      setSearchLoading(false)
    }
  }

  return {
    searchCharacterHandler,
    characterName,
    setCharacterName,
    searchLoading
  }
}
