import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDistrictBySlug, districts } from '@/lib/data/districts'
import { getShopsByDistrictId } from '@/lib/data/shops'
import { getLocationsByDistrictId } from '@/lib/data/locations'
import { getNpcById } from '@/lib/data/npcs'
import { getSecretsByDistrictId } from '@/lib/data/secrets'
import { MainHeader } from '@/components/navigation/main-header'
import { BreadcrumbNav } from '@/components/navigation/breadcrumb-nav'

// Gera rotas estáticas para todos os distritos
export function generateStaticParams() {
  return districts.map((district) => ({
    slug: district.slug,
  }))
}

// Metadata dinâmica
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const district = getDistrictBySlug(slug)
  
  if (!district) {
    return { title: 'Distrito não encontrado' }
  }

  return {
    title: `${district.name} - Cidade de Helos`,
    description: district.description,
  }
}

export default async function DistrictPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const district = getDistrictBySlug(slug)

  if (!district) {
    notFound()
  }

  const shops = getShopsByDistrictId(district.id)
  const locations = getLocationsByDistrictId(district.id)
  const secrets = getSecretsByDistrictId(district.id)
  const hasSecrets = secrets.length > 0

  return (
    <div className="min-h-screen bg-background bg-texture">
      <MainHeader showBackButton backHref="/" backLabel="Mapa" />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <BreadcrumbNav
          items={[{ label: district.name }]}
        />

        {/* Header do distrito */}
        <header className="mt-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: district.color }}
            />
            <h1 className="text-medieval text-3xl font-semibold text-primary">
              {district.name}
            </h1>
          </div>
          
          <p className="text-foreground/90 leading-relaxed max-w-2xl">
            {district.description}
          </p>
          
          <p className="text-sm text-muted-foreground mt-3 italic">
            {district.atmosphere}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lojas */}
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Lojas e Estabelecimentos
              <span className="text-xs text-muted-foreground font-normal ml-2">
                ({shops.length})
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shops.map((shop) => {
                const npc = getNpcById(shop.npcId)

                return (
                  <Link
                    key={shop.id}
                    href={`/local/${shop.slug}`}
                    className="card-medieval p-4 hover:border-primary/40 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-medieval font-semibold text-foreground group-hover:text-primary transition-colors">
                          {shop.name}
                        </h3>
                        <p className="text-xs text-gold capitalize mt-0.5">
                          {shop.type}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {shop.description}
                        </p>
                        
                        {/* Highlight da loja */}
                        {shop.highlight && (
                          <p className="text-xs text-gold/80 mt-2 italic line-clamp-1">
                            &ldquo;{shop.highlight}&rdquo;
                          </p>
                        )}
                      </div>
                      
                      <svg
                        className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>

                    {npc && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
                        <div className="w-6 h-6 rounded-full bg-secondary/50 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-muted-foreground"
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
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {npc.name}
                        </span>
                        {npc.whisper && (
                          <span className="text-xs text-gold/50 ml-auto" title="Este NPC pode ter algo a dizer...">
                            ...
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>

            {shops.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma loja encontrada neste distrito.
              </p>
            )}
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Locais de interesse */}
            <div>
              <h2 className="text-medieval text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Pontos de Interesse
              </h2>

              <div className="space-y-3">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="card-medieval p-3"
                  >
                    <h3 className="text-medieval font-semibold text-foreground text-sm">
                      {location.name}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize mt-0.5">
                      {location.type}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {location.description}
                    </p>
                  </div>
                ))}

                {locations.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum ponto de interesse registrado.
                  </p>
                )}
              </div>
            </div>

            {/* Dica sutil sobre segredos */}
            {hasSecrets && (
              <div className="p-3 bg-gold/5 rounded-lg border border-gold/20">
                <p className="text-xs text-gold/70 italic text-center">
                  Dizem que há segredos escondidos neste distrito...
                </p>
              </div>
            )}

            {/* Estatísticas do distrito */}
            <div className="p-4 bg-secondary/20 rounded-lg border border-border/30">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Sobre este distrito
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lojas</span>
                  <span className="text-foreground">{shops.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pontos de interesse</span>
                  <span className="text-foreground">{locations.length}</span>
                </div>
              </div>
            </div>

            {/* Navegação rápida */}
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <h3 className="text-sm font-medium text-foreground mb-3">
                Outros Distritos
              </h3>
              <div className="space-y-2">
                {districts
                  .filter(d => d.id !== district.id)
                  .slice(0, 3)
                  .map(d => (
                    <Link
                      key={d.id}
                      href={`/distrito/${d.slug}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: d.color }}
                      />
                      {d.name}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
