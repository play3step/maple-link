import { worldNames } from '../../data/worlds'
import { GuildItme } from './GuildItem'

export const GuildList = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {worldNames.map(world => (
        <GuildItme
          key={world.name}
          world={world}
        />
      ))}
    </div>
  )
}
