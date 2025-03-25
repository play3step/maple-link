import { IoSaveOutline, IoSettingsOutline } from 'react-icons/io5'
import { Guild, Member } from '../../types/guild'
import Title from '../common/Title'
import { CharacterListItem } from '../Guild/CharacterListItem'
import ModalLayout from './ModalLayout'
import { useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { Dropdown } from '../common/DropDown'

interface Props {
  member: Member
  guildList: Guild[]
  guildMember: Member[]
}

export const DetailMemberModal = ({
  member,
  guildList,
  guildMember
}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [selected, setSelected] = useState('')
  console.log(guildList)
  console.log(selected)

  const toggleEditMode = () => {
    if (isEditMode) {
      if (!window.confirm('저장하시겠습니까?')) {
        return
      }
    }
    setIsEditMode(prev => !prev)
  }
  const handleSelect = (guildName: string) => {
    setSelected(guildName)
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
                onSelect={handleSelect}
                type="guild"
              />
              {selected && (
                <Dropdown
                  list={guildMember}
                  onSelect={handleSelect}
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
