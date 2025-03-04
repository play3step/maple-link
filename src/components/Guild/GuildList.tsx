import { WorldName } from '../../types/guild'
import { GuildItme } from './GuildItem'

export const GuildList = () => {
  const worldNames: WorldName[] = [
    '스카니아',
    '베라',
    '루나',
    '제니스',
    '크로아',
    '유니온',
    '엘리시움',
    '이노시스',
    '레드',
    '오로라',
    '아케인',
    '노바',
    '에오스',
    '헬리오스'
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {worldNames.map(v => (
        <GuildItme>{v}</GuildItme>
      ))}
    </div>
  )
}
