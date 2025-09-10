import { useState } from 'react'
import { FiAlertTriangle, FiSearch, FiInfo } from 'react-icons/fi'
import Button from '../../common/Button'
import { searchCharacterOcid } from '../../../apis/character/characterController'
import { useUserStore } from '../../../store/userStore'

interface CharacterErrorStateProps {
  type: 'character' | 'search'
}

export const CharacterErrorState = ({ type }: CharacterErrorStateProps) => {
  const [characterName, setCharacterName] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const { setCharacterOcid } = useUserStore()

  const searchCharacterHandler = async () => {
    if (characterName.trim() === '') {
      alert('캐릭터 이름을 입력해주세요.')
      return
    }
    setSearchLoading(true)

    try {
      const { ocid } = await searchCharacterOcid(characterName.trim())
      if (!ocid) {
        alert('캐릭터를 찾을 수 없습니다.')
        return
      }
      setCharacterOcid(ocid)
    } catch {
      alert('캐릭터 검색에 실패했습니다.')
    } finally {
      setSearchLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-4 sm:p-8">
      <div className="max-w-lg w-full bg-white rounded-xl p-6 sm:p-8 shadow-lg">
        <div>
          <div className="flex items-center justify-center mb-6 relative">
            {type === 'character' && (
              <div className="absolute top-0 right-0 flex flex-col items-center justify-center gap-2 hidden lg:block">
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
                          <span className="text-gray-400">
                            버튼을 눌러주세요
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="text-red-500 text-2xl" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-center text-gray-800 mb-2">
            캐릭터 정보를 불러올 수 없습니다
          </h1>
          <p className="text-gray-600 text-center mb-6">
            2023년 12월 21일 이후의 데이터만 조회할 수 있습니다.
          </p>

          {/* 모바일용 도움말 */}
          {type === 'character' && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6 lg:hidden">
              <div className="flex items-start gap-3">
                <FiInfo className="text-blue-500 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    본캐릭터는 넥슨 OpenAPI에서 레벨이 가장 높은 캐릭터를
                    기준으로 자동 설정됩니다.
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    정보가 정확하지 않다면{' '}
                    <strong className="text-red-600">동기화</strong> 버튼을
                    눌러주세요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 검색 폼 */}
        <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-fit self-start">
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shadow-sm">
                <FiSearch className="text-blue-600 text-lg" />
              </div>
              <h2 className="text-base font-semibold text-gray-800">
                캐릭터 검색
              </h2>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="캐릭터 이름을 입력하세요"
                value={characterName}
                onChange={e => setCharacterName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              />
              <Button
                size="medium"
                scheme="solid"
                disabled={searchLoading}
                className={`w-full text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm ${
                  searchLoading
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                onClick={searchCharacterHandler}>
                {searchLoading ? '검색 중...' : '검색'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
