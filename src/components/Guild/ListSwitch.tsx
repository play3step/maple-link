import { useGuildMember } from '../../hooks/Guild/useGuildMember'
import { IoDocumentTextOutline } from 'react-icons/io5'

export const ListSwitch = () => {
  const { view, setView } = useGuildMember()

  return (
    <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
      <button
        onClick={() => setView('내기록')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          view === '내기록'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}>
        <IoDocumentTextOutline
          className={`text-lg ${
            view === '내기록' ? 'text-blue-600' : 'text-gray-500'
          }`}
        />
        <span className="text-sm font-medium">내기록</span>
      </button>
    </div>
  )
}
