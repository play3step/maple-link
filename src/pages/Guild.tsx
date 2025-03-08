import { useEffect, useState } from 'react'
import Button from '../components/common/Button'
import { CreateGuildModal } from '../components/modal/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'
import { fetchGuildMember } from '../apis/Guild/guildController'
import { CharacterCard } from '../components/Guild/CharacterCard'
import { GuildInfo } from '../types/guild'

const Guild = () => {
  const { activeModal, openModal } = useModalStore()

  const [list, setList] = useState<GuildInfo>()

  const showModal = (name: ModalType) => {
    openModal(name)
  }
  useEffect(() => {
    fetchGuildMember(1).then(v => {
      setList(v)
      console.log(v)
    })
  }, [])

  return (
    <>
      <Button
        size="small"
        scheme="solid"
        onClick={() => showModal('createGuild')}>
        길드 생성
      </Button>
      <CharacterCard
        imagePath={list?.memberDetailResponse[0].imagePath}
        job={list?.memberDetailResponse[0].job}
        level={list?.memberDetailResponse[0].level}
        name={list?.memberDetailResponse[0].name}
      />
      {activeModal === 'createGuild' && <CreateGuildModal />}
    </>
  )
}

export default Guild
