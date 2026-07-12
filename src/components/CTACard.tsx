import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CTACard({ title, children, className = '' }: { title?: React.ReactNode; children?: React.ReactNode; className?: string }) {
  return (
    <Card variant="glass" className={className}>
      {title && (
        <CardHeader>
          <CardTitle className="text-2xl text-primary text-center">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}
