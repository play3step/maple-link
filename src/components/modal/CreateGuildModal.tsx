import InputText from '../common/InputText'
import { GuildList } from '../Guild/GuildList'
import ModalLayout from './ModalLayout'

export const CreateGuildModal = () => {
  return (
    <ModalLayout>
      <InputText></InputText>
      <GuildList />
    </ModalLayout>
  )
}
