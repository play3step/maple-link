import { useNavigate } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi'
import { useGuildSearch } from '../../hooks/search/useGuildSearch'
import { servers } from '../../data/worlds'
import Button from '../common/Button'

const GuildSearchSection = () => {
  const nav = useNavigate()
  const {
    selectedServer,
    setSelectedServer,
    guildList,
    searchGuildHandler,
    addGuildList,
    removeGuildList,
    handleGuildKeyPress,
    guildName,
    setGuildName
  } = useGuildSearch()

  const onSearchGuild = async () => {
    nav('/searchGuild')
    searchGuildHandler()
  }

  return (
    <div className="col-span-1 lg:col-span-2 lg:max-w-4xl lg:mx-auto bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center shadow-sm">
            <FiUsers className="text-purple-600 text-lg" />
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-gray-800">
            길드 검색 <span className="text-xs text-gray-500">(최대 4개)</span>
          </h2>
        </div>

        <div className="space-y-4">
          {/* 서버 선택과 입력 필드 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedServer}
              onChange={e => setSelectedServer(e.target.value)}
              className="w-full sm:w-auto px-3 py-3 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white min-w-[140px]">
              <option value="">서버 선택</option>
              {servers.map(server => (
                <option
                  key={server.id}
                  value={server.id}>
                  {server.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2 flex-1">
              <input
                type="text"
                placeholder="길드 이름을 입력하세요"
                value={guildName}
                onChange={e => setGuildName(e.target.value)}
                onKeyPress={handleGuildKeyPress}
                className="flex-1 px-4 py-3 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              />
              <Button
                size="medium"
                scheme="solid"
                onClick={() => addGuildList(guildName)}
                className="px-4 py-3 sm:py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-sm transition-all shadow-sm whitespace-nowrap">
                추가
              </Button>
            </div>
          </div>

          {/* 길드 목록 */}
          {guildList.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-600">검색할 길드 목록</p>
              <div className="flex flex-wrap gap-2">
                {guildList.map(guild => (
                  <div
                    key={guild}
                    className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg group">
                    <span className="text-sm text-purple-700">{guild}</span>
                    <button
                      onClick={() => removeGuildList(guild)}
                      className="p-1 text-purple-400 hover:text-purple-600 rounded-full hover:bg-purple-100 transition-colors">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            size="medium"
            scheme="solid"
            onClick={onSearchGuild}
            className="w-full py-3 sm:py-2.5 text-sm bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm font-medium">
            길드 검색하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GuildSearchSection
