'use client'

import Link from 'next/link'
import { SearchCommand } from './search-command'
import { useDiscovery } from '@/lib/hooks/use-discovery'

interface MainHeaderProps {
  showBackButton?: boolean
  backHref?: string
  backLabel?: string
}

export function MainHeader({ 
  showBackButton = false,
  backHref = '/',
  backLabel = 'Voltar ao Mapa'
}: MainHeaderProps) {
  const { discoveries, isLoaded } = useDiscovery()

  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo e navegação */}
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Link
                href={backHref}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden sm:inline">{backLabel}</span>
              </Link>
            )}
            
            <Link href="/" className="flex items-center gap-2">
              {/* Ícone simples */}
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              
              <div>
                <h1 className="text-medieval text-lg font-semibold text-primary leading-tight">
                  Helos
                </h1>
                <p className="text-xs text-muted-foreground leading-tight hidden sm:block">
                  Atlas Interativo
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Busca */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <SearchCommand />
          </div>

          {/* Right: Stats e mobile search */}
          <div className="flex items-center gap-3">
            {/* Mobile search button */}
            <div className="md:hidden">
              <SearchCommand />
            </div>
            
            {/* Stats discretos */}
            {isLoaded && discoveries.length > 0 && (
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">Descobertas</p>
                <p className="text-medieval text-gold text-sm font-medium">
                  {discoveries.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
