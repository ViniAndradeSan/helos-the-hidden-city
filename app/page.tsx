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
  const [started, setStarted] = useState(false) // ✅ corrigido
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { discoveries, discoverSecret, isLoaded } = useDiscovery()
  const { showDiscovery, DiscoveryToastComponent } = useDiscoveryToast()

  // Loading ao entrar no mundo
  useEffect(() => {
    if (started) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 800)
      return () => clearTimeout(timer)
    }
  }, [started])

  const handleSecretFound = useCallback((secretId: string) => {
    const secret = getSecretById(secretId)
    if (secret) {
      discoverSecret(secretId)
      showDiscovery(secret.title, secret.content)
    }
  }, [discoverSecret, showDiscovery])

  const totalSecrets = secrets.length
  const discoveredCount = discoveries.length
  const progressPercent =
    totalSecrets > 0 ? Math.round((discoveredCount / totalSecrets) * 100) : 0

  return (
    <>
      {/* 🟢 TELA INICIAL */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center bg-background"
          >
            <div className="text-center max-w-md px-6">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl text-medieval text-primary mb-4"
              >
                Cidade de Helos
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground mb-6"
              >
                Uma cidade viva. Segredos escondidos.  
                Você está pronto para explorar?
              </motion.p>

              <motion.button
                onClick={() => setStarted(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg"
              >
                Entrar no mundo
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔵 JOGO */}
      {started && (
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-background"
        >
          {/* Loading */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background flex items-center justify-center"
              >
                <div className="text-center">
                  <h1 className="text-medieval text-2xl text-primary mb-2">
                    Entrando em Helos...
                  </h1>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HEADER */}
          <header className="border-b border-border/40 bg-card/60 backdrop-blur-md sticky top-0 z-40">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="text-medieval text-xl text-primary">
                Cidade de Helos
              </h1>

              <div className="flex items-center gap-4">
                <SearchCommand />

                {isLoaded && discoveredCount > 0 && (
                  <div className="text-xs text-muted-foreground">
                    {discoveredCount}/{totalSecrets}
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* MAIN */}
          <main className="container mx-auto px-4 py-6 grid lg:grid-cols-4 gap-6">
            {/* MAPA */}
            <div className="lg:col-span-3">
              <div className="card-medieval p-4">
                <CityMap
                  onDistrictHover={setHoveredDistrict}
                  onSecretFound={handleSecretFound}
                  discoveredSecrets={discoveries}
                />
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="space-y-4">
              <div className="card-medieval p-4">
                <h2 className="text-primary mb-3">Distritos</h2>

                {districts.map((d) => (
                  <Link
                    key={d.id}
                    href={`/distrito/${d.slug}`}
                    className="block p-2 hover:bg-secondary rounded"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>

              <div className="card-medieval p-4">
                {hoveredDistrict ? (
                  <>
                    <h3 className="text-primary">{hoveredDistrict.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {hoveredDistrict.description}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Passe o mouse sobre o mapa.
                  </p>
                )}
              </div>
            </aside>
          </main>

          {DiscoveryToastComponent}
        </motion.div>
      )}
    </>
  )
}