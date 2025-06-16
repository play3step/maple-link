import { Member, NexonMembers } from '../../types/guild'
import { useRef, useState } from 'react'
import {
  IoChevronDown,
  IoEllipsisVertical,
  IoSearchOutline,
  IoHelpCircleOutline,
  IoGridOutline
} from 'react-icons/io5'

interface MemberContainerProps {
  members?: Member[]
  allMembers?: NexonMembers[]
  masterName?: string
  onSelect?: (type: string, member: Member) => void
  guildName?: string
  onDeleteGuild?: () => void
  isMainGuild?: boolean
  searchCharacter?: string
  setSearchCharacter?: (value: string) => void
}

export const MemberContainer = ({
  members,
  masterName,
  onSelect,
  guildName,
  onDeleteGuild,
  allMembers,
  isMainGuild,
  searchCharacter,
  setSearchCharacter
}: MemberContainerProps) => {
  const [showMenu, setShowMenu] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const [selectedType, setSelectedType] = useState('캐릭터 분류')

  const [gridSize, setGridSize] = useState(2)

  const dropdownRef = useRef<HTMLDivElement>(null)

  if (!members) return null

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('정말로 이 길드를 삭제하시겠습니까?')) {
      onDeleteGuild?.()
    }
    setShowMenu(false)
  }

  const filteredMembers = members.filter(member => {
    if (selectedType === '모두 보기' || selectedType === '캐릭터 분류')
      return member.name
        .toLowerCase()
        .includes(searchCharacter?.toLowerCase() || '')
    if (selectedType === '본캐')
      return (
        member.type === '본캐' &&
        member.name.toLowerCase().includes(searchCharacter?.toLowerCase() || '')
      )
    if (selectedType === '부캐')
      return (
        member.type === '부캐' &&
        allMembers?.find(m =>
          m.memberDetailResponse?.find(
            m => m.name === member.mainCharacterInfo?.name
          )
        ) &&
        member.name.toLowerCase().includes(searchCharacter?.toLowerCase() || '')
      )
    if (selectedType === '특이사항')
      return (
        member.description &&
        member.name.toLowerCase().includes(searchCharacter?.toLowerCase() || '')
      )
    return (
      member.type === '부캐' &&
      !allMembers?.find(m =>
        m.memberDetailResponse?.find(
          m => m.name === member.mainCharacterInfo?.name
        )
      )
    )
  })

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
      {guildName && (
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <div className="flex items-center gap-2">
            <h2 className="text-white text-lg font-semibold">
              길드: {guildName}
            </h2>
            <div className="relative group">
              <IoHelpCircleOutline className="text-white/80 hover:text-white cursor-help transition-colors text-xl" />
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-4 py-3 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-64 z-50">
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mb-1">
                    본캐
                  </span>
                  <p className="text-xs text-gray-200">
                    길드의 메인 캐릭터입니다.
                  </p>
                </div>
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 mb-1">
                    부캐
                  </span>
                  <p className="text-xs text-gray-200">
                    같은 길드 내 본캐가 있는 부캐릭터입니다.
                  </p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-1">
                    외부 부캐
                  </span>
                  <p className="text-xs text-gray-200">
                    다른 길드에 본캐가 있는 부캐릭터입니다.
                  </p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 bg-gray-800 transform rotate-45"></div>
              </div>
            </div>
          </div>
          {onDeleteGuild && !isMainGuild && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50">
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

      <div className="min-h-[520px] max-h-[calc(100vh-200px)] overflow-y-auto p-4">
        <div className="mb-2 flex gap-2 items-center sticky top-0 bg-white z-10">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchCharacter}
              onChange={e => setSearchCharacter?.(e.target.value)}
              placeholder="캐릭터 이름으로 검색"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>

          <div className="flex gap-2">
            <div
              className="relative"
              ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                {selectedType ? (
                  <span>{selectedType}</span>
                ) : (
                  <span>캐릭터 분류</span>
                )}
                <IoChevronDown
                  className={`text-gray-400 transform transition-transform flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                  <button
                    onClick={() => {
                      setSelectedType('모두 보기')
                      setIsOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 truncate">
                    모두 보기
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('본캐')
                      setIsOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 truncate">
                    본캐
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('부캐')
                      setIsOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 truncate">
                    부캐
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('외부 부캐')
                      setIsOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 truncate">
                    외부 부캐
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('특이사항')
                      setIsOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 truncate">
                    특이사항
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setGridSize(gridSize === 8 ? 2 : gridSize * 2)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                <IoGridOutline className="text-lg" />
                <span>{gridSize}개 보기</span>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`grid grid-cols-1 ${
            gridSize === 2
              ? 'sm:grid-cols-2'
              : gridSize === 4
                ? 'sm:grid-cols-4'
                : 'sm:grid-cols-8'
          } gap-4 pb-4`}>
          {filteredMembers.map(member => (
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
                        <span className="text-xs text-gray-500">
                          Lv.{member.level}
                        </span>
                        {masterName && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              member.type === '본캐'
                                ? 'bg-blue-100 text-blue-700'
                                : member.type === '부캐' &&
                                    allMembers?.find(m =>
                                      m.memberDetailResponse?.find(
                                        m =>
                                          m.name ===
                                          member.mainCharacterInfo?.name
                                      )
                                    )
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}>
                            {member.type === '본캐'
                              ? '본캐'
                              : member.type === '부캐' &&
                                  allMembers?.find(m =>
                                    m.memberDetailResponse?.find(
                                      m =>
                                        m.name ===
                                        member.mainCharacterInfo?.name
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
                            외부 길드에 {member.mainCharacterInfo?.name}님의
                            부캐입니다.
                          </span>
                        )}
                    </div>
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
