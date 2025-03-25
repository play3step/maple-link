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
import { useState } from 'react'
import { Member } from '../types/guild'

const Guild = () => {
  const { activeModal, openModal } = useModalStore()

  const { guildList } = useGuildsList()

  const { nexonMembers, selectMember } = useGuildMember()

  const [selectedMember, setSelectedMember] = useState<Member>()

  const showModal = (name: ModalType) => {
    openModal(name)
  }

  const handleMemberSelect = async (member: Member) => {
    await setSelectedMember(member)
    openModal('detailMember')
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
        {guildList.length > 0 && nexonMembers ? (
          <MemberContainer
            members={selectMember?.memberDetailResponse}
            masterName={selectMember?.guildMasterName}
            onSelect={handleMemberSelect}
          />
        ) : (
          <Empty />
        )}
      </div>

      {activeModal === 'createGuild' && <CreateGuildModal />}
      {activeModal === 'detectMember' && <DetectMemberModal />}
      {activeModal === 'detailMember' && selectedMember && nexonMembers && (
        <DetailMemberModal
          member={selectedMember}
          guildList={guildList}
          guildInfo={nexonMembers}
        />
      )}
    </div>
  )
}

export default Guild
