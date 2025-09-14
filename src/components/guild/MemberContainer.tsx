import { Member, NexonMembers } from '../../types/guild'
import { useRef, useState } from 'react'
import {
  IoChevronDown,
  IoEllipsisVertical,
  IoSearchOutline,
  IoHelpCircleOutline,
  IoGridOutline
} from 'react-icons/io5'
import { MemberCard } from './member/MemberCard'

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
  const [sortType, setSortType] = useState('캐릭터 정렬')
  const [sortTypeOpen, setSortTypeOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('캐릭터 분류')
  const [gridSize, setGridSize] = useState(2)
  const [showPart, setShowPart] = useState(false) // 분류해서 보기

  const dropdownRef = useRef<HTMLDivElement>(null)

  if (!members) return null

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('정말로 이 길드를 삭제하시겠습니까?')) {
      onDeleteGuild?.()
    }
    setShowMenu(false)
  }

  const allMember = allMembers?.flatMap(m => m.memberDetailResponse) || []
  const filteredMembers = showPart
    ? allMember
        .filter(
          (member): member is Member =>
            member !== undefined &&
            member !== null &&
            member.type === '본캐' &&
            member.name
              .toLowerCase()
              .includes(searchCharacter?.toLowerCase() || '')
        )
        .map(mainChar => {
          // 부캐 찾기
          const subChars = allMember.filter(
            (sub): sub is Member =>
              sub !== undefined &&
              sub !== null &&
              sub.type === '부캐' &&
              sub.mainCharacterInfo?.name === mainChar.name
          )

          return {
            ...mainChar,
            subCharacters: subChars
          }
        })
    : members
        .filter(member => {
          const searchMatch = member.name
            .toLowerCase()
            .includes(searchCharacter?.toLowerCase() || '')

          if (selectedType === '모두 보기' || selectedType === '캐릭터 분류')
            return searchMatch

          if (selectedType === '본캐')
            return member.type === '본캐' && searchMatch

          if (selectedType === '부캐')
            return member.type === '부캐' && searchMatch

          if (selectedType === '외부 부캐')
            return (
              member.type === '부캐' &&
              !allMembers?.find(m =>
                m.memberDetailResponse?.find(
                  m => m.name === member.mainCharacterInfo?.name
                )
              )
            )

          if (selectedType === '특이사항')
            return member.description && searchMatch

          return false
        })
        .sort((a, b) => {
          if (sortType === '이름순') {
            return a.name.localeCompare(b.name)
          }
          if (sortType === '레벨순') {
            return Number(b.level) - Number(a.level)
          }
          return 0
        })

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg sm:rounded-xl shadow-lg">
      {guildName && (
        <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 sm:justify-between">
            {/* 길드 제목 부분 */}
            <div className="flex items-center gap-2">
              <h2 className="text-white text-base sm:text-lg font-semibold truncate">
                길드: {guildName}
              </h2>
              <div className="relative group flex-shrink-0">
                <IoHelpCircleOutline className="text-white/80 hover:text-white cursor-help transition-colors text-lg sm:text-xl" />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 text-white text-xs sm:text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-56 sm:w-64 z-50">
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

            <div className="flex flex-wrap gap-2 sm:gap-3 sm:mr-10">
              <p className="bg-gray-700/70 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-white text-xs sm:text-sm font-bold shadow-md">
                총 인원: {members.length}
              </p>
              <p className="bg-emerald-600/70 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-white text-xs sm:text-sm font-bold shadow-md">
                본캐: {members.filter(member => member.type === '본캐').length}
              </p>
              <p className="bg-purple-600/70 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-white text-xs sm:text-sm font-bold shadow-md">
                부캐:
                {
                  members.filter(
                    member =>
                      member.type === '부캐' &&
                      allMembers?.find(m =>
                        m.memberDetailResponse?.find(
                          m => m.name === member.mainCharacterInfo?.name
                        )
                      )
                  ).length
                }
              </p>
              <p className="bg-red-600/70 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-white text-xs sm:text-sm font-bold shadow-md">
                외부 부캐:
                {
                  members.filter(
                    member =>
                      member.type === '부캐' &&
                      !allMembers?.some(m =>
                        m.memberDetailResponse?.some(
                          m => m.name === member.mainCharacterInfo?.name
                        )
                      )
                  ).length
                }
              </p>
            </div>
          </div>

          {/* 삭제 버튼 */}
          {onDeleteGuild && !isMainGuild && (
            <div className="absolute right-3 sm:right-4 top-3 sm:top-1/2 sm:-translate-y-1/2 z-50">
              <button
                onClick={e => {
                  e.stopPropagation()
                  setShowMenu(!showMenu)
                }}
                className="text-white opacity-80 hover:opacity-100 transition-opacity p-1">
                <IoEllipsisVertical className="text-lg sm:text-xl" />
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-1 w-32 sm:w-36 bg-white rounded-lg shadow-lg py-1 z-10">
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 sm:px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 transition-colors">
                    길드 삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="min-h-[400px] sm:min-h-[520px] max-h-[calc(100vh-200px)] overflow-y-auto p-3 sm:p-4">
        {/* 검색 및 필터 영역 */}
        <div className="mb-3 sm:mb-2 flex flex-col sm:flex-row gap-2 sm:gap-2 sm:items-center sticky top-0 bg-white z-10 pb-2">
          {/* 검색창 */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchCharacter}
              onChange={e => setSearchCharacter?.(e.target.value)}
              placeholder="캐릭터 이름으로 검색"
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
          </div>

          <div className="grid grid-cols-2 sm:flex gap-2">
            {/* 정렬 드롭다운 */}
            <div
              className="relative"
              ref={dropdownRef}>
              <button
                onClick={() => setSortTypeOpen(!sortTypeOpen)}
                className="w-full flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium text-gray-700">
                <span className="truncate">{sortType || '캐릭터 정렬'}</span>
                <IoChevronDown
                  className={`text-gray-400 transform transition-transform flex-shrink-0 text-sm ${
                    sortTypeOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {sortTypeOpen && (
                <div className="absolute left-0 mt-2 w-full sm:w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                  <button
                    onClick={() => {
                      setSortType('이름순')
                      setSortTypeOpen(false)
                    }}
                    className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                    이름순
                  </button>
                  <button
                    onClick={() => {
                      setSortType('레벨순')
                      setSortTypeOpen(false)
                    }}
                    className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                    레벨순
                  </button>
                </div>
              )}
            </div>

            {/* 분류 드롭다운 */}
            <div
              className="relative"
              ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium text-gray-700">
                <span className="truncate">
                  {selectedType || '캐릭터 분류'}
                </span>
                <IoChevronDown
                  className={`text-gray-400 transform transition-transform flex-shrink-0 text-sm ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute left-0 mt-2 w-full sm:w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                  {['모두 보기', '본캐', '부캐', '외부 부캐', '특이사항'].map(
                    type => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedType(type)
                          setIsOpen(false)
                        }}
                        className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                        {type}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* 그리드 크기 변경 */}
            <div className="relative">
              <button
                onClick={() => setGridSize(gridSize === 8 ? 2 : gridSize * 2)}
                className="w-full flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium text-gray-700">
                <IoGridOutline className="text-base sm:text-lg flex-shrink-0" />
                <span className="hidden sm:inline">{gridSize}개 보기</span>
                <span className="sm:hidden">{gridSize}</span>
              </button>
            </div>

            {/* 분류해서 보기 토글 */}
            <div>
              <button
                onClick={() => setShowPart(prev => !prev)}
                className={`w-full flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border border-gray-200 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                  showPart
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}>
                <span className="hidden sm:inline">분류해서 보기</span>
                <span className="sm:hidden">분류</span>
              </button>
            </div>
          </div>
        </div>

        {/* 멤버 목록 */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {showPart ? (
            (filteredMembers as Member[]).map(member => (
              <div
                key={member.name}
                className="flex flex-col lg:flex-row gap-4 items-start border-b border-gray-100 pb-6 sm:pb-8">
                {/* 본캐 */}
                <div className="w-full lg:w-[300px] lg:flex-shrink-0">
                  <MemberCard
                    member={member}
                    onSelect={onSelect!}
                    allMembers={allMembers!}
                    gridSize={4}
                    masterName={masterName!}
                  />
                </div>
                {/* 부캐들 */}
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {member.subCharacters?.map(subChar => (
                      <MemberCard
                        key={subChar.name}
                        member={subChar as Member}
                        onSelect={onSelect!}
                        allMembers={allMembers!}
                        gridSize={4}
                        masterName={masterName!}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`grid gap-3 sm:gap-4 ${
                gridSize === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : gridSize === 4
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'
              }`}>
              {(filteredMembers as Member[]).map(member => (
                <MemberCard
                  key={member.name}
                  member={member}
                  onSelect={onSelect!}
                  allMembers={allMembers!}
                  gridSize={gridSize}
                  masterName={masterName!}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
