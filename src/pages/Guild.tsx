import { CreateGuildModal } from '../components/modal/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'

import { useGuildsList } from '../hooks/Guild/useGuildsList'

import { MemberContainer } from '../components/Guild/MemberContainer'
import { ListSwitch } from '../components/Guild/ListSwitch'
import { ActionBtnList } from '../components/Guild/ActionBtnList'
import { DetectMemberModal } from '../components/modal/DetectMemberModal'
import { useGuildMember } from '../hooks/Guild/useGuildMember'
import { Empty } from '../components/common/Empty'
import { DetailMemberModal } from '../components/modal/DetailMemberModal'
// import { DetailMemberModal } from '../components/modal/DetailMemberModal'

const Guild = () => {
  const { activeModal, openModal } = useModalStore()

  const { guildList } = useGuildsList()

  const { nexonMembers, recordedMembers } = useGuildMember()

  let guildMember = []
  let masterName = ''
  if (nexonMembers) {
    guildMember = nexonMembers.memberDetailResponse

    masterName = nexonMembers.guildMasterName
  } else if (recordedMembers) {
    guildMember = recordedMembers.memberDetailResponse
    masterName = ''
  }
  const showModal = (name: ModalType) => {
    openModal(name)
  }

  if (!guildList) return <div>Loading...</div>

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
            masterName={masterName}
          />
        ) : (
          <Empty />
        )}
      </div>

      {activeModal === 'createGuild' && <CreateGuildModal />}
      {activeModal === 'detectMember' && <DetectMemberModal />}
      {guildMember && <DetailMemberModal member={guildMember[0]} />}
    </div>
  )
}

export default Guild
