import { ModalType } from '../../store/modalStore'
import { Guild } from '../../types/guild'
import { useSearchParams } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useEffect, useState, useRef } from 'react'
import {
  IoAdd,
  IoGitCompare,
  IoChevronDown
  // IoPersonAdd
} from 'react-icons/io5'

interface Props {
  showModal: (name: ModalType) => void
  guildList: Guild[]
  handleDetect: () => void
}

export const ActionBtnList = ({
  showModal,
  guildList,
  handleDetect
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSwitch = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value === null) {
      newSearchParams.delete(QUERYSTRING.GUILD)
    } else {
      newSearchParams.set(QUERYSTRING.GUILD, value)
    }
    setSearchParams(newSearchParams)
  }

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.GUILD) && guildList.length > 0) {
      handleSwitch(guildList[0].guildName || '')
      setSelectedGuild(guildList[0])
    } else {
      const currentGuild = guildList.find(
        g => g.guildName === searchParams.get(QUERYSTRING.GUILD)
      )
      setSelectedGuild(currentGuild || null)
    }
  }, [searchParams, guildList])

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
      <button
        onClick={() => showModal('createGuild')}
        className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
        <IoAdd className="text-lg" />
        길드 생성
      </button>

      {guildList.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
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

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              {/* <button
                onClick={() => showModal('addCharacter')}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                title="캐릭터 추가">
                <IoPersonAdd className="text-lg text-blue-500" />
                <span className="sm:hidden md:inline">캐릭터 추가</span>
              </button> */}

              <button
                onClick={() => {
                  handleDetect()
                  showModal('detectMember')
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                <IoGitCompare className="text-lg text-gray-500" />
                <span className="sm:hidden md:inline">비교하기</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
