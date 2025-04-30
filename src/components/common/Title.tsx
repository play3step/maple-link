import { ColorKey, Size } from '../../types'

interface Props {
  children: React.ReactNode
  size: Size
  color?: ColorKey
  className?: string
}

const Title = ({ children, size, color, className = '' }: Props) => {
  return (
    <h1
      className={`${
        size === 'large'
          ? 'text-large'
          : size === 'medium'
            ? 'text-medium'
            : 'text-small'
      }
      ${
        color === 'primary'
          ? 'text-primary'
          : color === 'secondary'
            ? 'text-secondary'
            : 'text-text'
      }
      ${className}
    `}>
      {children}
    </h1>
  )
}

export default Title
