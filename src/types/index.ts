export type ColorKey = 'primary' | 'secondary' | 'text'

export type Size = 'small' | 'medium' | 'large' | 'full'

export type Scheme = 'solid' | 'outlined' | 'subtle'

export interface ErrorResponse {
  data: {
    code: string
    error: string
    message: string
    path: string
    timestamp: string
  }
  message?: string
  success: boolean
}
