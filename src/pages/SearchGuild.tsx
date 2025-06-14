import { useSearchGuild } from '../hooks/search/useSearchGuild'

export const SearchGuild = () => {
  const { guilds } = useSearchGuild()

  console.log(guilds)

  return <div>SearchGuild</div>
}
