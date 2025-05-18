import { IoDocumentTextOutline } from 'react-icons/io5'

export const ListSwitch = () => {
  return (
    <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${'bg-white text-blue-600 shadow-sm'}`}>
        <IoDocumentTextOutline className={`text-lg ${'text-blue-600'}`} />
        <span className="text-sm font-medium">내기록</span>
      </button>
    </div>
  )
}
