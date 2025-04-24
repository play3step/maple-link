import { useEffect } from 'react'
import { useModalStore } from '../../store/modalStore'
import { Size } from '../../types'
import Button from '../common/Button'

interface ModalLayoutProps {
  children: React.ReactNode
  onSubmit?: () => void
  size: Size
}

const ModalLayout = ({ children, onSubmit, size }: ModalLayoutProps) => {
  const { closeModal } = useModalStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal])

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50"
      onClick={closeModal}>
      <div
        className={` ${size === 'medium' ? 'w-[864px] h-[649px]' : 'w-[472px]'} max-h-[649px] bg-white rounded-2xl p-5`}
        onClick={e => e.stopPropagation()}>
        <div className="w-full h-full border rounded-lg p-5 flex flex-col items-center gap-6">
          <div className="flex-grow h-full w-full">{children}</div>
          <div className="flex gap-2">
            <Button
              size="small"
              scheme="solid"
              onClick={onSubmit}>
              확인
            </Button>
            <Button
              size="small"
              scheme="outlined"
              onClick={closeModal}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalLayout
