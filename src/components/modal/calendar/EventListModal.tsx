import { CalendarType } from '../../../types/notice'
import Button from '../../common/Button'
import ModalLayout from '../ModalLayout'
import nexonIcon from '../../../assets/nexon.webp'

import { IoCalendarOutline } from 'react-icons/io5'
import { Calendar } from '../../../types/calendar'
import { useState } from 'react'
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiUserPlus,
  FiUsers
} from 'react-icons/fi'

const isNexonEvent = (
  event: CalendarType | Calendar
): event is CalendarType => {
  return event.type === 'nexon'
}

const isUserEvent = (event: CalendarType | Calendar): event is Calendar => {
  return event.type === 'USER' || event.type === 'GROUP'
}

interface Props {
  list: (CalendarType | Calendar)[]
  selectedDate: string
  createUserNotice: (calendar: Calendar) => void
  deleteCalendarHandler: (scheduleId: number) => void
  updateCalendarHandler: (calendar: Calendar) => void
  inviteGroupCalendar: (memberNicknames: string[], scheduleId: number) => void
}

export const EventListModal = ({
  selectedDate,
  list,
  createUserNotice,
  deleteCalendarHandler,
  updateCalendarHandler,
  inviteGroupCalendar
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [isComposing, setIsComposing] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [invitingScheduleId, setInvitingScheduleId] = useState<number | null>(
    null
  )
  const [inviteInput, setInviteInput] = useState<string>('')
  const [inviteList, setInviteList] = useState<string[]>([])

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

  const handleEdit = (e: Calendar) => {
    setEditingId(e.id ?? null)
    setEditValue(e.title)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const handleSaveEdit = async (e: Calendar) => {
    if (editValue.trim() && editValue !== e.title) {
      await updateCalendarHandler({
        ...e,
        title: editValue
      })
      setEditingId(null)
      setEditValue('')
    }
  }

  const handleInvite = (scheduleId: number) => {
    setInvitingScheduleId(scheduleId)
    setShowInviteModal(true)
    setInviteList([])
    setInviteInput('')
  }

  const handleAddInvitee = () => {
    if (inviteInput.trim() && !inviteList.includes(inviteInput.trim())) {
      setInviteList([...inviteList, inviteInput.trim()])
      setInviteInput('')
    }
  }

  const handleRemoveInvitee = (nickname: string) => {
    setInviteList(inviteList.filter(n => n !== nickname))
  }

  const handleSubmitInvite = async () => {
    if (invitingScheduleId && inviteList.length > 0) {
      await inviteGroupCalendar(inviteList, invitingScheduleId)
      setShowInviteModal(false)
      setInvitingScheduleId(null)
      setInviteList([])
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      await handleSubmit()
    }
  }

  const handleInviteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing && inviteInput.trim()) {
      handleAddInvitee()
    }
  }

  const handleEditKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    event: Calendar
  ) => {
    if (e.key === 'Enter' && !isComposing) {
      await handleSaveEdit(event)
    } else if (e.key === 'Escape') {
      handleCancelEdit()
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
    <div className="relative">
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
                {list.some(isNexonEvent) && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-700 text-lg">
                      넥슨 이벤트
                    </h3>
                    <div className="space-y-2">
                      {list.filter(isNexonEvent).map((v, idx) => (
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
                {list.some(isUserEvent) && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-700 text-lg">
                      내 일정
                    </h3>
                    <div className="space-y-2">
                      {list.filter(isUserEvent).map(v => (
                        <div
                          key={v.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-200">
                          {editingId === v.id ? (
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                type="text"
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                onCompositionStart={() => setIsComposing(true)}
                                onCompositionEnd={() => setIsComposing(false)}
                                onKeyDown={e => handleEditKeyDown(e, v)}
                                className="flex-1 px-3 py-1.5 bg-white rounded-md border border-blue-300
                                  text-blue-900 placeholder:text-blue-300
                                  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                                  transition-all duration-200"
                                autoFocus
                              />
                              <div className="flex items-center gap-1">
                                <button
                                  className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors"
                                  onClick={() => handleSaveEdit(v)}>
                                  <FiCheck size={16} />
                                </button>
                                <button
                                  className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                                  onClick={handleCancelEdit}>
                                  <FiX size={16} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-2">
                                {v.type === 'GROUP' && (
                                  <FiUsers className="w-4 h-4 text-blue-500" />
                                )}
                                <span className="text-blue-900">{v.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-md transition-colors"
                                  onClick={() => handleInvite(v.id ?? 0)}>
                                  <FiUserPlus size={16} />
                                </button>
                                <button
                                  className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                  onClick={() => handleEdit(v)}>
                                  <FiEdit2 size={16} />
                                </button>
                                <button
                                  className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                                  onClick={() => handleDelete(v.id ?? 0)}>
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </>
                          )}
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

      {/* 초대 모달 */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FiUserPlus
                  className="text-purple-500"
                  size={24}
                />
                <h2 className="text-lg font-semibold text-gray-900">
                  일정 초대하기
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowInviteModal(false)
                  setInvitingScheduleId(null)
                  setInviteList([])
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiX size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteInput}
                  onChange={e => setInviteInput(e.target.value)}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  onKeyDown={handleInviteKeyDown}
                  placeholder="초대할 멤버의 닉네임을 입력하세요"
                  className="flex-1 px-3 py-2 bg-white rounded-md border border-gray-300
                    text-gray-900 placeholder:text-gray-400
                    focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100
                    transition-all duration-200"
                />
                <Button
                  size="small"
                  scheme="solid"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
                  onClick={handleAddInvitee}>
                  추가
                </Button>
              </div>

              {inviteList.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-slate-500">초대 목록</p>
                  <div className="flex flex-wrap gap-2">
                    {inviteList.map((nickname, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 border border-purple-200 rounded-md">
                        <span className="text-sm text-purple-700">
                          {nickname}
                        </span>
                        <button
                          className="text-purple-400 hover:text-purple-600"
                          onClick={() => handleRemoveInvitee(nickname)}>
                          <FiX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200">
              <Button
                size="small"
                scheme="solid"
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmitInvite}
                disabled={inviteList.length === 0}>
                초대하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
