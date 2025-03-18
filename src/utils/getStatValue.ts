import { Stat } from '../types/character'

export const getStatValue = (stats: Stat[], name: string) => {
  return stats.find(v => v.stat_name === name)?.stat_value ?? ''
}
