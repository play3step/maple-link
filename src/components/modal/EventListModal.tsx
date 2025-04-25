import { CalendarType } from '../../types/notice'
import Button from '../common/Button'
import InputText from '../common/InputText'
import Title from '../common/Title'
import ModalLayout from './ModalLayout'

interface Props {
  list: CalendarType[]
  selectedDate: string
}

export const EventListModal = ({ selectedDate, list }: Props) => {
  return (
    <ModalLayout size="medium">
      <div className="h-full flex items-center justify-between flex-col gap-2">
        <Title size="medium">{selectedDate}</Title>
        <div>
          {list.length !== 0 ? (
            list.map(v => <div>{v.title}</div>)
          ) : (
            <div>기록된 일정이 없습니다.</div>
          )}
        </div>

        <div className="flex gap-2">
          <InputText />
          <Button
            size="small"
            scheme="outlined">
            둥록
          </Button>
        </div>
      </div>
    </ModalLayout>
  )
}
