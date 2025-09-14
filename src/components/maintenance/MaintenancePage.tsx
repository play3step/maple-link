import { FiAlertCircle } from 'react-icons/fi'

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <FiAlertCircle className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          서버 점검 안내
        </h2>

        <div className="space-y-4 mb-8">
          <p className="text-gray-600">
            더 나은 서비스 제공을 위해 서버 점검을 진행하고 있습니다.
          </p>
          <p className="text-gray-600">
            잠시만 기다려 주시면 곧 서비스를 이용하실 수 있습니다.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600">
            자동으로 새로고침되어 서버 상태를 확인하고 있습니다.
          </p>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500"></div>
    </div>
  )
}

export default MaintenancePage
