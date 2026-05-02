'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useDiscovery } from '@/lib/hooks/use-discovery'

type DiscoveryContextType = ReturnType<typeof useDiscovery>

const DiscoveryContext = createContext<DiscoveryContextType | null>(null)

export function DiscoveryProvider({ children }: { children: ReactNode }) {
  const discovery = useDiscovery()

  return (
    <DiscoveryContext.Provider value={discovery}>
      {children}
    </DiscoveryContext.Provider>
  )
}

export function useDiscoveryContext() {
  const context = useContext(DiscoveryContext)
  if (!context) {
    throw new Error('useDiscoveryContext must be used within a DiscoveryProvider')
  }
  return context
}
