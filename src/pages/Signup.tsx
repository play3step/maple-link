import { useState } from 'react'
import InputText from '../components/common/InputText'
import Button from '../components/common/Button'
import { addUserInfo } from '../apis/User/userController'
import Title from '../components/common/Title'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useUserStore } from '../store/userStore'

const Signup = () => {
  const [apikey, setApikey] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const nav = useNavigate()
  const { userLogout } = useAuth()
  const { userInfo } = useUserStore()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!apikey.trim()) return

    setIsLoading(true)
    try {
      const result = await addUserInfo(apikey)
      if (result?.generatedApiKey) {
        nav('/character')
      }
    } catch (error) {
      console.error('API 키 등록 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // API 키가 이미 있으면 캐릭터 페이지로 리다이렉트
  if (userInfo?.nexonApiKey) {
    nav('/character')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <Title size="large">메이플스토리 API 키 등록</Title>
            <p className="mt-2 text-sm text-gray-600">
              메이플스토리 OpenAPI를 사용하기 위해 API 키를 등록해주세요.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  API 키 발급 방법
                </h3>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>메이플스토리 OpenAPI 홈페이지 접속</li>
                  <li>회원가입 및 로그인</li>
                  <li>API 키 발급 신청</li>
                  <li>발급받은 API 키를 아래에 입력</li>
                </ol>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://openapi.nexon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  <span>메이플스토리 OpenAPI 바로가기</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="apikey"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="flex gap-3">
                  <InputText
                    id="apikey"
                    type="text"
                    value={apikey}
                    placeholder="발급받은 API Key를 입력"
                    onChange={e => setApikey(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  size="small"
                  scheme="outlined"
                  onClick={() => {
                    nav('/')
                    userLogout()
                  }}
                  disabled={isLoading}>
                  취소
                </Button>
                <Button
                  type="submit"
                  size="small"
                  scheme="outlined"
                  disabled={!apikey.trim() || isLoading}>
                  {isLoading ? '등록 중...' : 'API 키 등록하기'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
