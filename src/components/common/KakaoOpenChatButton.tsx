import { FiMessageCircle } from 'react-icons/fi'

interface Props {
  chatLink: string
  className?: string
}

const KakaoOpenChatButton = ({ chatLink, className = '' }: Props) => {
  const handleClick = () => {
    // 모바일 여부 체크
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      // 모바일에서는 카카오톡 앱으로 열기 시도
      window.location.href = chatLink
    } else {
      // 데스크톱에서는 새 창으로 열기
      window.open(chatLink, '_blank')
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 transition-colors ${className}`}>
      <FiMessageCircle className="w-5 h-5" />
      <span>문의하기</span>
    </button>
  )
}

export default KakaoOpenChatButton
