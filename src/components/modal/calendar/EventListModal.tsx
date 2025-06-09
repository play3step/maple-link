import { CalendarType } from '../../../types/notice'
import Button from '../../common/Button'
import ModalLayout from '../ModalLayout'
import nexonIcon from '../../../assets/nexon.webp'

import { IoCalendarOutline } from 'react-icons/io5'
import { Calendar } from '../../../types/calendar'
import { useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

interface Props {
  list: CalendarType[]
  selectedDate: string
  createUserNotice: (calendar: Calendar) => void
  deleteCalendarHandler: (scheduleId: number) => void
}

export const EventListModal = ({
  selectedDate,
  list,
  createUserNotice,
  deleteCalendarHandler
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [isComposing, setIsComposing] = useState(false)

  const handleSubmit = async () => {
    if (inputValue.trim()) {
      await createUserNotice({
        title: inputValue,
        start: selectedDate,
        description: '',
        type: 'USER'
      })
      setInputValue('')
    }
  }
  const handleDelete = async (scheduleId: number) => {
    await deleteCalendarHandler(scheduleId)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      await handleSubmit()
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
    <ModalLayout
      size="full"
      title={formatDate(selectedDate)}
      titleIcon={
        <IoCalendarOutline
          className="text-blue-500"
          size={24}
        />
      }
      showFooterButtons={false}>
      <div className="container mx-auto max-w-5xl">
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
                          <span
                            className={`
                              ${
                                v.title.includes('[시작]')
                                  ? 'text-emerald-900'
                                  : 'text-red-900'
                              }
                             cursor-pointer hover:underline`}
                            onClick={() => {
                              window.open(v.nexonUrl, '_blank')
                            }}>
                            {v.title}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 유저 일정 */}
              {list.some(v => v.type === 'USER') && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-700 text-lg">
                    내 일정
                  </h3>
                  <div className="space-y-2">
                    {list
                      .filter(v => v.type === 'USER')
                      .map((v, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-200">
                          <span className="text-blue-900">{v.title}</span>
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors">
                              <FiEdit2 size={16} />
                            </button>
                            <button
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                              onClick={() => handleDelete(v.id ?? 0)}>
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
              <p className="text-gray-500">등록된 일정이 없습니다</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-200">
          <div className="flex gap-3 pb-4 px-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder="새로운 일정을 입력하세요"
              className="flex-1 px-4 py-2.5 bg-white rounded-lg border border-gray-300
                text-gray-900 placeholder:text-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                transition-all duration-200"
              onKeyDown={handleKeyDown}
            />
            <Button
              size="small"
              scheme="solid"
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              onClick={handleSubmit}>
              추가
            </Button>
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
