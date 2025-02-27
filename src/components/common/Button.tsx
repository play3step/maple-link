import { Scheme, Size } from '../../types'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size: Size
  scheme: Scheme
}

const Button = ({ children }: Props) => {
  return <button>{children}</button>
}
export default Button
