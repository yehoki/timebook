interface ButtonProps {
  disabled?: boolean
  type?: 'button' | 'submit'
  variant: 'primary' | 'secondary' | 'redButton' | 'primarySlim' | 'secondarySlim'
  onClick?: () => void
  children: React.ReactNode
  tooltip?: string
}

export const Button = ({
  children,
  disabled,
  type = 'button',
  tooltip,
  variant,
  onClick,
}: ButtonProps): JSX.Element => {
  const variantClassName: string = {
    primary: 'font-medium px-4 py-2 bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500',
    secondary: 'font-medium px-4 py-2 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-400',
    redButton: 'font-medium px-4 py-2 bg-red-700 hover:bg-red-800 disabled:bg-red-700',
    primarySlim: 'font-small px-1.5 py-1 bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500',
    secondarySlim: 'font-small px-1.5 py-1 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-400',
  }[variant]

  return (
    <button
      className={`rounded-md text-white disabled:opacity-50 ${variantClassName}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
      title={tooltip}
    >
      {children}
    </button>
  )
}