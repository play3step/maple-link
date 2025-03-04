import Button from '../components/common/Button'
import { CreateGuildModal } from '../components/modal/CreateGuildModal'

const Guild = () => {
  return (
    <>
      <Button
        size="small"
        scheme="solid">
        길드 생성
      </Button>
      <CreateGuildModal />
    </>
  )
}

export default Guild
