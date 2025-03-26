import { useGuildDetect } from '../../hooks/Guild/useGuildDetect'
import Title from '../common/Title'
// import { CharacterListItem } from '../Guild/CharacterListItem'
import ModalLayout from './ModalLayout'

export const DetectMemberModal = () => {
  const { detectMember } = useGuildDetect()
  console.log(detectMember)
  return (
    <ModalLayout size="medium">
      <Title
        size="medium"
        color="primary">
        비교하기
      </Title>
      <div className="flex w-full gap-6">
        <div className="w-full">
          <Title size="small">추가 인원</Title>
          <div className="mt-2 max-h-[400px] overflow-auto">
            {detectMember?.toAdd.map(v => <p>{v}</p>)}
          </div>
        </div>
        <div className="w-full">
          <Title size="small">삭제 인원</Title>
          <div className="mt-2 max-h-[400px] overflow-auto">
            {detectMember?.toRemove.map(v => <p>{v}</p>)}
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
