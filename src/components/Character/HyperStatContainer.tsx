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
    <div className="w-[316px] h-[628px] overflow-auto border border-black rounded-lg p-3">
      <div className="flex justify-center gap-4 mb-3">
        {[1, 2, 3].map(num => (
          <button
            key={num}
            onClick={() => setSelected(num)}
            className={`px-2 py-1 rounded ${
              selected === num
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-black'
            }`}>
            {num}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1 p-2.5">
        {selectedPreset.map((item, index) => (
          <HyperStatTable
            hyperStat={item}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
