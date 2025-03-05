import { SearchGuild, WorldName } from '../../types/guild'
import { GuildItme } from './GuildItem'

interface Props {
  list: SearchGuild[]
  onSelect: (id: string) => void
  server: string
}

export const GuildList = ({ list, onSelect, server }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {list.map(v => (
        <GuildItme
          key={v.world_name}
          world={v.world_name as WorldName}
          guild={v.guild_name}
          onSelect={onSelect}
          selected={server === v.world_name}
        />
      ))}
    </div>
  )
}
