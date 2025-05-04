import * as React from "react"

export interface CardProps {
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function Card({ title, description, children, footer }: CardProps) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-900 shadow p-6 mb-4">
      <div className="mb-2">
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        {description && <p className="text-gray-500 mb-2">{description}</p>}
      </div>
      <div className="mb-2">{children}</div>
      {footer && <div className="mt-2 border-t pt-2 text-sm text-gray-400">{footer}</div>}
    </div>
  )
}
