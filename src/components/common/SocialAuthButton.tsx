import gogle from '../../assets/gogle.svg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google'
  onClick: () => Promise<void>
}

const SocialAuthButton = ({ provider, onClick }: Props) => {
  const getProviderText = () => {
    switch (provider) {
      case 'google':
        return 'Google로 시작하기'
      default:
        return '시작하기'
    }
  }

  return (
    <button
      className="relative w-fit h-10 rounded-lg bg-white text-gray-800 flex items-center justify-center px-4 transition-all duration-300 hover:bg-gray-50"
      onClick={onClick}>
      <img
        src={gogle}
        alt="Google 로고"
        className="w-5 h-5 mr-2"
      />
      <span className="font-medium text-gray-800">{getProviderText()}</span>
    </button>
  )
}

export default SocialAuthButton
