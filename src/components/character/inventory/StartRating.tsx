interface StarRatingProps {
  rating: number
}

export const StarRating = ({ rating }: StarRatingProps) => {
  const maxStars = 30
  const starsPerRow = 15
  const groupSize = 5

  const filledStars = Math.min(rating, maxStars)

  // 30개의 별 true/false 배열 생성
  const stars = Array.from({ length: maxStars }, (_, i) => i < filledStars)

  // 15개씩 나눠서 2줄 만들기
  const firstRow = stars.slice(0, starsPerRow)
  const secondRow = stars.slice(starsPerRow)

  // 5개씩 묶어서 렌더링
  const renderGroupedStars = (row: boolean[], rowIndex: number) => {
    const groups = Array.from(
      { length: Math.ceil(row.length / groupSize) },
      (_, i) => row.slice(i * groupSize, (i + 1) * groupSize)
    )

    return (
      <div
        key={rowIndex}
        className="flex gap-4">
        {groups.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className="flex gap-1">
            {group.map((isFilled, starIdx) => (
              <svg
                key={starIdx}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isFilled ? '#ffcc00' : '#ccc'}
                width="16"
                height="16">
                <path d="M12 .587l3.668 7.43 8.201 1.194-5.935 5.786 1.4 8.164-7.534-3.96-7.534 3.96 1.4-8.164-5.935-5.786 8.201-1.194z" />
              </svg>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {renderGroupedStars(firstRow, 0)}
      {renderGroupedStars(secondRow, 1)}
    </div>
  )
}
