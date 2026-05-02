'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CityMap } from '@/components/map/city-map'
import { SearchCommand } from '@/components/navigation/search-command'
import { useDiscovery } from '@/lib/hooks/use-discovery'
import { useDiscoveryToast } from '@/components/secrets/discovery-toast'
import { districts } from '@/lib/data/districts'
import { getSecretById, secrets } from '@/lib/data/secrets'
import type { District } from '@/lib/types'

export default function HomePage() {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { discoveries, discoverSecret, isLoaded } = useDiscovery()
  const { showDiscovery, DiscoveryToastComponent } = useDiscoveryToast()

  // Simular carregamento inicial para animação
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSecretFound = useCallback((secretId: string) => {
    const secret = getSecretById(secretId)
    if (secret) {
      discoverSecret(secretId)
      showDiscovery(secret.title, secret.content)
    }
  }, [discoverSecret, showDiscovery])

  // Calcular progresso de descobertas
  const totalSecrets = secrets.length
  const discoveredCount = discoveries.length
  const progressPercent = totalSecrets > 0 ? Math.round((discoveredCount / totalSecrets) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Loading overlay com animação */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h1 className="text-medieval text-3xl text-primary mb-2">Cidade de Helos</h1>
              <p className="text-sm text-muted-foreground">Carregando o atlas...</p>
              <motion.div 
                className="w-24 h-0.5 bg-gold/30 mx-auto mt-4 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header fixo */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="border-b border-border/40 bg-card/60 backdrop-blur-md sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo/Título */}
              <div>
                <h1 className="text-medieval text-xl font-semibold text-primary tracking-wide">
                  Cidade de Helos
                </h1>
                <p className="text-xs text-muted-foreground -mt-0.5">
                  Atlas Interativo
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Busca */}
              <SearchCommand />
              
              {/* Stats discretos */}
              {isLoaded && discoveredCount > 0 && (
                <div className="hidden sm:flex items-center gap-2 text-right">
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gold/70 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {discoveredCount}/{totalSecrets}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Mapa principal */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.98 : 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="card-medieval p-4 md:p-6 bg-card/40"
            >
              <CityMap
                onDistrictHover={setHoveredDistrict}
                onSecretFound={handleSecretFound}
                discoveredSecrets={discoveries}
              />
            </motion.div>
            
            {/* Dica sutil */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoading ? 0 : 0.5 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-center text-xs text-muted-foreground mt-4"
            >
              Clique em um distrito para explorar. Observe com atenção... nem tudo é o que parece.
            </motion.p>
          </div>

          {/* Sidebar com distritos */}
          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 20 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Lista de distritos */}
            <div className="card-medieval p-4 bg-card/40">
              <h2 className="text-medieval text-base font-semibold text-primary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Distritos
              </h2>
              
              <nav className="space-y-1.5">
                {districts.map((district, index) => {
                  const isHovered = hoveredDistrict?.id === district.id
                  
                  return (
                    <motion.div
                      key={district.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      <Link
                        href={`/distrito/${district.slug}`}
                        className={`
                          group flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-200
                          ${isHovered 
                            ? 'border-primary/50 bg-primary/10 shadow-sm' 
                            : 'border-transparent hover:border-border/50 hover:bg-secondary/20'
                          }
                        `}
                      >
                        {/* Indicador de cor */}
                        <div 
                          className={`
                            w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200
                            ${isHovered ? 'scale-125' : 'group-hover:scale-110'}
                          `}
                          style={{ backgroundColor: district.color }}
                        />
                        
                        <div className="min-w-0 flex-1">
                          <h3 className={`
                            text-sm font-medium truncate transition-colors duration-200
                            ${isHovered ? 'text-primary' : 'text-foreground group-hover:text-foreground'}
                          `}>
                            {district.name}
                          </h3>
                        </div>

                        {/* Seta sutil */}
                        <svg 
                          className={`
                            w-4 h-4 text-muted-foreground transition-all duration-200
                            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0'}
                          `}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </div>

            {/* Card contextual */}
            <AnimatePresence mode="wait">
              {hoveredDistrict ? (
                <motion.div
                  key={hoveredDistrict.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="card-medieval p-4 bg-card/40"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: hoveredDistrict.color }}
                    />
                    <div>
                      <h3 className="text-medieval text-primary font-semibold">
                        {hoveredDistrict.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                        {hoveredDistrict.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground/80">
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {hoveredDistrict.shops.length} lojas
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {hoveredDistrict.locations.length} locais
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="card-medieval p-4 bg-card/40"
                >
                  <h3 className="text-medieval text-primary font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 text-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Bem-vindo a Helos
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Uma cidade de mil histórias. Explore os distritos, 
                    converse com os moradores e descubra o que se esconde nas sombras.
                  </p>
                  <p className="text-xs text-gold/50 mt-3 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gold/50 animate-pulse" />
                    Passe o mouse sobre o mapa
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dicas de exploração (aparece só se o jogador já descobriu algo) */}
            {isLoaded && discoveredCount > 0 && discoveredCount < totalSecrets && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="card-medieval p-3 bg-gold/5 border-gold/20"
              >
                <p className="text-xs text-gold/70 leading-relaxed">
                  {discoveredCount < 5 
                    ? 'Continue explorando. A cidade guarda muitos segredos...'
                    : discoveredCount < 10
                      ? 'Você está atento. Há mais coisas escondidas nas sombras.'
                      : 'Um verdadeiro explorador. Poucos segredos restam.'}
                </p>
              </motion.div>
            )}
          </motion.aside>
        </motion.div>
      </main>

      {/* Rodapé sutil */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 0.4 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="border-t border-border/20 mt-8"
      >
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-xs text-muted-foreground">
            Use <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">K</kbd> para buscar
          </p>
        </div>
      </motion.footer>

      {/* Toast de descoberta */}
      {DiscoveryToastComponent}
    </div>
  )
}
