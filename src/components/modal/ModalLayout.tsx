import { useEffect } from 'react'
import { useModalStore } from '../../store/modalStore'
import { Size } from '../../types'
import Button from '../common/Button'
import { IoClose } from 'react-icons/io5'

interface ModalLayoutProps {
  children: React.ReactNode
  onSubmit?: () => void
  size: Size
  title?: string
  description?: string
  titleIcon?: React.ReactNode
  showHeaderClose?: boolean
  showFooterButtons?: boolean
}

const ModalLayout = ({
  children,
  onSubmit,
  size,
  title,
  description,
  titleIcon,
  showHeaderClose = true,
  showFooterButtons = true
}: ModalLayoutProps) => {
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
      className="fixed h-full inset-0 z-50 bg-black/50 flex justify-center items-center p-4 overflow-y-auto"
      onClick={closeModal}>
      <div
        className={`
          ${
            size === 'full'
              ? 'w-[60%] h-full'
              : size === 'small'
                ? 'sm:w-[90%] md:w-[472px]'
                : 'sm:w-[90%] md:w-[80%] lg:w-[864px]'
          }
          bg-white max-h-[90vh] rounded-2xl shadow-xl overflow-hidden
        `}
        onClick={e => e.stopPropagation()}>
        <div className="w-full h-full flex flex-col">
          {(title || showHeaderClose) && (
            <div className="flex items-center justify-between p-6 pb-0">
              {title && (
                <div className="flex items-center gap-2">
                  {titleIcon}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {title}
                    </h2>
                    {description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {showHeaderClose && (
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
                  title="닫기">
                  <IoClose className="text-xl text-gray-500" />
                </button>
              )}
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
          {showFooterButtons && (
            <div className="flex gap-2 justify-end p-6 pt-4 border-t border-gray-100">
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
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalLayout
