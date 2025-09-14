import { ModalType } from '../../store/modalStore'
import { ActionBtnList } from '../guild/ActionBtnList'
import { ListSwitch } from '../guild/ListSwitch'
import { Guild } from '../../types/guild'

interface Props {
  showModal: (name: ModalType) => void
  guildList: Guild[]
  handleDetect: () => void
  refreshMember: (guildId: number) => void
}

export const RoomActionBar = ({
  showModal,
  guildList,
  handleDetect,
  refreshMember
}: Props) => {
  return (
    <div className="p-6 border-b border-gray-100">
      <div className="flex justify-between items-center">
        <ActionBtnList
          showModal={showModal}
          guildList={guildList}
          handleDetect={handleDetect}
          refreshMember={refreshMember}
        />
        {guildList.length > 0 && <ListSwitch />}
      </div>
    </div>
  )
}
