import { useState } from 'react'
import { Room } from '../../types/Rooms'
interface GuildManageModalProps {
  room: Room
  onClose: () => void
}

export const GuildManageModal = ({ room, onClose }: GuildManageModalProps) => {
  const [activeTab, setActiveTab] = useState('members')

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{room.groupName} 관리</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 rounded ${
              activeTab === 'members'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}>
            멤버 관리
          </button>
          <button
            onClick={() => setActiveTab('admins')}
            className={`px-4 py-2 rounded ${
              activeTab === 'admins'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}>
            관리자 관리
          </button>
        </div>

        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">멤버 관리</h3>
            </div>
            {room.subGuild.subGuildIds.map(subGuildId => (
              <div
                key={subGuildId}
                className="border rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">추가할 멤버</h5>
                    <ul className="space-y-1">
                      {room.subGuild.names.map(name => (
                        <li
                          key={name}
                          className="text-green-600">
                          + {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">제거할 멤버</h5>
                    <ul className="space-y-1">
                      {room.subGuild.names.map(name => (
                        <li
                          key={name}
                          className="text-red-600">
                          - {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'admins' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">관리자 목록</h3>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                관리자 추가
              </button>
            </div>
            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="font-medium">닉네임</div>
                <div className="font-medium">권한</div>
                <div className="font-medium">관리</div>
              </div>
              {room.admins.map(admin => (
                <div
                  key={admin}
                  className="grid grid-cols-3 gap-4 py-2 border-t">
                  <div>{admin}</div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        /* 관리자 제거 로직 */
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      제거
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
