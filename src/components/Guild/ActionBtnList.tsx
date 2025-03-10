import { ModalType } from '../../store/modalStore'
import Button from '../common/Button'

interface Props {
  showModal: (name: ModalType) => void
}

export const ActionBtnList = ({ showModal }: Props) => {
  return (
    <div className="flex gap-2">
      <Button
        size="small"
        scheme="solid"
        onClick={() => showModal('createGuild')}>
        길드 생성
      </Button>
      <Button
        size="small"
        scheme="solid"
        onClick={() => showModal('detectMember')}>
        비교 하기
      </Button>
    </div>
  )
}
