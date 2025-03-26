import { ModalType } from '../../store/modalStore'
import { Guild } from '../../types/guild'
import Button from '../common/Button'
import { useSearchParams } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useEffect } from 'react'

interface Props {
  showModal: (name: ModalType) => void
  guildList: Guild[]
}

export const ActionBtnList = ({ showModal, guildList }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleSwitch = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value === null) {
      newSearchParams.delete(QUERYSTRING.GUILD)
    } else {
      newSearchParams.set(QUERYSTRING.GUILD, value)
    }
    setSearchParams(newSearchParams)
  }

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.GUILD) && guildList.length > 0) {
      handleSwitch(guildList[0].guildName)
    }
  }, [searchParams])

  return (
    <div className="flex gap-2">
      <Button
        size="small"
        scheme="solid"
        onClick={() => showModal('createGuild')}>
        길드 생성
      </Button>
      {guildList.length > 0 && (
        <>
          {guildList.map(v => (
            <Button
              key={`${v.worldName}-${v.guildName}`}
              size="small"
              scheme="solid"
              onClick={() => handleSwitch(v.guildName)}>
              {v.worldName} - {v.guildName}
            </Button>
          ))}
          <Button
            size="small"
            scheme="outlined"
            onClick={() => showModal('detectMember')}>
            비교 하기
          </Button>
        </>
      )}
    </div>
  )
}
