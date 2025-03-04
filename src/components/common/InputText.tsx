import React, { ForwardedRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  inputType?: 'text' | 'email' | 'password' | 'number'
}

const InputText = React.forwardRef(
  (
    { placeholder, inputType, onChange }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        className="border border-primary rounded-md p-medium"
        placeholder={placeholder}
        type={inputType}
        ref={ref}
        onChange={onChange}
      />
    )
  }
)

export default InputText
