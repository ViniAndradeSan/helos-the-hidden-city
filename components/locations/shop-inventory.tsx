'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { getItemById, getItemsByCategory } from '@/lib/data/items'
import type { Item, ItemCategory } from '@/lib/types'

interface ShopInventoryProps {
  itemIds: string[]
  showCategories?: boolean
}

const categoryLabels: Record<ItemCategory, string> = {
  'armas': 'Armas',
  'armaduras': 'Armaduras',
  'ferramentas': 'Ferramentas',
  'consumíveis': 'Consumíveis',
  'aventura': 'Itens de Aventura',
}

const rarityColors: Record<string, string> = {
  'comum': 'text-foreground',
  'incomum': 'text-green-400',
  'raro': 'text-amber-400',
}

export function ShopInventory({ itemIds, showCategories = true }: ShopInventoryProps) {
  const [expandedCategory, setExpandedCategory] = useState<ItemCategory | null>(null)
  
  // Busca os itens e organiza por categoria
  const items = itemIds.map(id => getItemById(id)).filter((item): item is Item => item !== undefined)
  
  // Agrupa por categoria
  const itemsByCategory = items.reduce<Record<ItemCategory, Item[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<ItemCategory, Item[]>)

  const categories = Object.keys(itemsByCategory) as ItemCategory[]

  if (!showCategories || categories.length <= 1) {
    // Lista simples sem categorias
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category} className="border border-border/50 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
            className="w-full flex items-center justify-between p-3 bg-secondary/20 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <CategoryIcon category={category} />
              <span className="font-medium text-foreground">
                {categoryLabels[category]}
              </span>
              <span className="text-xs text-muted-foreground">
                ({itemsByCategory[category].length})
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                expandedCategory === category ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedCategory === category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border/30"
            >
              <div className="p-2 space-y-1">
                {itemsByCategory[category].map((item) => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}

// Componente de linha de item
function ItemRow({ item }: { item: Item }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/20 transition-colors cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium ${rarityColors[item.rarity || 'comum']}`}>
            {item.name}
          </span>
          {item.rarity && item.rarity !== 'comum' && (
            <span className="text-xs text-muted-foreground capitalize">
              ({item.rarity})
            </span>
          )}
        </div>
        {isHovered && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-muted-foreground mt-1"
          >
            {item.description}
          </motion.p>
        )}
      </div>
      <div className="flex items-center gap-1 ml-4 flex-shrink-0">
        <span className="text-gold font-medium">{item.price}</span>
        <span className="text-xs text-muted-foreground">PO</span>
      </div>
    </div>
  )
}

// Ícone de categoria
function CategoryIcon({ category }: { category: ItemCategory }) {
  const iconProps = {
    className: 'w-4 h-4 text-muted-foreground',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
  }

  switch (category) {
    case 'armas':
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M3 21L21 3" />
        </svg>
      )
    case 'armaduras':
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'ferramentas':
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    case 'consumíveis':
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    case 'aventura':
      return (
        <svg {...iconProps}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    default:
      return null
  }
}

// Componente de grid de itens (para visualização mais visual)
export function ItemGrid({ itemIds }: { itemIds: string[] }) {
  const items = itemIds.map(id => getItemById(id)).filter((item): item is Item => item !== undefined)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="card-medieval p-3 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className={`font-medium ${rarityColors[item.rarity || 'comum']}`}>
                {item.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-gold font-semibold">{item.price}</span>
              <span className="text-xs text-muted-foreground block">PO</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
