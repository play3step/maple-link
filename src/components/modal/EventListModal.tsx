import { CalendarType } from '../../types/notice'
import ModalLayout from './ModalLayout'

interface Props {
  list: CalendarType[]
}

export const EventListModal = ({ list }: Props) => {
  return (
    <ModalLayout size="medium">
      <div className="h-full flex justify-center items-center flex-col gap-2">
        {list.length !== 0 ? (
          list.map(v => <div>{v.title}</div>)
        ) : (
          <div>기록된 일정이 없습니다.</div>
        )}
      </div>
    </ModalLayout>
  )
}
