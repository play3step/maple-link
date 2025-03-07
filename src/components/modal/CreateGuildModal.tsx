import { useState } from 'react'
import Button from '../common/Button'
import InputText from '../common/InputText'
import { GuildList } from '../Guild/GuildList'
import ModalLayout from './ModalLayout'
import { SearchGuild } from '../../types/guild'
import { searchGuild } from '../../apis/Nexon/nexonController'
import { worldNames } from '../../data/worlds'
import { addGuildList } from '../../apis/Guild/guildController'

export const CreateGuildModal = () => {
  const [list, setList] = useState<SearchGuild[]>([])
  const [name, setName] = useState('')
  const [server, setServer] = useState('')

  const onSearch = async () => {
    try {
      const results = await Promise.all(
        worldNames.map(world =>
          searchGuild({ worldName: world.name, guildName: name })
        )
      )

      const validResults = results.filter(
        (res): res is SearchGuild => res !== null
      )
      setList(validResults)
    } catch (error) {
      console.error('길드 검색 에러:', error)
    }
  }

  const onSelect = (id: string) => {
    setServer(id)
  }

  console.log(server)

  const createGuuld = () => {
    if (name && server) {
      addGuildList({ world_name: server, guild_name: name })
    }
  }

  return (
    <ModalLayout onSubmit={createGuuld}>
      <div className="flex gap-2">
        <InputText
          onChange={e => setName(e.target.value)}
          placeholder="길드 이름 입력"
        />
        <Button
          size="small"
          scheme="solid"
          onClick={onSearch}>
          찾아보기
        </Button>
      </div>

      <GuildList
        list={list}
        onSelect={onSelect}
        server={server}
      />
    </ModalLayout>
  )
}
