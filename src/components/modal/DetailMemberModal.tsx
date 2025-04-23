import { IoSaveOutline, IoSettingsOutline } from 'react-icons/io5'
import { Guild, NexonMembers, Member } from '../../types/guild'
import Title from '../common/Title'
import { CharacterListItem } from '../Guild/CharacterListItem'
import ModalLayout from './ModalLayout'
import { useState } from 'react'
import { Dropdown } from '../common/Dropdown'

interface Props {
  member: Member
  guildList: Guild[]
  guildInfo: NexonMembers[]
}

export const DetailMemberModal = ({ member, guildList, guildInfo }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedGuild, setSelectedGuild] = useState('')
  const [selectedMember, setSelectedMember] = useState('')

  const guildMemberList = guildInfo.find(v => v.guildName === selectedGuild)

  const toggleEditMode = () => {
    if (isEditMode) {
      if (!window.confirm('저장하시겠습니까?')) {
        return
      }
    }
    setIsEditMode(prev => !prev)
  }
  const handleSelectGuild = (guildName: string) => {
    setSelectedGuild(guildName)
    setSelectedMember('')
  }

  const handleSelectMember = (memberName: string) => {
    setSelectedMember(memberName)
  }

  if (!member) return null

  return (
    <ModalLayout size="medium">
      <Title size="large">{member.name} 정보</Title>
      <div className="w-full h-full flex gap-6">
        <div className="w-full flex justify-center items-center flex-col">
          <img
            src={member.imagePath}
            className="w-36 h-36"
          />
          <div className="flex gap-2">
            <p>{member.name}</p>
            <p>Lv.{member.level}</p>
          </div>
          <p className="text-neutral-500"> {member.job}</p>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center px-2">
            <Title size="medium">부캐릭 정보</Title>
            {isEditMode ? (
              <IoSaveOutline
                onClick={toggleEditMode}
                className=" cursor-pointer"
              />
            ) : (
              <IoSettingsOutline
                onClick={toggleEditMode}
                className=" cursor-pointer"
              />
            )}
          </div>
          <div className="mt-2 flex flex-col gap-4">
            <CharacterListItem state={isEditMode} />
            {isEditMode && (
              <div className="flex gap-3 justify-start">
                <Dropdown
                  list={guildList}
                  onSelect={handleSelectGuild}
                  selected={selectedGuild}
                  type="guild"
                />
                {selectedGuild && (
                  <Dropdown
                    list={guildMemberList?.memberDetailResponse || []}
                    onSelect={handleSelectMember}
                    selected={selectedMember}
                    type="member"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
