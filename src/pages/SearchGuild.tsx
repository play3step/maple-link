import { FiUsers } from 'react-icons/fi'
import Button from '../components/common/Button'
import { useSearchGuild } from '../hooks/search/useSearchGuild'

import { servers } from '../data/worlds'
import { MemberContainer } from '../components/guild/MemberContainer'
import { Empty } from '../components/common/Empty'
import { ActionBtnList } from '../components/guild/ActionBtnList'
import { Guild } from '../types/guild'
import { useState } from 'react'

export const SearchGuild = () => {
  const {
    guildsInfo,
    selectedServer,
    setSelectedServer,
    guildName,
    setGuildName,
    handleGuildKeyPress,
    addGuildList,
    removeGuildList,
    guildList,
    searchGuildHandler,
    isLoading,
    selectedGuildMember,
    mainCharacterInfoSearchHandler,
    isUpdating
  } = useSearchGuild()

  const [searchCharacter, setSearchCharacter] = useState('')

  const handleSearchCharacter = (value: string) => {
    setSearchCharacter(value)
  }

  return (
    <div>
      {guildsInfo?.length === 0 ? (
        <div className="md:col-span-2 md:w-2/3 md:mx-auto bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center shadow-sm">
                <FiUsers className="text-purple-600 text-lg" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">
                길드 검색
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <select
                  value={selectedServer}
                  onChange={e => setSelectedServer(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white min-w-[120px]">
                  <option value="">서버 선택</option>
                  {servers.map(server => (
                    <option
                      key={server.id}
                      value={server.id}>
                      {server.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="길드 이름을 입력하세요"
                  value={guildName}
                  onChange={e => setGuildName(e.target.value)}
                  onKeyPress={handleGuildKeyPress}
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                />
                <Button
                  size="medium"
                  scheme="solid"
                  onClick={() => addGuildList(guildName)}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-sm transition-all shadow-sm">
                  추가
                </Button>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-gray-600">검색할 길드 목록</p>
                <div className="flex flex-wrap gap-1.5">
                  {guildList.map(guild => (
                    <div
                      key={guild}
                      className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-md group">
                      <span className="text-sm text-purple-700">{guild}</span>
                      <button
                        onClick={() => removeGuildList(guild)}
                        className="p-0.5 text-purple-400 hover:text-purple-600 rounded-full hover:bg-purple-100 transition-colors">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
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

              <Button
                size="medium"
                scheme="solid"
                onClick={searchGuildHandler}
                className="w-full text-sm bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm">
                길드 검색
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center gap-4 mb-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">길드 관리</h1>
              <p className="text-sm text-gray-600 mt-1">길드원 정보 관리</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <ActionBtnList
                  guildList={
                    (guildsInfo?.map(v => ({
                      worldName: v.worldName,
                      guildName: v.guildName
                    })) as Guild[]) || []
                  }
                  mainCharacterInfoSearchHandler={
                    mainCharacterInfoSearchHandler
                  }
                />
              </div>
            </div>
            <div className="p-6">
              <div className="min-h-[600px]">
                {(isLoading || isUpdating) && (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600 font-medium">
                      캐릭터 정보를 불러오는 중...
                    </p>
                  </div>
                )}
                {guildsInfo &&
                  guildsInfo.length > 0 &&
                  !isLoading &&
                  !isUpdating && (
                    <MemberContainer
                      members={selectedGuildMember?.guildMember}
                      allMembers={guildsInfo.map(v => ({
                        guildName: v.guildName,
                        guildMasterName: v.guildMasterName,
                        memberDetailResponse: v.guildMember
                      }))}
                      masterName={selectedGuildMember?.guildMasterName}
                      guildName={selectedGuildMember?.guildName}
                      onSelect={() => {}}
                      searchCharacter={searchCharacter}
                      setSearchCharacter={handleSearchCharacter}
                    />
                  )}
                {guildsInfo && guildsInfo.length === 0 && (
                  <Empty text="길드를 선택해주세요" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
