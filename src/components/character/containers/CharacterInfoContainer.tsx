import { CharacterBasic } from '../../../types/character'
import { formatDate } from '../../../utils/format'

interface Props {
  basic: CharacterBasic
}

export const CharacterInfoContainer = ({ basic }: Props) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4 flex gap-4 shadow-sm">
      {/* 캐릭터 이미지 영역 */}
      <div className="w-[100px] h-[100px] flex-shrink-0 flex justify-center items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <img
          src={basic.character_image}
          alt={basic.character_name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 캐릭터 정보 영역 */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
          {basic.character_name}
        </h3>
        <div className="flex flex-wrap items-center text-sm mb-1 text-gray-700">
          <span className="font-medium break-all line-clamp-2">
            {basic.character_class}
          </span>
          <span> Lv. {basic.character_level}</span>
          <span className="ml-1 text-blue-600">
            ({basic.character_exp_rate}%)
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          길드: {basic.character_guild_name || '없음'}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          생성일: {formatDate(basic.character_date_create)}
        </p>
      </div>
    </div>
  )
}
