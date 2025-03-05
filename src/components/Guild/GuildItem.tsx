import { WorldData } from '../../types/guild'

interface Props {
  world: WorldData
}

export const GuildItme = ({ world }: Props) => {
  return (
    <div className="p-small bg-secondary rounded-3xl text-small flex items-center gap-1">
      <img
        src={world.icon}
        alt={world.name}
        className="w-4 h-4"
      />
      {world.name}
    </div>
  )
}
