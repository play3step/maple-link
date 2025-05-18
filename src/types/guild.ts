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
  | '핼리오스'

export interface Guild {
  guildId?: number
  worldName?: WorldName
  guildName?: string
  message?: string
}

export interface WorldData {
  name: WorldName
  icon: string
}

export interface SearchGuild {
  world_name: string
  guild_name: string
  guild_master_name?: string
}

export interface NexonMembers {
  guildId: number
  guildName: string
  guildMasterName?: string
  memberDetailResponse?: Member[]
}

export interface RecordedMembers {
  guildId: number
  guildName: string
  addMembers: Member[]
}

export interface Member {
  id: number
  imagePath: string
  job: string
  level: string
  name: string
  type: '본캐' | '부캐' | '미지정'
  mainCharacterInfo: {
    id: number
    name: string
    level: string
    job: string
    imagePath: string
  }
}

export interface Detect {
  toAdd: string[]
  toRemove: string[]
}

export interface DetectResult {
  guildId: number
  guildName: string
  toAdd: string[]
  toRemove: string[]
}
