import { useState } from 'react'
import { Guild, NexonMembers, Member } from '../../types/guild'
import ModalLayout from './ModalLayout'
import {
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoSaveOutline
} from 'react-icons/io5'
import { MdOutlineDescription } from 'react-icons/md'
import { PiGameControllerDuotone } from 'react-icons/pi'

interface Props {
  member: Member
  guildList?: Guild[]
  memberList?: NexonMembers[]
}

export const DetailMemberModal = ({ member, guildList, guildInfo }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedTab, setSelectedTab] = useState<'info' | 'alts' | 'notes'>(
    'info'
  )

  const handleSave = () => {
    setIsEditMode(false)
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'info':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={member.imagePath}
                alt={member.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.job}</p>
                <p className="text-sm text-gray-500">Lv. {member.level}</p>
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
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <PiGameControllerDuotone className="text-blue-500" />
                부캐릭터 목록
              </h4>
              {isEditMode && (
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  + 부캐릭터 추가
                </button>
              )}
            </div>
            <div className="space-y-2">
              <div className="text-gray-500 text-center py-8">
                등록된 부캐릭터가 없습니다.
              </div>
            </div>
          </div>
        )
      case 'notes':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">메모</h4>
            {isEditMode ? (
              <textarea
                placeholder="메모를 입력하세요..."
                className="w-full h-48 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            ) : (
              <p className="text-gray-500 text-center py-8">
                등록된 메모가 없습니다.
              </p>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <ModalLayout size="small">
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
            <button
              onClick={() => setSelectedTab('notes')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === 'notes'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}>
              메모
            </button>
          </div>
          <button
            onClick={() => (isEditMode ? handleSave() : setIsEditMode(true))}
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
        </div>

        <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
      </div>
    </ModalLayout>
  )
}
