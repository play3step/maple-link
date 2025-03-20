import { Member } from '../../types/guild'

interface Props {
  member: Member
  isMaster?: boolean
  onSelect?: (member: Member) => void
}

export const CharacterCard = ({ member, isMaster, onSelect }: Props) => {
  return (
    <div
      className={`w-36 h-[227px] border-2 ${isMaster ? 'border-primary' : 'border-black'}  hover:border-red-500 rounded-lg flex flex-col p-4 cursor-pointer`}
      onClick={() => onSelect?.(member)}>
      <div className="flex flex-1 justify-center items-center">
        <img
          src={member.imagePath}
          alt={member.name}
          className="w-[72px] h-[72px]"
        />
      </div>
      <div className="text-center">
        <p className="text-sm">Lv. {member.level}</p>
        <p className="text-sm font-semibold">{member.name}</p>
        <p className="text-xs text-gray-600">{member.job}</p>
      </div>
    </div>
  )
}
