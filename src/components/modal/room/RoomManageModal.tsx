import { Room } from '../../../types/rooms'
import InputText from '../../common/InputText'
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
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">관리자 목록</h3>
            <div className="flex items-center gap-2">
              <InputText
                placeholder="관리자 추가"
                value={characterName}
                onChange={e => {
                  setCharacterName(e.target.value)
                  // 입력 시작하면 이전 메시지 제거
                  setMessage(null)
                }}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                onClick={handleAdd}
                disabled={isAddingAdmin || !characterName.trim()}>
                {isAddingAdmin ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
                    추가 중...
                  </div>
                ) : (
                  '관리자 추가'
                )}
              </button>
            </div>
          </div>

          {message && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}>
              <IoAlertCircle className="text-xl flex-shrink-0" />
              <span>{message.text}</span>
            </div>
          )}

          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="font-medium">닉네임</div>
              <div className="font-medium">권한</div>
            </div>
            {room.admins.map((admin, index) => (
              <div
                key={admin}
                className="grid grid-cols-2 gap-4 px-2 py-2 border-t items-center">
                <div>{admin}</div>
                <div className="flex space-x-2">
                  {room.admins.length > 0 &&
                    room.admins[index] !== userName && (
                      <button
                        onClick={() => handleRemove(admin)}
                        disabled={
                          isRemovingAdmin && removingAdminName === admin
                        }
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition-colors">
                        {isRemovingAdmin && removingAdminName === admin ? (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-t-2 border-white rounded-full animate-spin" />
                            제거 중...
                          </div>
                        ) : (
                          '제거'
                        )}
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
