import { CharacterStats } from '../../types/character'
import { formatKoreanNumber } from '../../utils/format'
import { getStatValue } from '../../utils/getStatValue'
import StatTable from './StatTable'

interface Props {
  data: CharacterStats
}

export const StatContainer = ({ data }: Props) => {
  const stats = data.final_stat

  const basicRows = [
    {
      left: { label: 'HP', value: getStatValue(stats, 'HP') },
      right: { label: 'MP', value: getStatValue(stats, 'MP') }
    },
    {
      left: { label: 'STR', value: getStatValue(stats, 'STR') },
      right: { label: 'DEX', value: getStatValue(stats, 'DEX') }
    },
    {
      left: { label: 'INT', value: getStatValue(stats, 'INT') },
      right: { label: 'LUK', value: getStatValue(stats, 'LUK') }
    }
  ]

  // 공격 및 데미지 관련 스탯
  const attackRows = [
    {
      left: {
        label: '최대 스탯공격력',
        value: formatKoreanNumber(
          Number(getStatValue(stats, '최대 스탯공격력'))
        )
      },
      right: { label: '데미지', value: `${getStatValue(stats, '데미지')}%` }
    },
    {
      left: {
        label: '최종 데미지',
        value: `${getStatValue(stats, '최종 데미지')}%`
      },
      right: {
        label: '보스 몬스터 데미지',
        value: `${getStatValue(stats, '보스 몬스터 데미지')}%`
      }
    },
    {
      left: {
        label: '방어율 무시',
        value: `${getStatValue(stats, '방어율 무시')}%`
      },
      right: {
        label: '일반 몬스터 데미지',
        value: `${getStatValue(stats, '일반 몬스터 데미지')}%`
      }
    },
    {
      left: { label: '공격력', value: getStatValue(stats, '공격력') },
      right: {
        label: '크리티컬 확률',
        value: `${getStatValue(stats, '크리티컬 확률')}%`
      }
    },
    {
      left: { label: '마력', value: getStatValue(stats, '마력') },
      right: {
        label: '크리티컬 데미지',
        value: `${getStatValue(stats, '크리티컬 데미지')}%`
      }
    },
    {
      left: {
        label: '재사용 대기시간 감소',
        value: `${getStatValue(stats, '재사용 대기시간 감소 (초)')}초 / ${getStatValue(stats, '재사용 대기시간 감소 (%)')}%`
      },
      right: {
        label: '버프 지속시간',
        value: `${getStatValue(stats, '버프 지속시간')}%`
      }
    },
    {
      left: {
        label: '재사용 대기시간 미적용',
        value: `${getStatValue(stats, '재사용 대기시간 미적용')}%`
      },
      right: {
        label: '속성 내성 무시',
        value: `${getStatValue(stats, '속성 내성 무시')}%`
      }
    },
    {
      left: {
        label: '상태이상 추가 데미지',
        value: `${getStatValue(stats, '상태이상 추가 데미지')}%`
      },
      right: {
        label: '무기 숙련도',
        value: `${getStatValue(stats, '무기 숙련도')}%`
      }
    }
  ]

  // 추가 스탯
  const additionalRows = [
    {
      left: {
        label: '메소 획득량',
        value: `${getStatValue(stats, '메소 획득량')}%`
      },
      right: { label: '스타포스', value: getStatValue(stats, '스타포스') }
    },
    {
      left: {
        label: '아이템 드롭률',
        value: `${getStatValue(stats, '아이템 드롭률')}%`
      },
      right: { label: '아케인포스', value: getStatValue(stats, '아케인포스') }
    },
    {
      left: {
        label: '추가 경험치 획득',
        value: `${getStatValue(stats, '추가 경험치 획득')}%`
      },
      right: { label: '어센틱포스', value: getStatValue(stats, '어센틱포스') }
    }
  ]

  return (
    <div className="w-[617px] h-[628px] border border-black rounded-lg flex flex-col gap-2 px-3.5 py-2">
      {/* 전투력 */}
      <div className="w-full h-[46px] border border-black rounded-md flex justify-center items-center gap-3">
        <p>전투력</p>
        <p className="font-semibold">
          {formatKoreanNumber(Number(getStatValue(stats, '전투력')))}
        </p>
      </div>

      {/* 기본 스탯 */}
      <div className="w-full h-[107px] border border-black rounded-md px-3 py-2 flex justify-center items-center">
        <StatTable rows={basicRows} />
      </div>

      {/* 공격/데미지 스탯 */}
      <div className="w-full h-[251px] border border-black rounded-md px-3 py-2 flex justify-center items-center">
        <StatTable rows={attackRows} />
      </div>

      {/* 추가 스탯 */}
      <div className="w-full h-[120px] border border-black rounded-md px-3 py-2 flex justify-center items-center">
        <StatTable rows={additionalRows} />
      </div>
    </div>
  )
}

export default StatContainer
