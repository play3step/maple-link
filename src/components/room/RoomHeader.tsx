import { IoArrowBack } from 'react-icons/io5'

interface Props {
  onBack: () => void
}

export const RoomHeader = ({ onBack }: Props) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 px-1 sm:px-0">
      <button
        onClick={onBack}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
        title="뒤로 가기">
        <IoArrowBack className="text-lg sm:text-xl text-gray-600" />
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
          길드 관리
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">
          길드원 정보 관리
        </p>
      </div>
    </div>
  )
}
