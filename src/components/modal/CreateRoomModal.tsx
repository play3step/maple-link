import ModalLayout from './ModalLayout'
import { useState } from 'react'
import { useSearchGuilds } from '../../hooks/Guild/useSearchGuilds'
import Title from '../common/Title'
import InputText from '../common/InputText'
import Button from '../common/Button'
import { GuildList } from '../Guild/GuildList'
import { useRef } from 'react'
export const CreateRoomModal = () => {
  const { list, searchGuilds, createGuild } = useSearchGuilds()
  const [name, setName] = useState('')
  const [server, setServer] = useState('')
  const roomNameRef = useRef<HTMLInputElement>(null)

  const onSearch = () => {
    searchGuilds(name)
  }

  const onSelect = (id: string) => {
    setServer(id)
  }

  const onSubmit = () => {
    if (!roomNameRef.current?.value) {
      alert('방 이름을 입력해주세요')
      return
    }
    if (name && server) {
      createGuild(server, name)
    }
  }

  return (
    <ModalLayout
      size="small"
      onSubmit={onSubmit}>
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              새 관리방 만들기
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              메인 길드를 선택하여 관리방을 생성하세요
            </p>
          </div>
          <input
            ref={roomNameRef}
            type="text"
            placeholder="방 이름"
            className="w-3/4 px-3 py-2 ml-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="space-y-3">
            <Title
              size="small"
              className="text-blue-600">
              메인 길드 검색
            </Title>
            <div className="flex gap-2">
              <InputText
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="길드 이름을 입력하세요"
                className="flex-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400"
                onKeyDown={e => e.key === 'Enter' && onSearch()}
              />
              <Button
                size="small"
                scheme="solid"
                onClick={onSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                검색
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Title
              size="small"
              className="text-blue-600">
              검색 결과
            </Title>
            <div className="flex p-4 justify-center items-center border-t-2 border-gray-100 rounded-lg overflow-hidden">
              <GuildList
                list={list}
                onSelect={onSelect}
                server={server}
              />
            </div>
            {list.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                길드 이름을 검색해주세요
              </p>
            )}
          </div>
        </div>
      </div>
    </ModalLayout>
  )
}
