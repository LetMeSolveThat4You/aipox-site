import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  maxWidth?: '6xl' | '7xl'
}

export default function Container({ children, className = '', maxWidth = '6xl', ...props }: Props) {
  const mw = maxWidth === '7xl' ? 'max-w-7xl' : 'max-w-6xl'
  return (
    <div className={`${mw} mx-auto px-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
