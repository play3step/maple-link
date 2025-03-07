import { useModalStore } from '../../store/modalStore'

interface ModalLayoutProps {
  children: React.ReactNode
}

const ModalLayout = ({ children }: ModalLayoutProps) => {
  const { closeModal } = useModalStore()
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className=" w-[472px] max-h-[649px] bg-white rounded-2xl p-5">
        <div className="w-full h-full border rounded-lg p-5 flex flex-col items-center gap-6">
          <span onClick={closeModal}>X</span>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalLayout
