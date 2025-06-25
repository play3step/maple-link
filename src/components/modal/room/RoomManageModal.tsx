import { Room } from '../../../types/rooms'
import ModalLayout from '../ModalLayout'
import { useAdmin } from '../../../hooks/room/useAdmin'
import { useState } from 'react'
import { IoAlertCircle } from 'react-icons/io5'
import { useRoom } from '../../../hooks/room/useRoom'

interface GuildManageModalProps {
  room: Room
  userName: string
}

export const GuildManageModal = ({
  room: initialRoom,
  userName
}: GuildManageModalProps) => {
  const {
    addAdminHandler,
    removeAdminHandler,
    isAddingAdmin,
    isRemovingAdmin
  } = useAdmin()
  const [characterName, setCharacterName] = useState('')
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)
  const [removingAdminName, setRemovingAdminName] = useState<string | null>(
    null
  )

  // 실시간 데이터 가져오기
  const { rooms } = useRoom()
  const room = rooms.find(r => r.adminId === initialRoom.adminId) || initialRoom

  if (!room || room.admins.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    )
  }

  const handleAdd = async () => {
    const result = await addAdminHandler(room.adminId, characterName)
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message
    })
    if (result.success) {
      setCharacterName('')
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleRemove = async (adminName: string) => {
    if (!confirm('정말로 이 관리자를 제거하시겠습니까?')) return

    setRemovingAdminName(adminName)
    const result = await removeAdminHandler(room.adminId, adminName)
    setMessage({
      type: result.success ? 'success' : 'error',
      text: result.message
    })
    setRemovingAdminName(null)
    if (result.success) {
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <ModalLayout
      size="medium"
      title={`${room.groupName} 관리`}
      showFooterButtons={false}>
      <div className="bg-white rounded-lg max-w-4xl w-full">
        <div className="space-y-6">
          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IoAlertCircle className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-blue-900 font-medium mb-1">
                  관리자 초대 시 주의사항
                </h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  관리자로 초대할 때는 반드시 해당 길드원의{' '}
                  <strong>본캐릭터</strong>를 등록해야 합니다.
                  <br />
                  본캐릭터는 넥슨 OpenAPI에서 레벨이 가장 높은 캐릭터를 기준으로
                  자동 설정됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 관리자 추가 폼 */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                관리자 추가
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle
                      cx="12"
                      cy="7"
                      r="4"></circle>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="관리자로 추가할 캐릭터 이름을 입력하세요"
                  value={characterName}
                  onChange={e => {
                    setCharacterName(e.target.value)
                    setMessage(null)
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 min-w-[120px] ${
                  isAddingAdmin || !characterName.trim()
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md'
                }`}
                onClick={handleAdd}
                disabled={isAddingAdmin || !characterName.trim()}>
                {isAddingAdmin ? (
                  <>
                    <div className="w-4 h-4 border-t-2 border-current rounded-full animate-spin" />
                    추가 중...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    관리자 추가
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 메시지 표시 */}
          {message && (
            <div
              className={`flex items-center gap-2 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
              <IoAlertCircle className="text-xl flex-shrink-0" />
              <span className="text-sm">{message.text}</span>
            </div>
          )}

          {/* 관리자 목록 */}
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                관리자 목록
              </h3>
            </div>
            <div className="max-h-[320px] overflow-y-scroll">
              <div className="divide-y divide-gray-100">
                {room.admins.map(admin => (
                  <div
                    key={admin}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/80 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle
                            cx="12"
                            cy="7"
                            r="4"></circle>
                        </svg>
                      </div>
                      <div>
                        <span className="text-gray-900 font-medium">
                          {admin}
                        </span>
                        {admin === userName && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            나
                          </span>
                        )}
                      </div>
                    </div>
                    {admin !== userName && (
                      <button
                        onClick={() => handleRemove(admin)}
                        disabled={
                          isRemovingAdmin && removingAdminName === admin
                        }
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                          isRemovingAdmin && removingAdminName === admin
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-50 text-red-600 hover:bg-red-100 hover:shadow-sm'
                        }`}>
                        {isRemovingAdmin && removingAdminName === admin ? (
                          <>
                            <div className="w-3 h-3 border-t-2 border-current rounded-full animate-spin" />
                            제거 중...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            제거
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
