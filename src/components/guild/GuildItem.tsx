import { worldNames } from '../../data/worlds'

interface Props {
  world: string
  guild: string
  selected?: boolean
  onSelect: (id: string) => void
}

export const GuildItem = ({ world, guild, selected, onSelect }: Props) => {
  const worldData = worldNames.find(v => v.name === world)
  return (
    <div
      className={`p-small rounded-3xl text-small flex items-center gap-1 cursor-pointer ${
        selected ? 'bg-primary text-white' : 'bg-secondary'
      }`}
      onClick={() => onSelect(world)}>
      <img
        src={worldData?.icon}
        alt={world}
        className="w-4 h-4"
      />
      {`${world} - ${guild}`}
    </div>
  )
}
