import { Member, NexonMembers } from '../../types/guild'
import { useState } from 'react'
import { IoEllipsisVertical } from 'react-icons/io5'

interface MemberContainerProps {
  members?: Member[]
  allMembers?: NexonMembers[]
  masterName?: string
  onSelect?: (member: Member) => void
  guildName?: string
  onDeleteGuild?: () => void
  isMainGuild?: boolean
}

export const MemberContainer = ({
  members,
  masterName,
  onSelect,
  guildName,
  onDeleteGuild,
  allMembers,
  isMainGuild
}: MemberContainerProps) => {
  const [showMenu, setShowMenu] = useState(false)
  if (!members) return null

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('정말로 이 길드를 삭제하시겠습니까?')) {
      onDeleteGuild?.()
    }
    setShowMenu(false)
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      {guildName && (
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <h2 className="text-white text-lg font-semibold pr-10">
            길드: {guildName}
          </h2>
          {onDeleteGuild && !isMainGuild && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button
                onClick={e => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className="text-white opacity-80 hover:opacity-100 transition-opacity p-1">
                <IoEllipsisVertical className="text-xl" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors">
                    길드 삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {members.map(member => (
            <div
              key={member.name}
              onClick={
                member.type === 'main'
                  ? () => onSelect?.(member)
                  : member.type === 'sub' && member.mainCharacterInfo
                    ? () => {
                        const found = allMembers
                          ?.flatMap(g => g.memberDetailResponse)
                          .find(m => m?.id === member.mainCharacterInfo!.id)

                        if (found) {
                          onSelect?.(found)
                        }
                      }
                    : undefined
              }
              className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer group overflow-hidden border border-gray-100">
              <div className="flex items-center p-3 gap-3">
                <img
                  src={member.imagePath}
                  alt={member.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500">{member.job}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      Lv.{member.level}
                    </span>
                    {masterName && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          member.type === 'main'
                            ? 'bg-blue-100 text-blue-700'
                            : member.type === 'sub'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}>
                        {member.type === 'main'
                          ? '본캐'
                          : member.type === 'sub'
                            ? '부캐'
                            : '미지정'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
