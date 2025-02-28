import gogle from '../../assets/gogle.svg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SocialAuthButton = ({ children, onClick }: Props) => {
  return (
    <button
      className="relative w-[424px] h-16 border border-black rounded flex items-center justify-center transition duration-200 hover:bg-gray-100"
      onClick={onClick}>
      <img
        src={gogle}
        alt="google 로그인"
        className="absolute left-6 w-10"
      />
      <span className="font-semibold text-medium">{children} 로그인</span>
    </button>
  )
}

export default SocialAuthButton
