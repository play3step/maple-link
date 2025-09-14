import { CreateGuildModal } from '../components/modal/guild/CreateGuildModal'
import { ModalType, useModalStore } from '../store/modalStore'
import { useGuildsList } from '../hooks/guild/useGuildsList'
import { DetectMemberModal } from '../components/modal/guild/DetectMemberModal'
import { useGuildMember } from '../hooks/guild/useGuildMember'
import { DetailMemberModal } from '../components/modal/guild/DetailMemberModal'
import { Loading } from '../components/common/Loading'
import { useState } from 'react'
import { Member, NexonMembers } from '../types/guild'
import { useNavigate } from 'react-router-dom'
import { useGuildDetect } from '../hooks/guild/useGuildDetect'
import { findMainCharacter } from '../apis/character/characterController'
import { AlertModal } from '../components/modal/common/AlertModal'
import { RoomHeader } from '../components/room/RoomHeader'
import { RoomActionBar } from '../components/room/RoomActionBar'
import { RoomContent } from '../components/room/RoomContent'

const Room = () => {
  const { activeModal, openModal } = useModalStore()
  const navigate = useNavigate()
  const { guildList, createGuild, deleteGuild } = useGuildsList()
  const {
    nexonMembers,
    selectMember,
    refreshMember,
    descriptionMember,
    nexonMembersLoading
  } = useGuildMember()

  const [selectedMember, setSelectedMember] = useState<{
    type: string
    member: Member | null
  }>({
    type: '',
    member: null
  })

  const [searchCharacter, setSearchCharacter] = useState('')

  const main = guildList[0]?.guildName

  const { detectMembers, reflectDetectMember, handleDetect } =
    useGuildDetect(guildList)

  const [alertMessage, setAlertMessage] = useState<{
    mainChar: string
    subChar: string
  }>({
    mainChar: '',
    subChar: ''
  })

  const showModal = (name: ModalType) => {
    openModal(name)
  }

  const handleMemberSelect = async (type: string, member: Member) => {
    setSelectedMember({ type: type, member: member })
    if (type !== '미지정') {
      openModal('detailMember')
    } else {
      try {
        const res = await findMainCharacter(member.name)
        const mainChar = res.ranking[0]
        setAlertMessage({
          mainChar: mainChar.character_name,
          subChar: member.name
        })
        openModal('alert') // 이거 나중에 삭제해야함
      } catch {
        setAlertMessage({
          mainChar: member.name,
          subChar: ''
        })
        openModal('alert')
      }
    }
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
      <div className="max-w-7xl mx-auto px-4 py-5">
        <RoomHeader onBack={() => navigate('/rooms')} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <RoomActionBar
            showModal={showModal}
            guildList={guildList}
            handleDetect={handleDetect}
            refreshMember={refreshMember as (guildId: number) => void}
          />

          <RoomContent
            nexonMembersLoading={nexonMembersLoading as boolean}
            guildList={guildList}
            selectMember={selectMember as NexonMembers}
            nexonMembers={nexonMembers as NexonMembers[]}
            main={main}
            searchCharacter={searchCharacter}
            onMemberSelect={handleMemberSelect}
            onSearchCharacter={handleSearchCharacter}
            onDeleteGuild={
              selectMember?.guildId
                ? () => deleteGuild(selectMember.guildId as number)
                : undefined
            }
          />
        </div>
      </div>

      {activeModal === 'createGuild' && (
        <CreateGuildModal createGuild={createGuild} />
      )}
      {activeModal === 'detectMember' && (
        <DetectMemberModal
          guildDetectList={detectMembers ?? []}
          reflectDetectMember={reflectDetectMember}
        />
      )}
      {activeModal === 'detailMember' &&
        selectedMember &&
        selectedMember.member &&
        nexonMembers && (
          <DetailMemberModal
            memberDetail={selectedMember.member}
            memberList={nexonMembers as NexonMembers[]}
            descriptionMember={descriptionMember}
          />
        )}
      {activeModal === 'alert' && (
        <AlertModal
          mainChar={alertMessage.mainChar}
          subChar={alertMessage.subChar}
        />
      )}
    </div>
  )
}

export default Room
