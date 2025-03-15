import dayjs from 'dayjs'

export const formatNumber = (number: number): string => {
  return number.toLocaleString()
}

export const formatKoreanNumber = (number: number): string => {
  if (number === 0) return '0'

  const v1 = Math.floor(number / 100000000)
  const rest = number % 100000000

  const v2 = Math.floor(rest / 10000)
  const last = rest % 10000

  let result = ''

  // 억 단위
  if (v1 > 0) {
    result += `${v1}억`
  }

  // 만 단위
  if (v2 > 0) {
    if (result) result += ' '

    result += `${v2}만`
  }

  // 만 이하 단위
  if (last > 0) {
    if (result) result += ' '
    result += `${last}`
  }

  return result
}

export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY. MM. DD')
}
