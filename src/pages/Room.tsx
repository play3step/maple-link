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
import { Loading } from '../components/common/Loading'
import { useState } from 'react'
import { Member } from '../types/guild'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { AddCharacterModal } from '../components/modal/AddCharacterModal'

const Room = () => {
  const { activeModal, openModal } = useModalStore()
  const navigate = useNavigate()
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

  if (!guildList)
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <Loading
          size="large"
          text="길드 정보를 불러오는 중입니다..."
        />
      </div>
    )

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/rooms')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="뒤로 가기">
            <IoArrowBack className="text-xl text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">길드 관리</h1>
            <p className="text-sm text-gray-600 mt-1">
              {view === '길드정보' ? '길드원 정보 관리' : '내 기록 관리'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <ActionBtnList
                showModal={showModal}
                guildList={guildList}
              />
              {guildList.length > 0 && <ListSwitch />}
            </div>
          </div>

          <div className="p-6">
            <div className="min-h-[600px]">
              {guildList.length > 0 && view === '길드정보' ? (
                <MemberContainer
                  members={selectMember?.members}
                  masterName={selectMember?.masterName}
                  onSelect={handleMemberSelect}
                />
              ) : guildList.length > 0 && view === '내기록' ? (
                selectMember && selectMember.members.length > 0 ? (
                  <MemberContainer
                    members={selectMember.members}
                    onSelect={handleMemberSelect}
                  />
                ) : (
                  <Empty text="등록된 길드원이 없습니다" />
                )
              ) : (
                <Empty text="길드를 선택해주세요" />
              )}
            </div>
          </div>
        </div>
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
      {activeModal === 'addCharacter' && <AddCharacterModal />}
    </div>
  )
}

export default Room
