import gogle from '../../assets/gogle.svg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SocialAuthButton = ({ children, onClick }: Props) => {
  return (
    <button
      className="relative w-full h-14 rounded-lg border border-gray-300 flex items-center justify-center transition hover:bg-gray-100"
      onClick={onClick}>
      <img
        src={gogle}
        alt="Google 로고"
        className="absolute left-4 w-6 h-6"
      />
      <span className="font-medium text-gray-800">{children}</span>
    </button>
  )
}

export default SocialAuthButton
