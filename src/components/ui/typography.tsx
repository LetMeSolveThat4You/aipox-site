import React from 'react'

export const H1 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h1 className={`text-3xl lg:text-4xl font-light mb-4 text-foreground ${className}`}>{children}</h1>
)

export const H2 = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-2xl lg:text-3xl font-light mb-4 text-foreground ${className}`}>{children}</h2>
)

export const Lead = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${className}`}>{children}</p>
)

export const P = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-muted-foreground leading-relaxed ${className}`}>{children}</p>
)

export default {} as const
