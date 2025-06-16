import { ModalType } from '../../store/modalStore'
import { Guild } from '../../types/guild'
import { useSearchParams } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useEffect, useState, useRef, useCallback } from 'react'
import {
  IoAdd,
  IoGitCompare,
  IoChevronDown,
  IoRefreshCircleOutline
} from 'react-icons/io5'

interface Props {
  showModal?: (name: ModalType) => void
  guildList: Guild[]
  handleDetect?: () => void
  refreshMember?: (guildId: number) => void
  mainCharacterInfoSearchHandler?: () => void
}

export const ActionBtnList = ({
  showModal,
  guildList,
  handleDetect,
  refreshMember,
  mainCharacterInfoSearchHandler
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSwitch = useCallback(
    (value: string) => {
      const newSearchParams = new URLSearchParams(searchParams)
      if (value === null) {
        newSearchParams.delete(QUERYSTRING.GUILD)
      } else {
        newSearchParams.set(QUERYSTRING.GUILD, value)
      }
      setSearchParams(newSearchParams)
    },
    [searchParams, setSearchParams]
  )

  const handleRefresh = async (guildId: number) => {
    if (!refreshMember) return
    setIsLoading(true)
    try {
      await refreshMember(guildId)
    } catch (error) {
      console.error('Error refreshing members:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (guildList.length > 0) {
      const currentGuild = guildList.find(
        g => g.guildName === searchParams.get(QUERYSTRING.GUILD)
      )

      if (!currentGuild) {
        handleSwitch(guildList[0].guildName || '')
        setSelectedGuild(guildList[0])
      } else {
        setSelectedGuild(currentGuild)
      }
    }
  }, [guildList, searchParams, handleSwitch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="relative group w-full sm:w-auto">
        {showModal && (
          <>
            <button
              onClick={() => showModal('createGuild')}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              <IoAdd className="text-lg" />
              길드 생성
            </button>
            <div className="absolute left-0 -bottom-1 translate-y-full invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
              <div className="bg-gray-800 text-white text-base px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                ⚠️ 관리방 생성은 길드 마스터만 가능합니다.
                <br /> 마스터가 아니라면, 마스터를 그룹에 초대해 생성해주세요.
              </div>
            </div>
          </>
        )}
      </div>

      {guildList.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {showModal ? (
              <div
                className="relative w-full sm:w-auto"
                ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex items-center justify-between sm:justify-start gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                  {selectedGuild ? (
                    <span className="truncate">{selectedGuild.guildName}</span>
                  ) : (
                    <span>길드 선택</span>
                  )}
                  <IoChevronDown
                    className={`text-gray-400 transform transition-transform flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute left-0 mt-2 w-full sm:w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                    {guildList.map(guild => (
                      <button
                        key={`${guild.guildName}`}
                        onClick={() => {
                          handleSwitch(guild.guildName || '')
                          setSelectedGuild(guild)
                          setIsOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 truncate">
                        {guild.guildName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1">
                  {guildList.map(guild => (
                    <button
                      key={`${guild.guildName}`}
                      onClick={() => {
                        handleSwitch(guild.guildName || '')
                      }}
                      className="w-full border border-gray-200 rounded-lg text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 whitespace-nowrap text-ellipsis">
                      {guild.guildName}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    mainCharacterInfoSearchHandler?.()
                  }}
                  className="sm:w-32 shrink-0 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-1 py-2 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  본캐/부캐 조회
                </button>
              </div>
            )}

            {handleDetect && showModal && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                <div className="relative group">
                  {
                    <button
                      onClick={() => {
                        handleRefresh(selectedGuild?.guildId || 0)
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 group">
                      <IoRefreshCircleOutline className="text-lg text-blue-500 group-hover:rotate-180 transition-transform duration-500" />
                      {isLoading ? (
                        <div className="w-5 h-5 border-t-2 border-blue-500 rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="sm:hidden md:inline">
                            본/부캐 갱신
                          </span>
                        </>
                      )}
                    </button>
                  }

                  <div className="absolute left-0 -bottom-1 translate-y-full invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
                    <div className="bg-gray-800 text-white text-base px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                      캐릭터의 본/부캐 정보를 새로고침합니다
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <button
                    onClick={() => {
                      handleDetect()
                      showModal('detectMember')
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                    <IoGitCompare className="text-lg text-gray-500" />
                    <span className="sm:hidden md:inline">비교하기</span>
                  </button>
                  <div className="absolute left-0 -bottom-1 translate-y-full invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
                    <div className="bg-gray-800 text-white text-base px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                      기록된 길드원 정보를 게임 내 정보와 비교합니다.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
