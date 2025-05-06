import { useGuildDetect } from '../../hooks/Guild/useGuildDetect'
import { IoPersonAddOutline, IoPersonRemoveOutline } from 'react-icons/io5'
import ModalLayout from './ModalLayout'
import { useModalStore } from '../../store/modalStore'

interface Props {
  guildId?: number
}

export const DetectMemberModal = ({ guildId }: Props) => {
  const { detectMember } = useGuildDetect(guildId)
  const { closeModal } = useModalStore()

  const handleSubmit = () => {
    // 변경사항 적용 로직
    closeModal()
  }

  return (
    <ModalLayout
      size="medium"
      title="길드원 변경사항"
      description="넥슨 길드원 목록과 비교한 결과입니다"
      onSubmit={handleSubmit}>
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <IoPersonAddOutline className="text-xl text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              추가 예정 (신규 멤버) ({detectMember?.toAdd.length ?? 0})
            </h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 h-[400px] overflow-y-auto">
            {detectMember?.toAdd.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                추가할 길드원이 없습니다
              </p>
            ) : (
              <div className="space-y-2">
                {detectMember?.toAdd.map((name, index) => (
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
              삭제 예정 (탈퇴 멤버) ({detectMember?.toRemove.length ?? 0})
            </h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 h-[400px] overflow-y-auto">
            {detectMember?.toRemove.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                삭제할 길드원이 없습니다
              </p>
            ) : (
              <div className="space-y-2">
                {detectMember?.toRemove.map((name, index) => (
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
    </ModalLayout>
  )
}
