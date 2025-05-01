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

  if (size === 'full') {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="w-full h-full p-4 sm:p-5 flex flex-col">
          <div className="flex-1 overflow-y-auto">{children}</div>
          <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
            {onSubmit && (
              <Button
                size="small"
                scheme="solid"
                onClick={onSubmit}
                className="px-4">
                확인
              </Button>
            )}
            <Button
              size="small"
              scheme="outlined"
              onClick={closeModal}
              className="px-4">
              닫기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-y-auto"
      onClick={closeModal}>
      <div
        className={`
          ${
            size === 'small'
              ? 'sm:w-[90%] md:w-[472px]'
              : 'sm:w-[90%] md:w-[80%] lg:w-[864px]'
          } 
          max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden
        `}
        onClick={e => e.stopPropagation()}>
        <div className="w-full h-full p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex-1 overflow-y-auto">{children}</div>
          <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
            {onSubmit && (
              <Button
                size="small"
                scheme="solid"
                onClick={onSubmit}
                className="px-4">
                확인
              </Button>
            )}
            <Button
              size="small"
              scheme="outlined"
              onClick={closeModal}
              className="px-4">
              닫기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalLayout
