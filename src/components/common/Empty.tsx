import Title from './Title'

export const Empty = () => {
  return (
    <div className="flex flex-col gap-3 py-3 justify-center items-center">
      <Title size="large">길드 정보가 없습니다.</Title>
      <p>길드를 생성해 주세요!</p>
    </div>
  )
}
