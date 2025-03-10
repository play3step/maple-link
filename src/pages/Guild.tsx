import { CreateGuildModal } from '../components/modal/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'

import { useGuildsList } from '../hooks/Guild/useGuildsList'
import { useGuildInfo } from '../hooks/Guild/useGuildInfo'
import { MemberContainer } from '../components/Guild/MemberContainer'
import { ListSwitch } from '../components/Guild/ListSwitch'
import { ActionBtnList } from '../components/Guild/ActionBtnList'
import { DetectMemberModal } from '../components/modal/DetectMemberModal'

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
        <ActionBtnList showModal={showModal} />
        <ListSwitch />
      </div>
      <MemberContainer
        members={guildMember}
        masterName={guildInfo?.guildMasterName}
      />
      {activeModal === 'createGuild' && <CreateGuildModal />}
      {activeModal === 'detectMember' && <DetectMemberModal />}
    </div>
  )
}

export default Guild
