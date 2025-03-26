import { useEffect, useState } from 'react'
import Button from '../common/Button'
import { useSearchParams } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'

export const ListSwitch = () => {
  const [selected, setSelected] = useState('길드정보')
  const [searchParams, setSearchParams] = useSearchParams()
  const handleSwitch = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (value === null) {
      newSearchParams.delete(QUERYSTRING.VIEW)
    } else {
      newSearchParams.set(QUERYSTRING.VIEW, value)
    }
    setSearchParams(newSearchParams)
    setSelected(value)
  }

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch('길드정보')
    }
  }, [searchParams])

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleSwitch('길드정보')}
        size="small"
        scheme={selected === '길드정보' ? 'solid' : 'outlined'}>
        길드 정보
      </Button>
      <Button
        onClick={() => handleSwitch('내기록')}
        size="small"
        scheme={selected === '내기록' ? 'solid' : 'outlined'}>
        내 기록
      </Button>
    </div>
  )
}
