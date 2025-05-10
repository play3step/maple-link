import { Room } from '../../../types/Rooms'
import InputText from '../../common/InputText'
import ModalLayout from '../ModalLayout'
interface GuildManageModalProps {
  room: Room
}

export const GuildManageModal = ({ room }: GuildManageModalProps) => {
  if (room.admins.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    )
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
                onChange={e => {
                  console.log(e.target.value)
                }}
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                관리자 추가
              </button>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="font-medium">닉네임</div>
              <div className="font-medium">권한</div>
            </div>
            {room.admins.map(admin => (
              <div
                key={admin}
                className="grid grid-cols-2 gap-4 py-2 border-t">
                <div>{admin}</div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {}}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    제거
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
