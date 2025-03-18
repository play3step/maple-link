import { useState } from 'react'
import { CharacterAbility } from '../../types/character'

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
    <div className="w-[316px] h-[174px] border border-black rounded-lg flex flex-col justify-center">
      <p className="mb-2 text-center font-bold">ABILITY</p>
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
        {selectedPreset.ability_info.map((item, index) => (
          <p
            key={index}
            className="text-sm">
            {item.ability_value}
          </p>
        ))}
      </div>
    </div>
  )
}
