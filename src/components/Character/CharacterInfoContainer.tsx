import { CharacterBasic } from '../../types/character'
import { formatDate } from '../../utils/format'

interface Props {
  basic: CharacterBasic
}

export const CharacterInfoContainer = ({ basic }: Props) => {
  return (
    <div className="w-[316px] border border-black rounded-xl p-4 flex gap-3">
      {/* 캐릭터 이미지 영역 */}
      <div className="w-[100px] h-[100px] flex justify-center items-center border border-black rounded-md">
        <img
          src={basic.character_image}
          alt={basic.character_name}
          className="w-24 h-24 object-cover rounded"
        />
      </div>

      {/* 캐릭터 정보 영역 */}
      <div className="flex flex-col justify-center">
        <p className="text-xs text-gray-500">
          생성일: {formatDate(basic.character_date_create)}
        </p>
        <p className="text-lg font-bold">{basic.character_name}</p>
        <div className="flex items-center text-xs justify-between">
          <p>{basic.character_class}</p>
          <p className="mx-1">|</p>
          <p>Lv. {basic.character_level}</p>
          <p className="ml-1">({basic.character_exp_rate}%)</p>
        </div>
        <p className="text-sm">길드: {basic.character_guild_name || '없음'}</p>
      </div>
    </div>
  )
}
