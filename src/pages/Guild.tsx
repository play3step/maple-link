import Button from '../components/common/Button'
import { CreateGuildModal } from '../components/modal/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'

import { useGuildsList } from '../hooks/Guild/useGuildsList'
import { useGuildInfo } from '../hooks/Guild/useGuildInfo'
import { MemberContainer } from '../components/Guild/MemberContainer'
import { ListSwitch } from '../components/Guild/ListSwitch'

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
      <div className=" flex mb-4 justify-between">
        <Button
          size="small"
          scheme="solid"
          onClick={() => showModal('createGuild')}>
          길드 생성
        </Button>
        <ListSwitch />
      </div>
      <MemberContainer
        members={guildMember}
        masterName={guildInfo?.guildMasterName}
      />
      {activeModal === 'createGuild' && <CreateGuildModal />}
    </div>
  )
}

export default Guild
