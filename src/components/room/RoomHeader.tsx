import { IoArrowBack } from 'react-icons/io5'

interface Props {
  onBack: () => void
}

export const RoomHeader = ({ onBack }: Props) => {
  return (
    <div className="flex items-center gap-4 mb-5">
      <button
        onClick={onBack}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="뒤로 가기">
        <IoArrowBack className="text-xl text-gray-600" />
      </button>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">길드 관리</h1>
        <p className="text-sm text-gray-600 mt-1">길드원 정보 관리</p>
      </div>
    </div>
  )
}
