'use client'

import { notFound } from 'next/navigation'
import { useState, useCallback, use } from 'react'
import { getShopBySlug, shops } from '@/lib/data/shops'
import { getDistrictById } from '@/lib/data/districts'
import { getNpcById } from '@/lib/data/npcs'
import { MainHeader } from '@/components/navigation/main-header'
import { BreadcrumbNav } from '@/components/navigation/breadcrumb-nav'
import { ShopInventory } from '@/components/locations/shop-inventory'
import { NpcDialog, NpcCard } from '@/components/locations/npc-dialog'
import { useDiscoveryToast } from '@/components/secrets/discovery-toast'

export default function LocalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [isNpcDialogOpen, setIsNpcDialogOpen] = useState(false)
  const { showDiscovery, DiscoveryToastComponent } = useDiscoveryToast()
  
  const shop = getShopBySlug(slug)

  if (!shop) {
    notFound()
  }

  const district = getDistrictById(shop.districtId)
  const npc = getNpcById(shop.npcId)

  const handleSecretDiscovered = useCallback((secretId: string, content: string) => {
    showDiscovery('Você descobriu algo...', content.substring(0, 100) + '...')
  }, [showDiscovery])

  return (
    <div className="min-h-screen bg-background bg-texture">
      <MainHeader 
        showBackButton 
        backHref={district ? `/distrito/${district.slug}` : '/'} 
        backLabel={district?.name || 'Voltar'} 
      />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <BreadcrumbNav
          items={[
            ...(district ? [{ label: district.name, href: `/distrito/${district.slug}` }] : []),
            { label: shop.name }
          ]}
        />

        {/* Header */}
        <header className="mt-6 mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-gold uppercase tracking-wider mb-1">
                {shop.type}
              </p>
              <h1 className="text-medieval text-3xl font-semibold text-primary">
                {shop.name}
              </h1>
              {district && (
                <p className="text-sm text-muted-foreground mt-1">
                  {district.name}
                </p>
              )}
            </div>
          </div>
          
          <p className="text-foreground/90 leading-relaxed max-w-2xl mt-4">
            {shop.description}
          </p>
          
          {shop.ambiance && (
            <p className="text-sm text-muted-foreground mt-2 italic">
              {shop.ambiance}
            </p>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inventário */}
          <section className="lg:col-span-2">
            <h2 className="text-medieval text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gold"
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
              Inventário
            </h2>

            {shop.items.length > 0 ? (
              <div className="card-medieval p-4">
                <ShopInventory itemIds={shop.items} showCategories />
              </div>
            ) : (
              <div className="card-medieval p-8 text-center">
                <p className="text-muted-foreground">
                  Este estabelecimento não vende itens físicos.
                </p>
              </div>
            )}
          </section>

          {/* Sidebar com NPC */}
          <aside>
            {npc && (
              <>
                <h2 className="text-medieval text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gold"
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
                  Proprietário
                </h2>

                <NpcCard 
                  npc={npc} 
                  onClick={() => setIsNpcDialogOpen(true)}
                />

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Clique para conversar
                </p>

                <NpcDialog
                  npc={npc}
                  isOpen={isNpcDialogOpen}
                  onClose={() => setIsNpcDialogOpen(false)}
                  onSecretDiscovered={handleSecretDiscovered}
                />
              </>
            )}

            {/* Info adicional */}
            <div className="mt-6 p-4 bg-secondary/20 rounded-lg border border-border/30">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Informações
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="text-foreground capitalize">{shop.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Itens</span>
                  <span className="text-foreground">{shop.items.length}</span>
                </div>
                {district && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distrito</span>
                    <span className="text-foreground">{district.name}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Toast de descoberta */}
      {DiscoveryToastComponent}
    </div>
  )
}
