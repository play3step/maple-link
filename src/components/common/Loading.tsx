import { IoReloadOutline } from 'react-icons/io5'

interface Props {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

export const Loading = ({ size = 'medium', text }: Props) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <IoReloadOutline
        className={`${sizeClasses[size]} animate-spin text-blue-500`}
      />
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  )
}
