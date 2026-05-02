'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbNavProps {
  items: {
    label: string
    href?: string
  }[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm flex-wrap">
        {/* Home sempre presente */}
        <li className="inline-flex items-center">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Helos
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
