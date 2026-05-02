'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DiscoveryToastProps {
  title: string
  content?: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function DiscoveryToast({
  title,
  content,
  isVisible,
  onClose,
  duration = 6000,
}: DiscoveryToastProps) {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true)
      const timer = setTimeout(() => {
        setIsShowing(false)
        setTimeout(onClose, 400)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isShowing && (
        <>
          {/* Overlay sutil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at bottom right, hsl(var(--gold) / 0.05), transparent 70%)',
            }}
          />
          
          {/* Toast principal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.95, x: 10 }}
            transition={{ 
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            className="fixed bottom-6 right-6 z-50 max-w-sm"
          >
            <div className="relative bg-card border border-gold/30 rounded-xl p-5 shadow-2xl overflow-hidden">
              {/* Brilho de fundo animado */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at 0% 0%, hsl(var(--gold)), transparent 50%)',
                }}
                animate={{
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Partículas decorativas */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-gold/60"
                    initial={{ 
                      opacity: 0,
                      x: Math.random() * 100,
                      y: 100,
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: -20,
                      x: Math.random() * 100,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>

              <div className="relative flex items-start gap-4">
                {/* Ícone de descoberta */}
                <motion.div 
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1,
                  }}
                >
                  <motion.svg
                    className="w-5 h-5 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </motion.svg>
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <motion.p 
                    className="text-xs text-gold/70 mb-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Segredo descoberto
                  </motion.p>
                  <motion.h4 
                    className="text-medieval text-primary font-semibold text-lg leading-tight"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    {title}
                  </motion.h4>
                  {content && (
                    <motion.p 
                      className="text-sm text-foreground/80 mt-2 leading-relaxed"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      {content}
                    </motion.p>
                  )}
                </div>
              </div>
              
              {/* Barra de progresso */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gold/10"
              >
                <motion.div
                  className="h-full bg-gold/50"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: duration / 1000, ease: 'linear' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook para gerenciar toasts de descoberta
export function useDiscoveryToast() {
  const [toast, setToast] = useState<{
    title: string
    content?: string
    isVisible: boolean
  } | null>(null)

  const showDiscovery = useCallback((title: string, content?: string) => {
    setToast({ title, content, isVisible: true })
  }, [])

  const hideDiscovery = useCallback(() => {
    setToast(null)
  }, [])

  return {
    toast,
    showDiscovery,
    hideDiscovery,
    DiscoveryToastComponent: toast ? (
      <DiscoveryToast
        title={toast.title}
        content={toast.content}
        isVisible={toast.isVisible}
        onClose={hideDiscovery}
      />
    ) : null,
  }
}
