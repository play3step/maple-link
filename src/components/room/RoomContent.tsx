import { Guild, Member, NexonMembers } from '../../types/guild'
import { MemberContainer } from '../guild/MemberContainer'
import { Empty } from '../common/Empty'

interface Props {
  nexonMembersLoading: boolean
  guildList: Guild[]
  selectMember: NexonMembers
  nexonMembers: NexonMembers[] | null
  main: string | undefined
  searchCharacter: string
  onMemberSelect: (type: string, member: Member) => void
  onSearchCharacter: (value: string) => void
  onDeleteGuild?: () => void
}

export const RoomContent = ({
  nexonMembersLoading,
  guildList,
  selectMember,
  nexonMembers,
  main,
  searchCharacter,
  onMemberSelect,
  onSearchCharacter,
  onDeleteGuild
}: Props) => {
  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
        {nexonMembersLoading && (
          <div className="flex flex-col justify-center items-center h-full py-12">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500 mb-3 sm:mb-4"></div>
            <p className="text-gray-600 font-medium text-sm sm:text-base text-center px-4">
              캐릭터 정보를 불러오는 중...
            </p>
          </div>
        )}
        {guildList.length > 0 ? (
          <MemberContainer
            members={selectMember?.memberDetailResponse as Member[]}
            allMembers={nexonMembers as NexonMembers[]}
            masterName={selectMember?.guildMasterName}
            guildName={selectMember?.guildName}
            onSelect={onMemberSelect}
            isMainGuild={selectMember?.guildName === main}
            searchCharacter={searchCharacter}
            setSearchCharacter={onSearchCharacter}
            onDeleteGuild={onDeleteGuild}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <Empty text="길드를 선택해주세요" />
          </div>
        )}
      </div>
    </div>
  )
}
