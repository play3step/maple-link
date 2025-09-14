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
    <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div className="order-2 sm:order-1">
          <ActionBtnList
            showModal={showModal}
            guildList={guildList}
            handleDetect={handleDetect}
            refreshMember={refreshMember}
          />
        </div>
        {guildList.length > 0 && (
          <div className="order-1 sm:order-2 flex justify-center sm:justify-end">
            <ListSwitch />
          </div>
        )}
      </div>
    </div>
  )
}
