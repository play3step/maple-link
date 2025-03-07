import { SearchGuild, WorldName } from '../../types/guild'
import { GuildItem } from './GuildItem'

interface Props {
  list: SearchGuild[]
  onSelect: (id: string) => void
  server: string
}

export const GuildList = ({ list, onSelect, server }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {list.map(v => (
        <GuildItem
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
