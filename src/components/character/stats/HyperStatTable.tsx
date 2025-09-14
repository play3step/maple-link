import { HyperStatInfo } from '../../../types/character'

interface Props {
  hyperStat: HyperStatInfo
}

export const HyperStatTable = ({ hyperStat }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-1">
        <p className="font-medium text-gray-800">{hyperStat.stat_type}</p>
        <p className="bg-blue-100 px-2 py-0.5 rounded-md text-blue-700 font-bold">
          Lv. {hyperStat.stat_level}
        </p>
      </div>
      <div className="text-sm text-gray-600">
        {hyperStat.stat_increase ? (
          <span>
            증가량:{' '}
            <span className="text-green-600 font-medium">
              {hyperStat.stat_increase}
            </span>
          </span>
        ) : (
          <span className="text-gray-500">효과 없음</span>
        )}
      </div>
    </div>
  )
}
