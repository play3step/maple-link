import { IoSaveOutline, IoSettingsOutline } from 'react-icons/io5'
import { Guild, NexonMembers, Member } from '../../types/guild'
import Title from '../common/Title'
import { CharacterListItem } from '../Guild/CharacterListItem'
import ModalLayout from './ModalLayout'
import { useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { Dropdown } from '../common/DropDown'

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
      <Title size="large">000의 기록</Title>
      <div className="w-full h-full flex gap-6">
        <div className="border border-black w-full ">
          <Title size="medium">캐릭터 정보</Title>
          <img src={member.imagePath} />
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
          <div className="mt-2 flex flex-col justify-center items-center">
            <CharacterListItem state={isEditMode} />
            {isEditMode && <MdOutlineAddCircleOutline />}
            <div className="flex gap-3">
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
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
