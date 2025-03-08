import { Member } from '../../types/guild'

interface Props {
  list: Member
}

export const CharacterCard = ({ list }: Props) => {
  return (
    <div className="w-36 h-[227px] border border-black rounded-lg flex flex-col p-4">
      <div className="flex flex-1 justify-center items-center">
        <img
          src={list.imagePath}
          alt={list.name}
          className="w-[72px] h-[72px]"
        />
      </div>
      <div className="text-center">
        <p className="text-sm">Lv. {list.level}</p>
        <p className="text-sm font-semibold">{list.name}</p>
        <p className="text-xs text-gray-600">{list.job}</p>
      </div>
    </div>
  )
}
