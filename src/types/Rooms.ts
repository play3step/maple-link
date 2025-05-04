export interface Rooms {
  roomList: Room[]
}

export interface Room {
  adminId: number
  groupName: string
  admins: string[]
  mainGuild: string
  subGuild: string[]
}
