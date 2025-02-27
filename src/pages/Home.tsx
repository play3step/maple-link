import Button from '../components/common/Button'
import SocialAuthButton from '../components/common/SocialAuthButton'

const Home = () => {
  return (
    <h1>
      <SocialAuthButton />
      <Button
        size="large"
        scheme="outlined">
        1
      </Button>
      <Button
        size="medium"
        scheme="solid">
        1
      </Button>
      <Button
        size="small"
        scheme="subtle">
        1
      </Button>
    </h1>
  )
}

export default Home
