import { CreateGuildModal } from '../components/modal/guild/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'
import { useGuildsList } from '../hooks/guild/useGuildsList'
import { MemberContainer } from '../components/guild/MemberContainer'
import { ListSwitch } from '../components/guild/ListSwitch'
import { ActionBtnList } from '../components/guild/ActionBtnList'
import { DetectMemberModal } from '../components/modal/guild/DetectMemberModal'
import { useGuildMember } from '../hooks/guild/useGuildMember'
import { Empty } from '../components/common/Empty'
import { DetailMemberModal } from '../components/modal/guild/DetailMemberModal'
import { Loading } from '../components/common/Loading'
import { useState } from 'react'
import { Member, NexonMembers } from '../types/guild'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useGuildDetect } from '../hooks/guild/useGuildDetect'

const Room = () => {
  const { activeModal, openModal } = useModalStore()
  const navigate = useNavigate()
  const { guildList } = useGuildsList()
  const { nexonMembers, selectMember } = useGuildMember()
  const [selectedMember, setSelectedMember] = useState<Member>()

  console.log(selectMember)
  const { deleteGuild } = useGuildsList()

  const [searchCharacter, setSearchCharacter] = useState('')

  const main = guildList[0]?.guildName

  const { detectMembers, reflectDetectMember, handleDetect } =
    useGuildDetect(guildList)

  const showModal = (name: ModalType) => {
    openModal(name)
  }

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member)
    openModal('detailMember')
  }

  const handleSearchCharacter = (value: string) => {
    setSearchCharacter(value)
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
            <p className="text-sm text-gray-600 mt-1">길드원 정보 관리</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <ActionBtnList
                showModal={showModal}
                guildList={guildList}
                handleDetect={handleDetect}
              />
              {guildList.length > 0 && <ListSwitch />}
            </div>
          </div>

          <div className="p-6">
            <div className="min-h-[600px]">
              {guildList.length > 0 ? (
                <MemberContainer
                  members={selectMember?.memberDetailResponse as Member[]}
                  allMembers={nexonMembers as NexonMembers[]}
                  masterName={selectMember?.guildMasterName}
                  guildName={selectMember?.guildName}
                  onSelect={handleMemberSelect}
                  isMainGuild={selectMember?.guildName === main}
                  searchCharacter={searchCharacter}
                  setSearchCharacter={handleSearchCharacter}
                  onDeleteGuild={
                    selectMember?.guildId
                      ? () => deleteGuild(selectMember.guildId)
                      : undefined
                  }
                />
              ) : (
                <Empty text="길드를 선택해주세요" />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeModal === 'createGuild' && <CreateGuildModal />}
      {activeModal === 'detectMember' && (
        <DetectMemberModal
          guildDetectList={detectMembers ?? []}
          reflectDetectMember={reflectDetectMember}
        />
      )}
      {activeModal === 'detailMember' && selectedMember && nexonMembers && (
        <DetailMemberModal
          memberDetail={selectedMember}
          memberList={nexonMembers as NexonMembers[]}
        />
      )}
    </div>
  )
}

export default Room
