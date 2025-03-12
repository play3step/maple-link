import { useState } from 'react'
import { CharacterAbility } from '../../types/character'

interface Props {
  ability: CharacterAbility
}

export const AbilitryContainer = ({ ability }: Props) => {
  const [selected, setSelected] = useState(1)

  return (
    <div className="w-[316px] h-[174px] border border-black rounded-lg flex flex-col justify-center ">
      <p>ABILITY</p>
      <div className="flex gap-4">
        <button onClick={() => setSelected(1)}>1</button>
        <button onClick={() => setSelected(2)}>2</button>
        <button onClick={() => setSelected(3)}>3</button>
      </div>

      {selected === 1 ? (
        <div>
          <p>{ability.ability_preset_1.ability_info[0].ability_value}</p>
        </div>
      ) : selected === 2 ? (
        <div>
          <p>{ability.ability_preset_2.ability_info[0].ability_value}</p>
        </div>
      ) : (
        <div>
          <p>{ability.ability_preset_3.ability_info[0].ability_value}</p>
        </div>
      )}
    </div>
  )
}
