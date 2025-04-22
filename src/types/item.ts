export interface Inventory {
  item_equipment: Item[]
}

export interface Item {
  item_equipment_slot: string
  item_icon: string

  item_name: string

  item_total_option: StatBlock
  item_base_option: StatBlock
  item_add_option: StatBlock //추옵
  item_etc_option: StatBlock //주흔
  item_starforce_option: StatBlock //스타포스

  item_exceptional_option: StatBlock

  potential_option_grade: string
  additional_potential_option_grade: string

  potential_option_flag: string
  potential_option_1: string
  potential_option_2: string
  potential_option_3: string

  additional_potential_option_flag: string
  additional_potential_option_1: string
  additional_potential_option_2: string
  additional_potential_option_3: string
}

export interface StatBlock {
  str: string
  dex: string
  int: string
  luk: string
  max_hp: string
  max_mp: string
  attack_power: string
  magic_power: string
  boss_damage: string
  ignore_monster_armor: string
  all_stat: string
  damage: string
  max_hp_rate: string
  max_mp_rate: string
}
