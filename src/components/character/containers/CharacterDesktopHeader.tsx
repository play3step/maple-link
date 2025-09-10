interface CharacterDesktopHeaderProps {
  type: 'character' | 'search'
  characterName: string
  setCharacterName: (name: string) => void
  searchLoading: boolean
  onSearch: () => void
  showStats: boolean
  setShowStats: (show: boolean) => void
}

export const CharacterDesktopHeader = ({
  type,
  characterName,
  setCharacterName,
  searchLoading,
  onSearch,
  showStats,
  setShowStats
}: CharacterDesktopHeaderProps) => {
  return (
    <div className="hidden lg:flex justify-between items-center mb-2 max-w-6xl mx-auto w-full px-4">
      {type === 'character' ? (
        <div className="flex flex-col items-center justify-center gap-2 mr-24">
          <div className="relative group">
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 top-full left-1/2 -translate-x-1/2 mt-2 z-10">
              <div className="bg-white border border-gray-100 text-gray-600 px-4 py-3 rounded-xl shadow-lg relative">
                <div className="absolute w-3 h-3 bg-white border-t border-l border-gray-100 transform -rotate-45 left-1/2 -translate-x-1/2 -top-1.5"></div>
                <div className="w-[280px]">
                  <p className="text-sm leading-relaxed">
                    본캐릭터는 넥슨 OpenAPI에서 레벨이 가장 높은 캐릭터를
                    기준으로 자동 설정됩니다.
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-1">
                    <span className="text-gray-400">
                      정보가 정확하지 않다면
                    </span>
                    <strong className="text-red-500">동기화</strong>
                    <span className="text-gray-400">버튼을 눌러주세요</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-64"></div>
      )}

      {/* 탭 버튼 */}
      <div className="bg-white shadow-sm rounded-lg p-1 flex gap-1">
        <button
          onClick={() => setShowStats(true)}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            showStats
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}>
          스탯 정보
        </button>
        <button
          onClick={() => setShowStats(false)}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
            !showStats
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50'
          }`}>
          장비 정보
        </button>
      </div>

      {/* 검색 입력 */}
      <div className="flex items-center gap-2 w-64">
        <input
          type="text"
          placeholder="캐릭터 이름을 입력해주세요"
          className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          value={characterName}
          onChange={e => setCharacterName(e.target.value)}
        />
        <button
          onClick={onSearch}
          disabled={searchLoading}
          className={`px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm flex-shrink-0 ${
            searchLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}>
          {searchLoading ? '검색 중...' : '검색'}
        </button>
      </div>
    </div>
  )
}
