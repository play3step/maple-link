import { useEffect } from 'react'
import Button from '../components/common/Button'
import { CreateGuildModal } from '../components/modal/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'
import { fetchGuildMember } from '../apis/Guild/guildController'

const Guild = () => {
  const { activeModal, openModal } = useModalStore()
  const showModal = (name: ModalType) => {
    openModal(name)
  }
  useEffect(() => {
    fetchGuildMember(1)
  }, [])

  return (
    <>
      <Button
        size="small"
        scheme="solid"
        onClick={() => showModal('createGuild')}>
        길드 생성
      </Button>
      {activeModal === 'createGuild' && <CreateGuildModal />}
    </>
  )
}

export default Guild
