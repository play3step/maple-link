interface Props {
  imagePath: string
  job: string
  level: string
  name: string
}

export const CharacterCard = ({ imagePath, job, level, name }: Props) => {
  return (
    <div className="w-36 h-[227px] border border-black rounded-lg flex flex-col p-4">
      <div className="flex flex-1 justify-center items-center">
        <img
          src={imagePath}
          alt={name}
          className="w-[72px] h-[72px]"
        />
      </div>
      <div className="text-center">
        <p className="text-sm">Lv. {level}</p>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-600">{job}</p>
      </div>
    </div>
  )
}
