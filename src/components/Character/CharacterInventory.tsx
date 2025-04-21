import { Inventory } from '../../types/character'
import { Slot } from './Slot'

interface Props {
  inventory: Inventory
  characterImg: string
}

const CharacterInventory = ({ inventory, characterImg }: Props) => {
  const slotMap = Object.fromEntries(
    inventory.item_equipment.map(item => [item.item_equipment_slot, item])
  )

  const leftSlots = [
    '반지1',
    '얼굴장식',
    '반지2',
    '눈장식',
    '반지3',
    '귀고리',
    '반지4',
    '펜던트',
    '벨트',
    '펜던트2'
  ]
  const bottomSlots = ['무기', '보조무기', '엠블렘']
  const rightSlots = [
    '모자',
    '망토',
    '상의',
    '장갑',
    '하의',
    '신발',
    '어깨장식',
    '훈장',
    '안드로이드',
    '기계 심장'
  ]
  const extraSlots = ['포켓 아이템', '뱃지']

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[#f8f8f8] rounded-xl shadow-md w-full max-w-[600px]">
      <div className="flex justify-between w-full">
        {/* 왼쪽 5행 2열 */}
        <div className="grid grid-rows-5 grid-cols-2 gap-2">
          {leftSlots.map(slot => (
            <Slot
              key={slot}
              item={slotMap[slot]}
            />
          ))}
        </div>

        {/* 가운데 캐릭터 + 아래 슬롯 3개 */}
        <div className="flex flex-col justify-end items-center px-4 ">
          <div className="w-40 h-40 mb-2 flex justify-center items-center">
            <img src={characterImg} />
          </div>
          <div className="flex gap-2">
            {bottomSlots.map(slot => (
              <Slot
                key={slot}
                item={slotMap[slot]}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽 5행 2열 */}
        <div className="grid grid-rows-5 grid-cols-2 gap-2">
          {rightSlots.map(slot => (
            <Slot
              key={slot}
              item={slotMap[slot]}
            />
          ))}
        </div>
      </div>

      {/* 아래 포켓, 벳지 */}
      <div className="flex gap-4">
        {extraSlots.map(slot => (
          <Slot
            key={slot}
            item={slotMap[slot]}
          />
        ))}
      </div>
    </div>
  )
}

export default CharacterInventory
