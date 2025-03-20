import { Member } from '../../types/guild'
import Title from '../common/Title'
import { CharacterListItem } from '../Guild/CharacterListItem'
import ModalLayout from './ModalLayout'

interface Props {
  member: Member
}

export const DetailMemberModal = ({ member }: Props) => {
  if (!member) return null

  return (
    <ModalLayout size="medium">
      <Title size="large">000의 기록</Title>
      <div className="w-full h-full flex gap-6">
        <div className="border border-black w-full ">
          <Title size="medium">캐릭터 정보</Title>
          <img src={member.imagePath} />
        </div>
        <div className="border border-black w-full">
          <Title size="medium">부캐릭 정보</Title>
          <div className="mt-2">
            <CharacterListItem />
            <CharacterListItem />
            <CharacterListItem />
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
