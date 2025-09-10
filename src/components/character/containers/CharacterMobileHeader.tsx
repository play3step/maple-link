interface CharacterMobileHeaderProps {
  type: 'character' | 'search'
  characterName: string
  setCharacterName: (name: string) => void
  searchLoading: boolean
  onSearch: () => void
  showStats: boolean
  setShowStats: (show: boolean) => void
}

export const CharacterMobileHeader = ({
  type,
  characterName,
  setCharacterName,
  searchLoading,
  onSearch,
  showStats,
  setShowStats
}: CharacterMobileHeaderProps) => {
  return (
    <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-10 mx-4 rounded-lg shadow-sm">
      <div className="px-4 py-4">
        {/* 캐릭터 검색 */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="캐릭터 이름 검색"
            className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={characterName}
            onChange={e => setCharacterName(e.target.value)}
          />
          <button
            onClick={onSearch}
            disabled={searchLoading}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm disabled:opacity-50 whitespace-nowrap">
            {searchLoading ? '검색중' : '검색'}
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setShowStats(true)}
            className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all duration-200 text-sm ${
              showStats ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}>
            스탯 정보
          </button>
          <button
            onClick={() => setShowStats(false)}
            className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all duration-200 text-sm ${
              !showStats ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}>
            장비 정보
          </button>
        </div>

        {/* 도움말 (캐릭터 타입일 때만) */}
        {type === 'character' && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-600 text-center">
              💡 본캐는 최고레벨 캐릭터로 자동설정됩니다. 정확하지 않다면 동기화
              버튼을 눌러주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
