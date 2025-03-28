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

  const { nexonMembers, selectMember, view } = useGuildMember()

  const [selectedMember, setSelectedMember] = useState<Member>()

  const showModal = (name: ModalType) => {
    openModal(name)
  }

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member)
    openModal('detailMember')
  }

  if (!guildList) return <div>Loading...</div>

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div>
        <div className="flex mb-4 justify-between">
          <ActionBtnList
            showModal={showModal}
            guildList={guildList}
          />
          {guildList.length > 0 && <ListSwitch />}
        </div>
      </div>

      <div className="min-h-[760px] flex items-center justify-center overflow-y-auto">
        {guildList.length > 0 && view === '길드정보' ? (
          <MemberContainer
            members={selectMember?.members}
            masterName={selectMember?.masterName}
            onSelect={handleMemberSelect}
          />
        ) : guildList.length > 0 && view === '내기록' ? (
          <MemberContainer
            members={selectMember?.members}
            onSelect={handleMemberSelect}
          />
        ) : (
          <Empty />
        )}
      </div>

      {activeModal === 'createGuild' && <CreateGuildModal />}
      {activeModal === 'detectMember' && (
        <DetectMemberModal guildId={Number(selectMember?.guildId)} />
      )}
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
