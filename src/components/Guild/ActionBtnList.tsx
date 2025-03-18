import { ModalType } from '../../store/modalStore'
import { Guild } from '../../types/guild'
import Button from '../common/Button'

interface Props {
  showModal: (name: ModalType) => void
  guildList: Guild[]
}

export const ActionBtnList = ({ showModal, guildList }: Props) => {
  console.log(guildList)
  return (
    <div className="flex gap-2">
      <Button
        size="small"
        scheme="solid"
        onClick={() => showModal('createGuild')}>
        길드 생성
      </Button>
      {guildList.length > 0 && (
        <>
          {guildList.map(v => (
            <Button
              key={`${v.worldName}-${v.guildName}`}
              size="small"
              scheme="solid">
              {v.worldName} - {v.guildName}
            </Button>
          ))}
          <Button
            size="small"
            scheme="outlined"
            onClick={() => showModal('detectMember')}>
            비교 하기
          </Button>
        </>
      )}
    </div>
  )
}
