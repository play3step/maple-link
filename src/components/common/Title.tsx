import { ColorKey, Size } from '../../types'

interface Props {
  children: React.ReactNode
  size: Size
  color?: ColorKey
}

const Title = ({ children, size, color }: Props) => {
  return <h1 className={`${size} ${color}`}>{children}</h1>
}

export default Title
