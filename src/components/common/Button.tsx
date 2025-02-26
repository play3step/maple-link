export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonScheme = 'solid' | 'outlined' | 'subtle'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size: ButtonSize
  scheme: ButtonScheme
}

const Button = ({ children }: Props) => {
  return <button>{children}</button>
}
export default Button
