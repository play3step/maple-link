import { Member } from '../../types/guild'
import { CharacterCard } from './CharacterCard'

interface Props {
  list: Member[] | undefined
}

export const MemberContainer = ({ list }: Props) => {
  if (!list || list.length === 0) {
    return (
      <div className="text-sm text-gray-500">등록된 길드원이 없습니다.</div>
    )
  }
  return (
    <div className="flex flex-wrap gap-4">
      {list.map(v => (
        <CharacterCard list={v} />
      ))}
    </div>
  )
}
