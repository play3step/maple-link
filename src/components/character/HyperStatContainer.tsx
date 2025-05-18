import { useState } from 'react'
import { HyperStat } from '../../types/character'
import { HyperStatTable } from './HyperStatTable'

interface Props {
  hyperStat: HyperStat
}

export const HyperStatContainer = ({ hyperStat }: Props) => {
  const [selected, setSelected] = useState(1)
  const selectedPreset =
    selected === 1
      ? hyperStat.hyper_stat_preset_1
      : selected === 2
        ? hyperStat.hyper_stat_preset_2
        : hyperStat.hyper_stat_preset_1
  return (
    <div className="w-full h-[600px] bg-white rounded-lg p-4 shadow-sm flex flex-col">
      <h3 className="font-medium text-gray-700 mb-2 pb-1 border-b text-center">
        하이퍼 스탯
      </h3>

      <div className="flex justify-center gap-2 mb-3">
        {[1, 2, 3].map(num => (
          <button
            key={num}
            onClick={() => setSelected(num)}
            className={`px-3 py-1 rounded-md text-sm transition-all ${
              selected === num
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
            프리셋 {num}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto ">
        <div className="flex flex-col gap-2">
          {selectedPreset.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-2 bg-white hover:bg-blue-50 transition-colors">
              <HyperStatTable
                hyperStat={item}
                key={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
