import { CalendarType } from '../../types/notice'
import Button from '../common/Button'
import InputText from '../common/InputText'
import Title from '../common/Title'
import ModalLayout from './ModalLayout'
import nexonIcon from '../../assets/nexon.webp'
import noteIcon from '../../assets/note.png'
import { useState } from 'react'

interface Props {
  list: CalendarType[]
  selectedDate: string
  createUserNotice: ({ title, start, color, type }: CalendarType) => void
}

export const EventListModal = ({
  selectedDate,
  list,
  createUserNotice
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleSubmit = () => {
    if (inputValue.trim()) {
      createUserNotice({
        title: inputValue,
        start: selectedDate,
        color: '#90CAF9',
        type: 'user'
      })
      setInputValue('')
    }
  }

  return (
    <ModalLayout size="medium">
      <div className="h-full flex items-center justify-between flex-col gap-2">
        <Title size="medium">{selectedDate} 일정</Title>
        <div className=" w-full p-5 flex flex-col gap-3 text-smal items-center overflow-auto max-h-96">
          {list.length !== 0 ? (
            list.map(v =>
              v.type === 'nexon' ? (
                <div
                  className=" w-1/2 flex gap-4 items-center p-2 rounded-md text-white min-h-[48px] shadow-md"
                  style={{ backgroundColor: v.color }}>
                  <img
                    src={nexonIcon}
                    className="w-8"
                  />
                  <p
                    className="flex-1 text-sm truncate hover:text-black cursor-pointer"
                    onClick={() =>
                      v.nexonUrl && window.open(v.nexonUrl, '_blank')
                    }>
                    {v.title}
                  </p>
                </div>
              ) : (
                <div
                  className=" w-1/2 flex gap-4 items-center p-2 rounded-md text-white min-h-[48px] shadow-md"
                  style={{ backgroundColor: v.color }}>
                  <img
                    src={noteIcon}
                    className="w-8"
                  />
                  <p
                    className="flex-1 text-sm truncate hover:text-black cursor-pointer"
                    onClick={() =>
                      v.nexonUrl && window.open(v.nexonUrl, '_blank')
                    }>
                    {v.title}
                  </p>
                </div>
              )
            )
          ) : (
            <div>기록된 일정이 없습니다.</div>
          )}
        </div>

        <div className="flex gap-2">
          <InputText
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="일정을 입력하세요."
          />
          <Button
            size="small"
            scheme="outlined"
            onClick={handleSubmit}>
            둥록
          </Button>
        </div>
      </div>
    </ModalLayout>
  )
}
