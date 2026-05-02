'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDiscovery } from '@/lib/hooks/use-discovery'
import { getSecretsByNpcId } from '@/lib/data/secrets'
import type { NPC } from '@/lib/types'

interface NpcDialogProps {
  npc: NPC
  isOpen: boolean
  onClose: () => void
  onSecretDiscovered?: (secretId: string, content: string) => void
}

export function NpcDialog({ npc, isOpen, onClose, onSecretDiscovered }: NpcDialogProps) {
  const { interactWithNpc, canShowWhisper, discoverSecret, hasDiscoveredSecret } = useDiscovery()
  const [showWhisper, setShowWhisper] = useState(false)
  
  // Busca segredos associados a este NPC
  const npcSecrets = getSecretsByNpcId(npc.id)
  const hasWhisperSecret = npcSecrets.length > 0
  const whisperSecret = npcSecrets[0] // Pega o primeiro segredo (whisper)

  const handleContinueConversation = useCallback(() => {
    interactWithNpc(npc.id)
    
    if (npc.whisper || hasWhisperSecret) {
      setShowWhisper(true)
      
      // Se há um segredo associado, descobre ele
      if (whisperSecret && !hasDiscoveredSecret(whisperSecret.id)) {
        discoverSecret(whisperSecret.id)
        onSecretDiscovered?.(whisperSecret.id, whisperSecret.content)
      }
    }
  }, [npc, interactWithNpc, hasWhisperSecret, whisperSecret, hasDiscoveredSecret, discoverSecret, onSecretDiscovered])

  const handleClose = useCallback(() => {
    setShowWhisper(false)
    onClose()
  }, [onClose])

  // Verifica se o whisper já foi revelado antes
  const wasWhisperRevealed = whisperSecret ? hasDiscoveredSecret(whisperSecret.id) : canShowWhisper(npc.id)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {/* Avatar do NPC */}
            <div className="w-16 h-16 rounded-full bg-secondary/50 border border-border flex items-center justify-center flex-shrink-0">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            
            <div>
              <DialogTitle className="text-medieval text-primary text-lg">
                {npc.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {npc.role}
              </DialogDescription>
              {npc.appearance && (
                <p className="text-xs text-muted-foreground/70 mt-1 italic">
                  {npc.appearance}
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Fala normal (greeting) */}
          <AnimatePresence mode="wait">
            {!showWhisper ? (
              <motion.div
                key="greeting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-secondary/30 rounded-lg p-4 border border-border/50"
              >
                <p className="text-foreground leading-relaxed">
                  &ldquo;{npc.greeting}&rdquo;
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="whisper"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {/* Fala original em menor destaque */}
                <div className="bg-secondary/20 rounded-lg p-3 border border-border/30">
                  <p className="text-sm text-muted-foreground">
                    &ldquo;{npc.greeting}&rdquo;
                  </p>
                </div>
                
                {/* Whisper destacado */}
                <div className="bg-gold/5 rounded-lg p-4 border border-gold/20">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-4 h-4 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="text-xs text-gold font-medium uppercase tracking-wider">
                      Sussurro
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed italic">
                    &ldquo;{whisperSecret?.content || npc.whisper}&rdquo;
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botão para continuar conversa (se há whisper disponível) */}
          {(npc.whisper || hasWhisperSecret) && !showWhisper && (
            <button
              onClick={handleContinueConversation}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-secondary/30 hover:bg-secondary/50 rounded-lg border border-border/50 transition-colors"
            >
              <span>Continuar conversa</span>
              {/* Indicador sutil de que há algo mais */}
              {!wasWhisperRevealed && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-glow-pulse" />
              )}
            </button>
          )}

          {/* Personalidade (sutil) */}
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground/60">
              <span className="font-medium">Personalidade:</span> {npc.personality}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Componente de card de NPC para usar em listagens
interface NpcCardProps {
  npc: NPC
  onClick?: () => void
  compact?: boolean
}

export function NpcCard({ npc, onClick, compact = false }: NpcCardProps) {
  const { canShowWhisper, hasDiscoveredSecret } = useDiscovery()
  const npcSecrets = getSecretsByNpcId(npc.id)
  const hasUndiscoveredWhisper = npcSecrets.some(s => !hasDiscoveredSecret(s.id)) || 
    (npc.whisper && !canShowWhisper(npc.id))

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors text-left w-full"
      >
        {/* Avatar pequeno */}
        <div className="w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground truncate">{npc.name}</span>
            {hasUndiscoveredWhisper && (
              <span className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-glow-pulse flex-shrink-0" />
            )}
          </div>
          <span className="text-xs text-muted-foreground truncate block">{npc.role}</span>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className="card-medieval p-4 text-left w-full hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-secondary/50 border border-border flex items-center justify-center flex-shrink-0">
          <svg
            className="w-7 h-7 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-medieval font-semibold text-foreground">{npc.name}</h4>
            {hasUndiscoveredWhisper && (
              <span className="w-2 h-2 rounded-full bg-gold/50 animate-glow-pulse flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{npc.role}</p>
          <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">
            {npc.personality}
          </p>
        </div>
      </div>
    </button>
  )
}
