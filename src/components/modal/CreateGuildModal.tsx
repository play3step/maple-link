import { useState } from 'react'
import Button from '../common/Button'
import InputText from '../common/InputText'
import { GuildList } from '../Guild/GuildList'
import ModalLayout from './ModalLayout'
import { useSearchGuilds } from '../../hooks/Guild/useSearchGuilds'
import Title from '../common/Title'

export const CreateGuildModal = () => {
  const { list, searchGuilds, createGuild } = useSearchGuilds()

  const [name, setName] = useState('')
  const [server, setServer] = useState('')

  const onSearch = () => {
    searchGuilds(name)
  }

  const onSelect = (id: string) => {
    setServer(id)
  }

  const onSubmit = () => {
    if (name && server) {
      createGuild(server, name)
    }
  }

  return (
    <ModalLayout
      onSubmit={onSubmit}
      size="small">
      <Title
        size="medium"
        color="primary">
        길드 추가하기
      </Title>
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
