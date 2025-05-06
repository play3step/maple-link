export interface Room {
  adminId: number
  groupName: string
  admins: string[]
  mainGuild: {
    guildId: number
    name: string
  }
  subGuild: {
    subGuildIds: number[]
    names: string[]
  }
}
