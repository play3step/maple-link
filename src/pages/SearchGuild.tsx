import { FiUsers, FiArrowLeft } from 'react-icons/fi'
import Button from '../components/common/Button'
import { useGuildSearch } from '../hooks/search/useGuildSearch'
import { servers } from '../data/worlds'
import { MemberContainer } from '../components/guild/MemberContainer'
import { Empty } from '../components/common/Empty'
import { ActionBtnList } from '../components/guild/ActionBtnList'
import { Guild, Member } from '../types/guild'
import { useState } from 'react'
import { useModalStore } from '../store/modalStore'
import { DetailMemberModal } from '../components/modal/guild/DetailMemberModal'
import { Loading } from '../components/common/Loading'

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
    searchMemberInfo,
    isUpdatingMembers,
    resetSearchParams
  } = useGuildSearch()

  const [searchCharacter, setSearchCharacter] = useState('')
  const { activeModal, openModal } = useModalStore()

  const [selectedMember, setSelectedMember] = useState<{
    type: string
    member: Member | null
  }>({
    type: '',
    member: null
  })

  const handleSearchCharacter = (value: string) => {
    setSearchCharacter(value)
  }

  const handleMemberSelect = async (type: string, member: Member) => {
    setSelectedMember({ type: type, member: member })
    if (type !== '미지정') {
      openModal('detailMember')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading
          size="large"
          text="길드 정보를 불러오는 중입니다..."
        />
      </div>
    )
  }

  return (
    <div className="h-full">
      {guildsInfo === undefined ? (
        <div className=" py-6 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              {/* 헤더 */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center shadow-sm">
                  <FiUsers className="text-purple-600 text-lg" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-base font-semibold text-gray-800">
                    길드 검색
                  </h2>
                  <p className="text-sm text-gray-500">
                    최대 4개까지 검색 가능
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* 서버 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    서버 선택
                  </label>
                  <select
                    value={selectedServer}
                    onChange={e => setSelectedServer(e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                    <option value="">서버를 선택해주세요</option>
                    {servers.map(server => (
                      <option
                        key={server.id}
                        value={server.id}>
                        {server.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 길드 이름 입력 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    길드 이름
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="길드 이름을 입력하세요"
                      value={guildName}
                      onChange={e => setGuildName(e.target.value)}
                      onKeyPress={handleGuildKeyPress}
                      className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    />
                    <Button
                      size="medium"
                      scheme="solid"
                      onClick={() => addGuildList(guildName)}
                      className="px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-sm transition-all shadow-sm whitespace-nowrap">
                      추가
                    </Button>
                  </div>
                </div>

                {/* 추가된 길드 목록 */}
                {guildList.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      검색할 길드 목록
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {guildList.map(guild => (
                        <div
                          key={guild}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg group">
                          <span className="text-sm text-purple-700">
                            {guild}
                          </span>
                          <button
                            onClick={() => removeGuildList(guild)}
                            className="p-1 text-purple-400 hover:text-purple-600 rounded-full hover:bg-purple-100 transition-colors">
                            <svg
                              className="w-4 h-4"
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

                {/* 검색 버튼 */}
                <Button
                  size="medium"
                  scheme="solid"
                  onClick={searchGuildHandler}
                  className="w-full py-3 text-sm bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm font-medium">
                  길드 검색하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          {/* 모바일 헤더 */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={resetSearchParams}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors sm:hidden">
                    <FiArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                      길드 관리
                    </h1>
                    <p className="text-sm text-gray-600 hidden sm:block">
                      길드원 정보 관리
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetSearchParams}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all shadow-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  다른 길드 검색
                </button>
              </div>
            </div>
          </div>

          {/* 컨텐츠 */}
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* 액션 버튼 영역 */}
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <div className="overflow-x-auto">
                    <ActionBtnList
                      guildList={
                        (guildsInfo?.map(v => ({
                          worldName: v.worldName,
                          guildName: v.guildName
                        })) as Guild[]) || []
                      }
                      mainCharacterInfoSearchHandler={searchMemberInfo}
                      isUpdating={isUpdatingMembers}
                    />
                  </div>
                </div>

                {/* 멤버 컨테이너 */}
                <div className="p-4 sm:p-6">
                  <div className="min-h-[400px] sm:min-h-[600px]">
                    {/* 로딩 상태 */}
                    {(isLoading || isUpdatingMembers) && (
                      <div className="flex flex-col justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-600 font-medium text-center">
                          캐릭터 정보를 불러오는 중...
                        </p>
                      </div>
                    )}

                    {/* 멤버 정보 */}
                    {guildsInfo &&
                      guildsInfo.length > 0 &&
                      !isLoading &&
                      !isUpdatingMembers && (
                        <MemberContainer
                          members={selectedGuildMember?.guildMember}
                          allMembers={guildsInfo.map(v => ({
                            guildName: v.guildName,
                            guildMasterName: v.guildMasterName,
                            memberDetailResponse: v.guildMember
                          }))}
                          masterName={selectedGuildMember?.guildMasterName}
                          guildName={selectedGuildMember?.guildName}
                          onSelect={handleMemberSelect}
                          searchCharacter={searchCharacter}
                          setSearchCharacter={handleSearchCharacter}
                        />
                      )}

                    {/* 빈 상태 */}
                    {guildsInfo && guildsInfo.length === 0 && (
                      <Empty text="길드를 선택해주세요" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 모달 */}
      {activeModal === 'detailMember' &&
        selectedMember &&
        selectedMember.member &&
        guildsInfo && (
          <DetailMemberModal
            memberDetail={selectedMember.member}
            memberList={guildsInfo.map(v => ({
              guildName: v.guildName,
              guildMasterName: v.guildMasterName,
              memberDetailResponse: v.guildMember
            }))}
          />
        )}
    </div>
  )
}
