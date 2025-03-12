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
