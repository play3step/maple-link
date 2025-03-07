import Button from '../components/common/Button'
import { CreateGuildModal } from '../components/modal/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'

const Guild = () => {
  const { activeModal, openModal } = useModalStore()
  const showModal = (name: ModalType) => {
    openModal(name)
  }
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
