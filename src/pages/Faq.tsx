import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Title from '../components/common/Title'

export const Faq = () => {
  const nav = useNavigate()

  return (
    <div className="relative w-full h-full bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="absolute top-4 left-4 z-10">
        <Button
          size="small"
          scheme="outlined"
          onClick={() => nav('/')}>
          뒤로가기
        </Button>
      </div>

      <div className="w-full max-w-xl space-y-6 text-sm">
        <Title size="large">자주 묻는 질문 (FAQ)</Title>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-900">Q. API Key가 뭐예요?</p>
          <p className="text-gray-700 mt-1">
            A. 메이플스토리 유저 정보를 불러오기 위한 인증 키예요. 내 캐릭터
            정보, 길드 정보 등을 안전하게 가져오기 위해 필요해요.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-900">
            Q. API Key랑 로그인이 꼭 필요한가요?
          </p>
          <p className="text-gray-700 mt-1">
            A. 네, 캐릭터 및 기록한 길드 정보를 불러오기 위해 Google 로그인과
            Nexon API Key 두 가지 모두 필요해요.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-900">
            Q. API Key는 어떻게 발급하나요?
          </p>
          <p className="text-gray-700 mt-1">
            A. API 발급 안내 버튼을 눌러 Nexon 공식 페이지에서 발급받을 수
            있어요. 자세한 방법은{' '}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => nav('/apiguide')}>
              안내 페이지
            </span>
            에서 확인해 주세요.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-900">
            Q. 길드는 아무나 생성해서 관리할 수 있나요?
          </p>
          <p className="text-gray-700 mt-1">
            A. 아니요. 해당 길드의 마스터만 길드를 생성할 수 있어요. 다른 사람이
            길드 마스터일 경우, 그 사람을 초대한 뒤 길드 생성을 부탁해야 해요.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-900">
            Q. 혼자서만 길드 관리를 해야 하나요?
          </p>
          <p className="text-gray-700 mt-1">
            A. 아니요! 부마스터나 다른 길드원에게도 관리 권한을 부여해 함께
            관리할 수 있어요.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-900">
            Q. 부캐 정리는 어떻게 하나요?
          </p>
          <p className="text-gray-700 mt-1">
            A. 길드 관리 페이지에서 메인 캐릭터를 선택한 뒤, 부캐릭터를 연결하고
            역할이나 메모를 추가해 정리할 수 있어요.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-900">
            Q. 일정 관리는 어떤 식으로 하나요?
          </p>
          <p className="text-gray-700 mt-1">
            A. 이벤트 일정, 보스 스케줄 등을 직접 등록하고, 월 단위로 한눈에
            확인할 수 있어요.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="font-medium text-gray-900">
            Q. 모바일에서도 사용할 수 있나요?
          </p>
          <p className="text-gray-700 mt-1">
            A. 아니요, 아쉽게도 아직 모바일 버전은 없습니다. 추후에 개발할
            예정입니다.
          </p>
        </div>
      </div>
    </div>
  )
}
