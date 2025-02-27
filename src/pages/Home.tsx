import Button from '../components/common/Button'
import SocialAuthButton from '../components/common/SocialAuthButton'
import Title from '../components/common/Title'

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
      <Title size="large">1</Title>
      <Title size="medium">1</Title>
      <Title size="small">1</Title>
    </h1>
  )
}

export default Home
