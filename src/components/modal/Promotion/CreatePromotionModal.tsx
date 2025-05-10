import ModalLayout from '../ModalLayout'

export const CreatePromotionModal = () => {
  return (
    <ModalLayout size="small">
      <div
        className="bg-white rounded-lg w-full max-w-md"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">길드 홍보 등록</h2>
          <input
            type="text"
            placeholder="길드 이름"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            placeholder="길드 설명"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </ModalLayout>
  )
}
