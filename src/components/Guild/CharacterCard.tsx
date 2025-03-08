import { Member } from '../../types/guild'

interface Props {
  members: Member
  isMaster?: boolean
}

export const CharacterCard = ({ members, isMaster }: Props) => {
  return (
    <div
      className={`w-36 h-[227px] border-2 ${isMaster ? 'border-primary' : 'border-black'} rounded-lg flex flex-col p-4`}>
      <div className="flex flex-1 justify-center items-center">
        <img
          src={members.imagePath}
          alt={members.name}
          className="w-[72px] h-[72px]"
        />
      </div>
      <div className="text-center">
        <p className="text-sm">Lv. {members.level}</p>
        <p className="text-sm font-semibold">{members.name}</p>
        <p className="text-xs text-gray-600">{members.job}</p>
      </div>
    </div>
  )
}
