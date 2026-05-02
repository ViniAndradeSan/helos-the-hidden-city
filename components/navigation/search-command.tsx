'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { districts } from '@/lib/data/districts'
import { shops } from '@/lib/data/shops'
import { npcs } from '@/lib/data/npcs'
import { allItems } from '@/lib/data/items'

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Atalho Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = useCallback((type: string, slug: string) => {
    setOpen(false)
    if (type === 'district') {
      router.push(`/distrito/${slug}`)
    } else if (type === 'shop') {
      router.push(`/local/${slug}`)
    }
  }, [router])

  return (
    <>
      {/* Botão de busca */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-secondary/50 border border-border rounded-lg hover:bg-secondary/70 transition-colors"
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">Buscar...</span>
        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Dialog de busca */}
      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
        title="Buscar em Helos"
        description="Encontre distritos, lojas, NPCs e itens"
      >
        <CommandInput placeholder="Buscar distritos, lojas, NPCs..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          
          {/* Distritos */}
          <CommandGroup heading="Distritos">
            {districts.map((district) => (
              <CommandItem
                key={district.id}
                value={`district-${district.name}`}
                onSelect={() => handleSelect('district', district.slug)}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: district.color }}
                />
                <span>{district.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {district.shops.length} lojas
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Lojas */}
          <CommandGroup heading="Lojas">
            {shops.slice(0, 10).map((shop) => (
              <CommandItem
                key={shop.id}
                value={`shop-${shop.name}`}
                onSelect={() => handleSelect('shop', shop.slug)}
              >
                <svg
                  className="w-4 h-4 mr-2 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>{shop.name}</span>
                <span className="ml-auto text-xs text-muted-foreground capitalize">
                  {shop.type}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          {/* NPCs */}
          <CommandGroup heading="NPCs">
            {npcs.slice(0, 8).map((npc) => (
              <CommandItem
                key={npc.id}
                value={`npc-${npc.name}`}
                onSelect={() => {
                  if (npc.shopId) {
                    const shop = shops.find(s => s.id === npc.shopId)
                    if (shop) handleSelect('shop', shop.slug)
                  }
                  setOpen(false)
                }}
              >
                <svg
                  className="w-4 h-4 mr-2 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{npc.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {npc.role}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Itens (amostra) */}
          <CommandGroup heading="Itens">
            {allItems.slice(0, 6).map((item) => (
              <CommandItem
                key={item.id}
                value={`item-${item.name}`}
                onSelect={() => setOpen(false)}
              >
                <svg
                  className="w-4 h-4 mr-2 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span>{item.name}</span>
                <span className="ml-auto text-xs text-gold">
                  {item.price} PO
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
