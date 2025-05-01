import { CalendarType } from '../../types/notice'
import Button from '../common/Button'
import InputText from '../common/InputText'
import Title from '../common/Title'
import ModalLayout from './ModalLayout'
import nexonIcon from '../../assets/nexon.webp'
import { useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'

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

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      await createUserNotice({
        title: inputValue,
        start: selectedDate,
        color: '#E3F2FD',
        type: 'user'
      })
      setInputValue('')
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  return (
    <ModalLayout size="full">
      <div className="w-full h-full flex flex-col">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-shrink-0">
              <Title
                size="medium"
                className="flex items-center gap-2">
                <IoCalendarOutline
                  className="text-blue-500"
                  size={24}
                />
                {formatDate(selectedDate)}
              </Title>
            </div>

            <div className="min-h-[calc(100vh-200px)] overflow-y-auto">
              {list.length > 0 ? (
                <div className="space-y-6">
                  {/* 넥슨 이벤트 */}
                  {list.some(v => v.type === 'nexon') && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-700 text-lg">
                        넥슨 이벤트
                      </h3>
                      <div className="space-y-2">
                        {list
                          .filter(v => v.type === 'nexon')
                          .map((v, idx) => (
                            <div
                              key={idx}
                              className={`
                                flex items-center gap-3 p-4 rounded-lg
                                ${
                                  v.title.includes('[시작]')
                                    ? 'bg-emerald-50 border border-emerald-200'
                                    : 'bg-red-50 border border-red-200'
                                }
                              `}>
                              <img
                                src={nexonIcon}
                                className="w-8 h-8"
                                alt="Nexon"
                              />
                              <div className="flex-1">
                                <p
                                  className={`
                                    font-medium cursor-pointer hover:underline text-base
                                    ${v.title.includes('[시작]') ? 'text-emerald-700' : 'text-red-700'}
                                  `}
                                  onClick={() =>
                                    v.nexonUrl &&
                                    window.open(v.nexonUrl, '_blank')
                                  }>
                                  {v.title}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* 사용자 일정 */}
                  {list.some(v => v.type === 'user') && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-700 text-lg">
                        내 일정
                      </h3>
                      <div className="space-y-2">
                        {list
                          .filter(v => v.type === 'user')
                          .map((v, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <IoCalendarOutline
                                  className="text-blue-500"
                                  size={20}
                                />
                              </div>
                              <p className="flex-1 font-medium text-blue-700 text-base">
                                {v.title}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  등록된 일정이 없습니다
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-200">
              <div className="flex gap-2">
                <InputText
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="새로운 일정을 입력하세요"
                  className="flex-1"
                  onKeyDown={async e => {
                    if (e.key === 'Enter') {
                      await handleSubmit()
                    }
                  }}
                />
                <Button
                  size="small"
                  scheme="solid"
                  onClick={handleSubmit}>
                  추가
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
