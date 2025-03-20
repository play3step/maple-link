import { Member } from '../../types/guild'
import { CharacterCard } from './CharacterCard'

interface Props {
  members: Member[] | undefined
  masterName?: string
  onSelect?: (member: Member) => void
}

export const MemberContainer = ({ members, masterName, onSelect }: Props) => {
  if (!members || members.length === 0) {
    return (
      <div className="text-sm text-gray-500">등록된 길드원이 없습니다.</div>
    )
  }

  const masterMembers = members.filter(member => member.name === masterName)
  const otherMembers = members.filter(member => member.name !== masterName)
  const sortedMembers = [...masterMembers, ...otherMembers]

  return (
    <div className="flex flex-wrap gap-4">
      {sortedMembers.map(v => (
        <CharacterCard
          key={v.name}
          member={v}
          isMaster={v.name === masterName}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
