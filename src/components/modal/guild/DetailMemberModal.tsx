import { useState } from 'react'
import { Member, NexonMembers } from '../../../types/guild'
import ModalLayout from '../ModalLayout'
import {
  IoSettingsOutline,
  IoSaveOutline
  // IoPersonCircleOutline
} from 'react-icons/io5'
import { MdOutlineDescription } from 'react-icons/md'

interface Props {
  memberDetail: Member
  memberList: NexonMembers[]
  descriptionMember?: (characterName: string, description: string) => void
}

export const DetailMemberModal = ({
  memberDetail,
  memberList,
  descriptionMember
}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [description, setDescription] = useState(
    memberDetail.mainCharacterInfo?.description || ''
  )
  const [selectedTab, setSelectedTab] = useState<'info' | 'alts'>('info')

  const subCharacterList =
    memberList.flatMap(n =>
      n.memberDetailResponse
        ?.filter(
          m => m.type === '부캐' && m.mainCharacterInfo?.id === memberDetail.id
        )
        .map(m => ({
          ...m,
          guildName: n.guildName
        }))
    ) ?? []

  const handleDescription = async (
    characterName: string,
    description: string
  ) => {
    if (isEditMode) {
      if (description !== '' && descriptionMember) {
        await descriptionMember(characterName, description)
      }
      setIsEditMode(false)
    } else {
      setIsEditMode(true)
    }
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
                className="w-32 h-32 rounded-lg object-cover"
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
            {/* 
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
            </div> */}
          </div>
        )
      case 'alts':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">부캐릭터 목록</h4>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)] pb-[100px]">
              {subCharacterList.map(alt => (
                <div
                  key={alt?.id}
                  className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={alt?.imagePath}
                      alt={alt?.name}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium text-blue-900">
                        {alt?.name} ({alt?.job}) Lv.{alt?.level}
                      </div>
                      <div className="text-xs text-gray-500">
                        길드: {alt?.guildName}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              onClick={() => handleDescription(memberDetail.name, description)}
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
