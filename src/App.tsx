import { signInWithGoogle } from './firebase'

function App() {
  const handleGoogleLogin = async () => {
    const idToken = await signInWithGoogle()
    if (idToken) {
      console.log('구글 ID 토큰:', idToken)
    } else {
      console.log('로그인 실패')
    }
  }

  return (
    <>
      <button onClick={handleGoogleLogin}>로그인</button>
    </>
  )
}

export default App
