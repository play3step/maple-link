import { worldNames } from '../../data/worlds'

interface Props {
  world: string
  guild: string
}

export const GuildItme = ({ world, guild }: Props) => {
  const worldData = worldNames.find(v => v.name === world)
  return (
    <div className="p-small bg-secondary rounded-3xl text-small flex items-center gap-1">
      <img
        src={worldData?.icon}
        alt={world}
        className="w-4 h-4"
      />
      {`${world} - ${guild}`}
    </div>
  )
}
