export interface Stat {
  stat_name: string
  stat_value: string | null
}

export interface CharacterStats {
  date: string | null
  character_class: string
  final_stat: Stat[]
  remain_ap: number
}
