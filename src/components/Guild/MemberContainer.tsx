import { Member } from '../../types/guild'

interface MemberContainerProps {
  members?: Member[]
  masterName?: string
  onSelect?: (member: Member) => void
  guildName?: string
}

export const MemberContainer = ({
  members,
  masterName,
  onSelect,
  guildName
}: MemberContainerProps) => {
  if (!members) return null

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      {masterName && (
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600">
          <h2 className="text-white text-lg font-semibold">
            길드: {guildName}
          </h2>
        </div>
      )}

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {members.map(member => (
            <div
              key={member.name}
              onClick={
                member.type === '본캐'
                  ? () => onSelect?.(member)
                  : member.type === '부캐' && member.mainCharacterId
                    ? () => {
                        const mainChar = members.find(
                          m => m.id === member.mainCharacterId
                        )
                        if (mainChar) onSelect?.(mainChar)
                      }
                    : undefined
              }
              className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer group overflow-hidden border border-gray-100">
              <div className="flex items-center p-3 gap-3">
                <img
                  src={member.imagePath}
                  alt={member.name}
                  className="w-16 h-16 object-cover rounded-lg"
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
                          member.type === '본캐'
                            ? 'bg-blue-100 text-blue-700'
                            : member.type === '부캐'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}>
                        {member.type === '본캐'
                          ? '본캐'
                          : member.type === '부캐'
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
