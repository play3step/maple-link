import { IoPersonAddOutline, IoPersonRemoveOutline } from 'react-icons/io5'
import { IoChevronDown, IoChevronForward } from 'react-icons/io5'
import ModalLayout from '../ModalLayout'
import { useModalStore } from '../../../store/modalStore'
import { useState } from 'react'
import { DetectResult } from '../../../types/guild'

interface Props {
  guildDetectList: DetectResult[]
  reflectDetectMember: (guildId: number) => Promise<void>
}

export const DetectMemberModal = ({
  guildDetectList,
  reflectDetectMember
}: Props) => {
  const [isApplying, setIsApplying] = useState(false)
  const [expandedGuilds, setExpandedGuilds] = useState<Record<number, boolean>>(
    {}
  )
  const { closeModal } = useModalStore()

  const toggleGuild = (guildId: number) => {
    setExpandedGuilds(prev => ({
      ...prev,
      [guildId]: !prev[guildId]
    }))
  }

  const handleApplyAll = async () => {
    setIsApplying(true)
    try {
      for (const guild of guildDetectList) {
        if (guild.toAdd.length > 0 || guild.toRemove.length > 0) {
          await reflectDetectMember(guild.guildId)
        }
      }
      alert('모든 변경사항이 적용되었습니다.')
      closeModal()
    } catch {
      alert('변경사항 적용 중 오류가 발생했습니다.')
    } finally {
      setIsApplying(false)
    }
  }

  const hasChanges = guildDetectList.some(
    guild => guild.toAdd.length > 0 || guild.toRemove.length > 0
  )

  return (
    <ModalLayout
      size="large"
      title="길드원 변경사항"
      description="넥슨 길드원 목록과 비교한 결과입니다"
      showFooterButtons={false}>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {guildDetectList.map(({ guildId, guildName, toAdd, toRemove }) => (
          <div
            key={guildId}
            className="border border-gray-200 rounded-lg">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleGuild(guildId)}>
              <div className="flex items-center gap-3">
                {expandedGuilds[guildId] ? (
                  <IoChevronDown className="text-gray-600" />
                ) : (
                  <IoChevronForward className="text-gray-600" />
                )}
                <h3 className="font-medium text-gray-900">{guildName}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {toAdd.length === 0 && toRemove.length === 0 ? (
                    <span className="text-gray-400">변경사항 없음</span>
                  ) : (
                    <>
                      <span className="flex items-center gap-1">
                        <IoPersonAddOutline className="text-green-600" />
                        {toAdd.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <IoPersonRemoveOutline className="text-red-600" />
                        {toRemove.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {expandedGuilds[guildId] && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <IoPersonAddOutline className="text-xl text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        신규 멤버 ({toAdd.length})
                      </h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 h-[300px] overflow-y-auto">
                      {toAdd.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                          추가할 길드원이 없습니다
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {toAdd.map((name, index) => (
                            <div
                              key={name + index}
                              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-green-200 transition-colors">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <span className="text-gray-900">{name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <IoPersonRemoveOutline className="text-xl text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        탈퇴 멤버 ({toRemove.length})
                      </h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 h-[300px] overflow-y-auto">
                      {toRemove.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">
                          삭제할 길드원이 없습니다
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {toRemove.map((name, index) => (
                            <div
                              key={name + index}
                              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-red-200 transition-colors">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <span className="text-gray-900">{name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {hasChanges && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleApplyAll}
            disabled={isApplying}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isApplying ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
                변경사항 적용 중...
              </div>
            ) : (
              '모든 변경사항 적용하기'
            )}
          </button>
        </div>
      )}
    </ModalLayout>
  )
}
