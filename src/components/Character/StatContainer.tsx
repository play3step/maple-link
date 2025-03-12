import { CharacterStats } from '../../types/character'
import { formatKoreanNumber } from '../../utils/format'
import { getStatValue } from '../../utils/getStatValue'

interface Props {
  data: CharacterStats
}

export const StatContainer = ({ data }: Props) => {
  const stats = data.final_stat
  console.log(data)
  return (
    <div className="w-[617px] h-[628px] border border-black flex flex-col justify-center gap-0.5 px-3.5">
      <div className="w-full h-[46px] border border-black flex gap-3 items-center justify-center">
        <p>전투력</p>
        <p className="font-semibold">
          {formatKoreanNumber(Number(getStatValue(stats, '전투력')))}
        </p>
      </div>
      <div className="w-full h-[107px] px-3  border border-black flex justify-center items-center">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="py-1 font-semibold">HP</td>
              <td className="py-1">{getStatValue(stats, 'HP')}</td>
              <td className="py-1 font-semibold">MP</td>
              <td className="py-1">{getStatValue(stats, 'MP')}</td>
            </tr>
            <tr>
              <td className="py-1 font-semibold">STR</td>
              <td className="py-1">{getStatValue(stats, 'STR')}</td>
              <td className="py-1 font-semibold">DEX</td>
              <td className="py-1">{getStatValue(stats, 'DEX')}</td>
            </tr>
            <tr>
              <td className="py-1 font-semibold">INT</td>
              <td className="py-1">{getStatValue(stats, 'INT')}</td>
              <td className="py-1 font-semibold">LUK</td>
              <td className="py-1">{getStatValue(stats, 'LUK')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full h-[251px] border border-black"></div>
      <div className="w-full h-[120px] border border-black"></div>
    </div>
  )
}
