interface Props {
  state: boolean
}

export const CharacterListItem = ({ state }: Props) => {
  console.log(state)

  return (
    <div className="w-full h-[58px] border border-black flex items-center justify-between px-2">
      <p>이미지</p>
      {state && <p>버튼</p>}
    </div>
  )
}
