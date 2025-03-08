import Button from '../components/common/Button'
import { CreateGuildModal } from '../components/modal/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'

import { useGuildsList } from '../hooks/Guild/useGuildsList'
import { useGuildInfo } from '../hooks/Guild/useGuildInfo'
import { MemberContainer } from '../components/Guild/MemberContainer'

const Guild = () => {
  const { activeModal, openModal } = useModalStore()

  const { guildList } = useGuildsList()
  console.log(guildList)

  const { guildInfo } = useGuildInfo()
  const guildMember = guildInfo?.memberDetailResponse ?? []

  const showModal = (name: ModalType) => {
    openModal(name)
  }

  return (
    <div>
      <Button
        size="small"
        scheme="solid"
        onClick={() => showModal('createGuild')}>
        길드 생성
      </Button>
      <MemberContainer list={guildMember} />
      {activeModal === 'createGuild' && <CreateGuildModal />}
    </div>
  )
}

export default Guild
