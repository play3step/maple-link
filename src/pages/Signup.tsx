import { useState } from 'react'
import InputText from '../components/common/InputText'
import Button from '../components/common/Button'
import { addUserInfo } from '../apis/User/userController'

const Signup = () => {
  const [apikey, setApike] = useState<string>('')
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await addUserInfo(apikey)
    console.log('서버 응답:', data)
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset className="flex flex-col gap-4 items-center">
        <label>API KEY</label>
        <InputText
          type="text"
          placeholder="API Key를 입력해주세요."
          onChange={e => setApike(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <Button
          size="small"
          scheme="solid">
          생성하기
        </Button>
      </fieldset>
    </form>
  )
}
export default Signup
