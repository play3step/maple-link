import gogle from '../../assets/gogle.svg'

const SocialAuthButton = () => {
  return (
    <button className="relative w-[424px] h-16 border border-black rounded flex items-center justify-center">
      <img
        src={gogle}
        alt="google 로그인"
        className="absolute left-4"
      />
      <span>Google 로그인</span>
    </button>
  )
}

export default SocialAuthButton
