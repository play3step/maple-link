import { useState } from 'react'
import { Member, NexonMembers } from '../../types/guild'
import ModalLayout from './ModalLayout'
import {
  IoSettingsOutline,
  IoSaveOutline,
  IoPersonCircleOutline,
  IoSearchOutline,
  IoCloseCircleOutline,
  IoAddCircleOutline,
  IoChevronForwardOutline
} from 'react-icons/io5'
import { MdOutlineDescription } from 'react-icons/md'

interface Props {
  memberDetail: Member
  memberList: NexonMembers[]
}

export const DetailMemberModal = ({ memberDetail, memberList }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedTab, setSelectedTab] = useState<'info' | 'alts'>('info')

  // 부캐릭터 목록
  const [selectedAlts, setSelectedAlts] = useState<string[]>([])

  // 부캐릭터 검색
  const [searchName, setSearchName] = useState('')
  const [selectedGuild, setSelectedGuild] = useState<NexonMembers | null>(null)

  // 길드별로 멤버 그룹화
  const membersByGuild = memberList.reduce(
    (acc, guild) => {
      if (guild.memberDetailResponse) {
        acc[guild.guildName] = guild.memberDetailResponse.filter(
          member =>
            member.name.toLowerCase().includes(searchName.toLowerCase()) &&
            member.name !== memberDetail.name &&
            !selectedAlts.includes(member.name)
        )
      }
      return acc
    },
    {} as Record<string, Member[]>
  )

  const handleAddAlt = (name: string) => {
    setSelectedAlts(prev => [...prev, name])
    setSelectedGuild(null)
  }

  const handleRemoveAlt = (name: string) => {
    setSelectedAlts(prev => prev.filter(altName => altName !== name))
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'info':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={memberDetail.imagePath}
                alt={memberDetail.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {memberDetail.name}
                </h3>
                <p className="text-gray-600">{memberDetail.job}</p>
                <p className="text-sm text-gray-500">
                  Lv. {memberDetail.level}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MdOutlineDescription className="text-blue-500" />
                캐릭터 설명
              </h4>
              {isEditMode ? (
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="캐릭터에 대한 설명을 입력하세요..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              ) : (
                <p className="text-gray-700">
                  {description || '등록된 설명이 없습니다.'}
                </p>
              )}
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <IoPersonCircleOutline className="text-blue-500" />
                특이사항
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">주간 미션</span>
                  <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    완료
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'alts':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">부캐릭터 목록</h4>
              {isEditMode && (
                <button
                  onClick={() => setIsEditMode(false)}
                  className="text-sm text-blue-500 hover:text-blue-600">
                  완료
                </button>
              )}
            </div>

            {/* 선택된 부캐릭터 목록 */}
            {selectedAlts.length > 0 ? (
              <div className="space-y-2">
                {selectedAlts.map((alt, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                    <span className="text-blue-900">{alt}</span>
                    {isEditMode && (
                      <button
                        onClick={() => handleRemoveAlt(alt)}
                        className="p-1 text-blue-500 hover:text-blue-700">
                        <IoCloseCircleOutline className="text-xl" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-gray-500">
                {isEditMode
                  ? '부캐릭터를 추가해주세요'
                  : '등록된 부캐릭터가 없습니다'}
              </p>
            )}

            {/* 부캐릭터 추가 */}
            {isEditMode && (
              <div className="mt-6 space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    placeholder="캐릭터 이름으로 검색"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-2">
                  {!selectedGuild ? (
                    // 길드 선택
                    memberList.map((guild, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedGuild(guild)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg group">
                        <div>
                          <span className="text-gray-900 font-medium">
                            {guild.guildName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-500">
                          <span className="text-sm">
                            {membersByGuild[guild.guildName]?.length || 0}명
                          </span>
                          <IoChevronForwardOutline className="text-lg" />
                        </div>
                      </button>
                    ))
                  ) : (
                    // 캐릭터 선택
                    <>
                      <div className="sticky top-0 bg-white z-10 pb-2 mb-2 border-b border-gray-100">
                        <div className="flex items-center justify-between px-1">
                          <h4 className="font-medium text-gray-900">
                            {selectedGuild.guildName}
                          </h4>
                          <button
                            onClick={() => setSelectedGuild(null)}
                            className="text-sm text-blue-500 hover:text-blue-600">
                            길드 변경
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {membersByGuild[selectedGuild.guildName]?.map(
                          (member, index) => (
                            <button
                              key={index}
                              onClick={() => handleAddAlt(member.name)}
                              className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg group">
                              <div>
                                <span className="text-gray-900">
                                  {member.name}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                  Lv.{member.level}
                                </span>
                              </div>
                              <IoAddCircleOutline className="text-xl text-gray-400 group-hover:text-blue-500" />
                            </button>
                          )
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="w-full mt-4 px-4 py-2 text-blue-500 border border-blue-200 rounded-lg hover:bg-blue-50">
                부캐릭터 관리
              </button>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <ModalLayout
      size="small"
      title={memberDetail.name}
      description={`${memberDetail.job} • Lv.${memberDetail.level}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTab('info')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === 'info'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}>
              기본 정보
            </button>
            <button
              onClick={() => setSelectedTab('alts')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === 'alts'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}>
              부캐릭터
            </button>
          </div>
          {selectedTab !== 'alts' && (
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              {isEditMode ? (
                <>
                  <IoSaveOutline className="text-lg" />
                  저장
                </>
              ) : (
                <>
                  <IoSettingsOutline className="text-lg" />
                  수정
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
      </div>
    </ModalLayout>
  )
}
