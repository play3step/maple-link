import { CreateGuildModal } from '../components/modal/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'

import { useGuildsList } from '../hooks/Guild/useGuildsList'
import { useGuildInfo } from '../hooks/Guild/useGuildInfo'
import { MemberContainer } from '../components/Guild/MemberContainer'
import { ListSwitch } from '../components/Guild/ListSwitch'
import { ActionBtnList } from '../components/Guild/ActionBtnList'
import { DetectMemberModal } from '../components/modal/DetectMemberModal'
import { Empty } from '../components/common/Empty'

const Guild = () => {
  const { activeModal, openModal } = useModalStore()

  const { guildList } = useGuildsList()

  const { guildInfo } = useGuildInfo()
  const guildMember = guildInfo?.memberDetailResponse ?? []

  const showModal = (name: ModalType) => {
    openModal(name)
  }

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="flex mb-4 justify-between">
        <ActionBtnList
          showModal={showModal}
          guildList={guildList}
        />
        {guildList.length > 0 && <ListSwitch />}
      </div>
      <div className="flex-1 flex items-center justify-center">
        {guildList.length > 0 && guildMember ? (
          <MemberContainer
            members={guildMember}
            masterName={guildInfo?.guildMasterName}
          />
        ) : (
          <Empty />
        )}
      </div>

      {activeModal === 'createGuild' && <CreateGuildModal />}
      {activeModal === 'detectMember' && <DetectMemberModal />}
    </div>
  )
}

export default Guild
