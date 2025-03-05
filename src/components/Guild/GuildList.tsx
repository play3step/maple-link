import { SearchGuild, WorldName } from '../../types/guild'
import { GuildItme } from './GuildItem'

interface Props {
  list: SearchGuild[]
}

export const GuildList = ({ list }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {list.map(v => (
        <GuildItme
          key={v.world_name}
          world={v.world_name as WorldName}
          guild={v.guild_name}
        />
      ))}
    </div>
  )
}
