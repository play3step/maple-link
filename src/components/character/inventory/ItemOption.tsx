import { Item } from '../../../types/item'
import { StarRating } from './StartRating'

interface Props {
  selectedItem?: Item
}

type StatBlock = NonNullable<Item['item_total_option']>
type StatKey = keyof StatBlock

const ITEM_OPTION_KEYS: { key: StatKey; label: string }[] = [
  { key: 'str', label: 'STR' },
  { key: 'dex', label: 'DEX' },
  { key: 'int', label: 'INT' },
  { key: 'luk', label: 'LUK' },
  { key: 'max_hp', label: '최대HP' },
  { key: 'max_mp', label: '최대MP' },
  { key: 'attack_power', label: '공격력' },
  { key: 'magic_power', label: '마력' },
  { key: 'boss_damage', label: '보스 몬스터 데미지 증가(%)' },
  { key: 'ignore_monster_armor', label: '몬스터 방어율 무시(%)' },
  { key: 'all_stat', label: '올스탯(%)' },
  { key: 'damage', label: '데미지(%)' },
  { key: 'max_hp_rate', label: '최대 HP(%)' },
  { key: 'max_mp_rate', label: '최대 MP(%)' }
]

export const ItemOption = ({ selectedItem }: Props) => {
  if (!selectedItem) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-4 text-gray-500">
        <p>아이템을 선택해주세요</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-4 bg-[#333333] rounded-lg shadow-md w-full">
      {selectedItem?.starforce && Number(selectedItem.starforce) !== 0 && (
        <div className="mb-2 flex justify-center">
          <StarRating rating={Number(selectedItem.starforce)} />
        </div>
      )}

      <p className="text-white font-bold text-lg mb-3 text-center">
        {selectedItem.item_name}
      </p>

      <div className="w-16 h-16 p-1 flex justify-center items-center bg-gray-200 border-gray-400 rounded-md overflow-hidden border-2 mx-auto mb-4">
        <img
          src={selectedItem.item_icon}
          className="w-full"
          alt={selectedItem.item_name}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        {ITEM_OPTION_KEYS.map(({ key, label }) => {
          const total = Number(selectedItem?.item_total_option?.[key] ?? 0)
          const base = Number(selectedItem?.item_base_option?.[key] ?? 0)
          const add = Number(selectedItem?.item_add_option?.[key] ?? 0)
          const etc = Number(selectedItem?.item_etc_option?.[key] ?? 0)
          const star = Number(selectedItem?.item_starforce_option?.[key] ?? 0)

          if (
            total === 0 &&
            base === 0 &&
            add === 0 &&
            etc === 0 &&
            star === 0
          ) {
            return null
          }
          const isPercent = label.includes('%')

          return (
            <div
              className="flex items-center gap-x-1.5"
              key={key}>
              <span className="font-medium text-[#66ffff]">{label}</span>
              <span className="text-[#66ffff]">+{total}</span>
              <span className="text-white">(</span>
              {base !== 0 && <span className="text-white">{base}</span>}
              {add !== 0 && <span className="text-[#ccff00]">+{add}</span>}
              {etc !== 0 && <span className="text-[#aaaaff]">+{etc}</span>}
              {star !== 0 && <span className="text-[#ffcc00]">+{star}</span>}
              <span className="text-white">){isPercent && '%'}</span>
            </div>
          )
        })}
      </div>

      {selectedItem?.potential_option_grade && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <p
            className={`${selectedItem.potential_option_grade === '레어' ? 'text-[#22bbff]' : selectedItem.potential_option_grade === '에픽' ? 'text-[#aa11ee]' : selectedItem.potential_option_grade === '유니크' ? 'text-[#ffbb00]' : 'text-[#77ee00]'} font-semibold`}>
            잠재옵션
          </p>
          <ul className="list-disc list-inside text-sm text-gray-200 mt-1">
            <li>{selectedItem.potential_option_1}</li>
            <li>{selectedItem.potential_option_2}</li>
            <li>{selectedItem.potential_option_3}</li>
          </ul>
        </div>
      )}

      {selectedItem?.additional_potential_option_grade && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <p
            className={`${selectedItem.additional_potential_option_grade === '레어' ? 'text-[#22bbff]' : selectedItem.additional_potential_option_grade === '에픽' ? 'text-[#aa11ee]' : selectedItem.additional_potential_option_grade === '유니크' ? 'text-[#ffbb00]' : 'text-[#77ee00]'} font-semibold`}>
            에디셔널 잠재옵션
          </p>
          <ul className="list-disc list-inside text-sm text-gray-200 mt-1">
            <li>{selectedItem.additional_potential_option_1}</li>
            <li>{selectedItem.additional_potential_option_2}</li>
            <li>{selectedItem.additional_potential_option_3}</li>
          </ul>
        </div>
      )}
    </div>
  )
}
