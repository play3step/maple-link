interface Props {
  text?: string
}

export const Empty = ({ text = '데이터가 없습니다' }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500">
      <p>{text}</p>
    </div>
  )
}
