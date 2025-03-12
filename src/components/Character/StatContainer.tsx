import { CharacterStats } from '../../types/character'

interface Props {
  data: CharacterStats
}

export const StatContainer = ({ data }: Props) => {
  console.log(data)
  return (
    <div className="w-[617px] h-[628px] border border-black flex flex-col justify-center gap-0.5 px-3.5">
      <div className="w-full h-[46px] border border-black">
        <p>전투력</p>
      </div>
      <div className="w-full h-[107px] border border-black"></div>
      <div className="w-full h-[251px] border border-black"></div>
      <div className="w-full h-[120px] border border-black"></div>
    </div>
  )
}
