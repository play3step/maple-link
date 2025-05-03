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
export interface AbilityInfo {
  ability_no: string
  ability_grade: string
  ability_value: string
}

export interface AbilityPreset {
  ability_preset_grade: string
  ability_info: AbilityInfo[]
}

export interface CharacterAbility {
  ability_preset_1: AbilityPreset
  ability_preset_2: AbilityPreset
  ability_preset_3: AbilityPreset
}

export interface HyperStatInfo {
  stat_type: string
  stat_point: number | null
  stat_level: 0
  stat_increase: string | null
}

export interface HyperStat {
  hyper_stat_preset_1: HyperStatInfo[]
  hyper_stat_preset_2: HyperStatInfo[]
  hyper_stat_preset_3: HyperStatInfo[]
}

export interface CharacterBasic {
  character_name: string
  world_name: string
  character_class: string
  character_level: string
  character_exp_rate: string
  character_guild_name: string
  character_image: string
  character_date_create: string
}

export interface CharacterSearch {
  character_name: string
  world_name: string
  character_class: string
  character_level: string
  character_image: string
}
