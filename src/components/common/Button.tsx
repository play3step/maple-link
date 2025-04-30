import { Scheme, Size } from '../../types'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size: Size
  scheme: Scheme
  className?: string
}

const Button = ({ children, size, scheme, onClick, className = '' }: Props) => {
  return (
    <button
      className={`
        rounded
        ${
          size === 'large'
            ? 'text-large  p-large'
            : size === 'medium'
              ? 'text-medium p-medium'
              : 'text-small p-small'
        }
        ${
          scheme === 'solid'
            ? 'bg-button-solid-bg text-button-solid-text'
            : scheme === 'outlined'
              ? 'border border-button-outlined-border text-button-outlined-text bg-button-outlined-bg'
              : 'text-black hover:text-primary cursor-pointer'
        }
        ${className}
      `}
      onClick={onClick}>
      {children}
    </button>
  )
}
export default Button
