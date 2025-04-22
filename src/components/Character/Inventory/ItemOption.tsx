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
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[#454545d0] rounded-xl shadow-md w-[600px]">
      {selectedItem?.starforce && Number(selectedItem.starforce) !== 0 && (
        <StarRating rating={Number(selectedItem?.starforce)} />
      )}
      {selectedItem && (
        <div className="w-20 h-20 p-4 flex justify-center items-center bg-gray-200 border-gray-400 rounded-md overflow-hidden border-2">
          <img
            src={selectedItem.item_icon}
            className="w-full"
          />
        </div>
      )}

      {ITEM_OPTION_KEYS.map(({ key, label }) => {
        const total = Number(selectedItem?.item_total_option?.[key] ?? 0)
        const base = Number(selectedItem?.item_base_option?.[key] ?? 0)
        const add = Number(selectedItem?.item_add_option?.[key] ?? 0)
        const etc = Number(selectedItem?.item_etc_option?.[key] ?? 0)
        const star = Number(selectedItem?.item_starforce_option?.[key] ?? 0)

        if (total === 0 && base === 0 && add === 0 && etc === 0 && star === 0) {
          return null
        }

        return (
          <div
            className="flex gap-2"
            key={key}>
            <p className="font-semibold text-[#66ffff]">{label}</p>
            {total !== 0 && <p className="text-[#66ffff]">+ {total}</p>}
            <span className="text-[#ffffff]"> (</span>
            {base !== 0 && <p className="text-[#ffffff]">{base}</p>}
            {add !== 0 && <p className="text-[#ccff00]">{add}</p>}
            {etc !== 0 && <p className="text-[#aaaaff]">{etc}</p>}
            {star !== 0 && <p className="text-[#ffcc00]">{star}</p>}
            <span className="text-[#ffffff]">)</span>
          </div>
        )
      })}
    </div>
  )
}
