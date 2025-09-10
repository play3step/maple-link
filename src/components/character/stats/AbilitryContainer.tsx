import { useState } from 'react'
import { CharacterAbility } from '../../../types/character'

interface Props {
  ability: CharacterAbility
}

export const AbilitryContainer = ({ ability }: Props) => {
  const [selected, setSelected] = useState(1)
  const selectedPreset =
    selected === 1
      ? ability.ability_preset_1
      : selected === 2
        ? ability.ability_preset_2
        : ability.ability_preset_3
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <h3 className="font-medium text-gray-700 mb-2 pb-1 border-b text-center">
        어빌리티
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

      <div className="border border-gray-100 rounded-md bg-gray-50 p-2 overflow-hidden">
        {selectedPreset.ability_info.map((item, index) => (
          <div
            key={index}
            className="text-sm py-1 border-b border-gray-100 last:border-0 truncate">
            <span className="text-gray-700 break-words">
              {item.ability_value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
