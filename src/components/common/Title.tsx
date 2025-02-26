type HeadingSize = 'large' | 'medium' | 'small'
type ColorKey = 'primary' | 'secondary' | 'text'

interface Props {
  children: React.ReactNode
  size: HeadingSize
  color?: ColorKey
}

const Title = ({ children, size, color }: Props) => {
  return <h1 className={`${size} ${color}`}>{children}</h1>
}

export default Title
