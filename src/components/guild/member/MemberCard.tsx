import { Member, NexonMembers } from '../../../types/guild'

interface MemberCardProps {
  member: Member
  onSelect: (type: string, member: Member) => void
  allMembers: NexonMembers[]
  gridSize: number
  masterName: string
}

export const MemberCard = ({
  member,
  onSelect,
  allMembers,
  gridSize,
  masterName
}: MemberCardProps) => {
  return (
    <div
      key={member.name}
      onClick={
        member.type === '본캐'
          ? () => onSelect?.(member.type, member)
          : member.type === '부캐' && member.mainCharacterInfo
            ? () => {
                const found = allMembers
                  ?.flatMap(g => g.memberDetailResponse)
                  .find(
                    m =>
                      m?.name === member.mainCharacterInfo!.name &&
                      m.type === '본캐'
                  )

                if (found) {
                  onSelect?.(found.type, found)
                }
              }
            : () => onSelect?.(member.type, member)
      }
      className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer group overflow-hidden border border-gray-100">
      <div
        className={`flex items-center p-3 gap-3 ${gridSize === 8 ? 'flex-col' : ''}`}>
        <img
          src={member.imagePath}
          alt={member.name}
          className={`object-cover rounded-lg ${
            gridSize === 8 ? 'w-16 h-16' : 'w-24 h-24'
          }`}
        />
        <div
          className={`flex-1 min-w-0 ${gridSize === 8 ? 'text-center w-full' : ''}`}>
          <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600">
            {member.name}
          </h3>
          <p className="text-sm text-gray-500">{member.job}</p>
          <div
            className={`flex items-center gap-2 mt-1 ${gridSize === 8 ? 'justify-center flex-wrap' : ''}`}>
            <div
              className={`flex flex-col gap-1 ${gridSize === 8 ? 'items-center' : ''}`}>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="text-xs text-gray-500">Lv.{member.level}</span>
                {masterName && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                      member.name === masterName
                        ? 'bg-rose-100 text-rose-700'
                        : member.type === '본캐'
                          ? 'bg-blue-100 text-blue-700'
                          : member.type === '부캐' &&
                              allMembers?.find(m =>
                                m.memberDetailResponse?.find(
                                  m => m.name === member.mainCharacterInfo?.name
                                )
                              )
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                    {member.name === masterName && (
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1l3.22 6.52 7.2.97-5.21 5.07 1.23 7.19L12 17.77l-6.44 3.38 1.23-7.19-5.21-5.07 7.2-.97z" />
                      </svg>
                    )}
                    {member.name === masterName
                      ? '마스터'
                      : member.type === '본캐'
                        ? '본캐'
                        : member.type === '부캐' &&
                            allMembers?.find(m =>
                              m.memberDetailResponse?.find(
                                m => m.name === member.mainCharacterInfo?.name
                              )
                            )
                          ? '부캐'
                          : member.mainCharacterInfo === null
                            ? ''
                            : '외부 부캐'}
                  </span>
                )}
              </div>
              {member.type === '부캐' &&
                !allMembers?.find(m =>
                  m.memberDetailResponse?.find(
                    m => m.name === member.mainCharacterInfo?.name
                  )
                ) && (
                  <span
                    className={`text-xs text-gray-500 ${gridSize === 8 ? 'text-center' : ''}`}>
                    외부 길드에 {member.mainCharacterInfo?.name}님의 부캐입니다.
                  </span>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
