import { Item } from '../../../types/item'
import { Slot } from './Slot'

interface Props {
  inventory: Item[]
  characterImg: string
  onSelected: (item: Item | undefined) => void
}

const ItemInventory = ({ inventory, characterImg, onSelected }: Props) => {
  const slotMap = Object.fromEntries(
    inventory.map(item => [item.item_equipment_slot, item])
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
    <div className="w-full h-full flex flex-col  items-center justify-center gap-3 bg-gray-50 rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between w-full">
        {/* 왼쪽 5행 2열 */}
        <div className="grid grid-rows-5 grid-cols-2 gap-1.5">
          {leftSlots.map(slot => (
            <Slot
              key={slot}
              onClick={onSelected}
              item={slotMap[slot]}
            />
          ))}
        </div>

        {/* 가운데 캐릭터 + 아래 슬롯 3개 */}
        <div className="flex flex-col justify-end items-center px-2">
          <div className="w-32 h-32 mb-4 flex justify-center items-center bg-white rounded-lg p-1 border border-gray-200">
            <img
              src={characterImg}
              className="max-h-full object-contain"
            />
          </div>
          <div className="flex gap-1.5">
            {bottomSlots.map(slot => (
              <Slot
                key={slot}
                onClick={onSelected}
                item={slotMap[slot]}
              />
            ))}
          </div>
        </div>

        {/* 오른쪽 5행 2열 */}
        <div className="grid grid-rows-5 grid-cols-2 gap-1.5">
          {rightSlots.map(slot => (
            <Slot
              key={slot}
              onClick={onSelected}
              item={slotMap[slot]}
            />
          ))}
        </div>
      </div>

      {/* 아래 포켓, 벳지 */}
      <div className="flex gap-3 justify-center">
        {extraSlots.map(slot => (
          <Slot
            key={slot}
            onClick={onSelected}
            item={slotMap[slot]}
          />
        ))}
      </div>
    </div>
  )
}

export default ItemInventory
