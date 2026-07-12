import React from 'react'

type Item = {
  key?: string
  title: React.ReactNode
  desc: React.ReactNode
  icon?: React.ReactNode
}

export default function FeatureGrid({ items, cols = 3 }: { items: Item[]; cols?: number }) {
  const colClass = cols === 3 ? 'md:grid-cols-3' : cols === 2 ? 'md:grid-cols-2' : ''

  return (
    <div className={`grid ${colClass} gap-6`}>
      {items.map((it, i) => (
        <div key={it.key ?? i} className="text-center">
          {it.icon && <div className="mx-auto mb-2">{it.icon}</div>}
          <div className="font-medium text-foreground mb-2">{it.title}</div>
          <div className="text-sm text-muted-foreground">{it.desc}</div>
        </div>
      ))}
    </div>
  )
}
