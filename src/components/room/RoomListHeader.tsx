import { IoAdd } from 'react-icons/io5'

interface Props {
  onCreateRoom: () => void
}

export const RoomListHeader = ({ onCreateRoom }: Props) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">길드 관리 홈</h1>
        <p className="text-gray-600 mt-2">관리중인 길드방 목록입니다</p>
      </div>
      <div className="relative group">
        <button
          onClick={onCreateRoom}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          <IoAdd className="text-xl" />새 관리방
        </button>
        <div className="absolute right-0 -bottom-1 translate-y-full invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-20">
          <div className="bg-gray-800 text-white text-base px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            ⚠️ 관리방 생성은 길드 마스터만 가능합니다.
            <br /> 마스터가 아니라면, 해당 마스터가 생성후 그룹에 초대해 주세요.
          </div>
        </div>
      </div>
    </div>
  )
}
