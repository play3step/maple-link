import { useSearchGuild } from '../hooks/search/useSearchGuild'

export const SearchGuild = () => {
  const { guilds, isLoading } = useSearchGuild()

  console.log(guilds)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>SearchGuild</div>
}
