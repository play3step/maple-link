import { HyperStatInfo } from '../../types/character'

interface Props {
  hyperStat: HyperStatInfo
}

export const HyperStatTable = ({ hyperStat }: Props) => {
  return (
    <div className="group relative w-full rounded-lg p-3 overflow-y-auto hover:bg-gray-100 transition-colors duration-300">
      <div className="flex justify-between">
        <p>{hyperStat.stat_type}</p>
        <p>Lv. {hyperStat.stat_level}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-100 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {hyperStat.stat_increase ?? 'X'}
      </div>
    </div>
  )
}
