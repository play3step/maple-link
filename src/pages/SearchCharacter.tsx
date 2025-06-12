import { searchCharacterOcid } from '../apis/character/characterController'
import { CharacterPage } from '../components/character/CharacterPage'
import { useState } from 'react'
import { useUserStore } from '../store/userStore'

export const SearchCharacter = () => {
  const [characterName, setCharacterName] = useState('')
  const { setUserInfo } = useUserStore()

  const searchCharacterHandler = async () => {
    if (characterName.trim() === '') {
      alert('캐릭터 이름을 입력해주세요.')
      return
    }

    const { ocid } = await searchCharacterOcid(characterName.trim())

    if (!ocid) {
      alert('캐릭터를 찾을 수 없습니다.')
      return
    }

    setUserInfo({
      id: 0,
      firebaseId: '1',
      name: characterName.trim(),
      email: 'play3step@gmail.com',
      ocid: ocid
    })
  }
  return (
    <CharacterPage
      type="search"
      characterName={characterName}
      setCharacterName={setCharacterName}
      searchCharacterHandler={searchCharacterHandler}
    />
  )
}
