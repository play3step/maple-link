export type WorldName =
  | '스카니아'
  | '베라'
  | '루나'
  | '제니스'
  | '크로아'
  | '유니온'
  | '엘리시움'
  | '이노시스'
  | '레드'
  | '오로라'
  | '아케인'
  | '노바'
  | '에오스'
  | '헬리오스'

export interface Guild {
  guildId: number
  worldName: WorldName
  guildName: string
}
