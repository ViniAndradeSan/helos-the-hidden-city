'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import type { DiscoveryState, Secret, DiscoveryChain } from '@/lib/types'
import { secrets, getSecretById } from '@/lib/data/secrets'
import { discoveryChains } from '@/lib/data/chains'

const STORAGE_KEY = 'helos-discoveries'

const initialState: DiscoveryState = {
  secrets: [],
  npcsInteracted: {},
  chainsCompleted: [],
  connectionsDiscovered: [],
  lastVisited: undefined,
}

export function useDiscovery() {
  const [state, setState] = useState<DiscoveryState>(initialState)
  const [isLoaded, setIsLoaded] = useState(false)
  const [pendingConnection, setPendingConnection] = useState<{
    from: Secret
    to: Secret
    type: string
    description?: string
  } | null>(null)
  const [pendingChainComplete, setPendingChainComplete] = useState<DiscoveryChain | null>(null)

  // Carrega do localStorage na montagem
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as DiscoveryState
        // Garante que os novos campos existem
        setState({
          ...initialState,
          ...parsed,
          chainsCompleted: parsed.chainsCompleted || [],
          connectionsDiscovered: parsed.connectionsDiscovered || [],
        })
      }
    } catch {
      // Ignora erros de parsing
    }
    setIsLoaded(true)
  }, [])

  // Salva no localStorage quando o estado muda
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch {
        // Ignora erros de storage
      }
    }
  }, [state, isLoaded])

  // Verifica se um segredo pode ser descoberto (requisitos)
  const canDiscoverSecret = useCallback((secret: Secret): boolean => {
    if (!secret.requires || secret.requires.length === 0) return true
    return secret.requires.every(reqId => state.secrets.includes(reqId))
  }, [state.secrets])

  // Verifica conexões quando um novo segredo é descoberto
  const checkConnections = useCallback((newSecretId: string) => {
    const newSecret = getSecretById(newSecretId)
    if (!newSecret?.connections) return

    for (const conn of newSecret.connections) {
      // Verifica se o segredo conectado já foi descoberto
      if (state.secrets.includes(conn.targetId)) {
        const connKey = [newSecretId, conn.targetId].sort().join(':')
        if (!state.connectionsDiscovered.includes(connKey)) {
          const targetSecret = getSecretById(conn.targetId)
          if (targetSecret) {
            setPendingConnection({
              from: newSecret,
              to: targetSecret,
              type: conn.type,
              description: conn.description,
            })
          }
        }
      }
    }

    // Verifica também se algum segredo já descoberto conecta a este
    for (const discoveredId of state.secrets) {
      const discoveredSecret = getSecretById(discoveredId)
      if (!discoveredSecret?.connections) continue
      
      for (const conn of discoveredSecret.connections) {
        if (conn.targetId === newSecretId) {
          const connKey = [discoveredId, newSecretId].sort().join(':')
          if (!state.connectionsDiscovered.includes(connKey)) {
            setPendingConnection({
              from: discoveredSecret,
              to: newSecret,
              type: conn.type,
              description: conn.description,
            })
          }
        }
      }
    }
  }, [state.secrets, state.connectionsDiscovered])

  // Verifica cadeias quando um novo segredo é descoberto
  const checkChains = useCallback((newSecretId: string) => {
    for (const chain of discoveryChains) {
      // Pula cadeias já completadas
      if (state.chainsCompleted.includes(chain.id)) continue

      // Verifica se o novo segredo faz parte da cadeia
      if (!chain.secrets.includes(newSecretId)) continue

      // Verifica se todos os segredos da cadeia foram descobertos
      const allDiscovered = chain.secrets.every(sId => 
        state.secrets.includes(sId) || sId === newSecretId
      )

      if (allDiscovered) {
        setPendingChainComplete(chain)
      }
    }
  }, [state.secrets, state.chainsCompleted])

  // Descobre um segredo
  const discoverSecret = useCallback((secretId: string) => {
    const secret = getSecretById(secretId)
    if (!secret) return false

    // Verifica requisitos
    if (!canDiscoverSecret(secret)) return false

    setState(prev => {
      if (prev.secrets.includes(secretId)) return prev
      return {
        ...prev,
        secrets: [...prev.secrets, secretId],
      }
    })

    // Verifica conexões e cadeias após um delay (para dar tempo do estado atualizar)
    setTimeout(() => {
      checkConnections(secretId)
      checkChains(secretId)
    }, 100)

    return true
  }, [canDiscoverSecret, checkConnections, checkChains])

  // Marca conexão como vista
  const acknowledgeConnection = useCallback(() => {
    if (!pendingConnection) return
    
    const connKey = [pendingConnection.from.id, pendingConnection.to.id].sort().join(':')
    setState(prev => ({
      ...prev,
      connectionsDiscovered: [...prev.connectionsDiscovered, connKey],
    }))
    setPendingConnection(null)
  }, [pendingConnection])

  // Marca cadeia como completa
  const acknowledgeChainComplete = useCallback(() => {
    if (!pendingChainComplete) return
    
    setState(prev => ({
      ...prev,
      chainsCompleted: [...prev.chainsCompleted, pendingChainComplete.id],
    }))
    setPendingChainComplete(null)
  }, [pendingChainComplete])

  // Verifica se um segredo foi descoberto
  const hasDiscoveredSecret = useCallback((secretId: string) => {
    return state.secrets.includes(secretId)
  }, [state.secrets])

  // Verifica se uma cadeia foi completada
  const hasCompletedChain = useCallback((chainId: string) => {
    return state.chainsCompleted.includes(chainId)
  }, [state.chainsCompleted])

  // Registra interação com NPC
  const interactWithNpc = useCallback((npcId: string) => {
    setState(prev => {
      const currentCount = prev.npcsInteracted[npcId] || 0
      return {
        ...prev,
        npcsInteracted: {
          ...prev.npcsInteracted,
          [npcId]: currentCount + 1,
        },
      }
    })
  }, [])

  // Obtém número de interações com um NPC
  const getNpcInteractionCount = useCallback((npcId: string) => {
    return state.npcsInteracted[npcId] || 0
  }, [state.npcsInteracted])

  // Verifica se NPC já foi interagido (para whisper)
  const canShowWhisper = useCallback((npcId: string) => {
    return (state.npcsInteracted[npcId] || 0) >= 1
  }, [state.npcsInteracted])

  // Registra último local visitado
  const setLastVisited = useCallback((locationId: string) => {
    setState(prev => ({
      ...prev,
      lastVisited: locationId,
    }))
  }, [])

  // Obtém segredos por símbolo (para pistas visuais)
  const getSecretsBySymbol = useCallback((symbol: string): Secret[] => {
    return secrets.filter(s => s.symbol === symbol)
  }, [])

  // Obtém segredos descobertos que têm o mesmo símbolo
  const getDiscoveredBySymbol = useCallback((symbol: string): Secret[] => {
    return secrets.filter(s => 
      s.symbol === symbol && state.secrets.includes(s.id)
    )
  }, [state.secrets])

  // Reseta todas as descobertas (para debug/teste)
  const resetDiscoveries = useCallback(() => {
    setState(initialState)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Estatísticas
  const stats = useMemo(() => ({
    secretsDiscovered: state.secrets.length,
    totalSecrets: secrets.length,
    npcsInteracted: Object.keys(state.npcsInteracted).length,
    totalInteractions: Object.values(state.npcsInteracted).reduce((a, b) => a + b, 0),
    chainsCompleted: state.chainsCompleted.length,
    totalChains: discoveryChains.length,
    connectionsFound: state.connectionsDiscovered.length,
  }), [state])

  // Progresso por cadeia
  const getChainProgress = useCallback((chainId: string) => {
    const chain = discoveryChains.find(c => c.id === chainId)
    if (!chain) return { discovered: 0, total: 0, percent: 0 }
    
    const discovered = chain.secrets.filter(sId => state.secrets.includes(sId)).length
    return {
      discovered,
      total: chain.secrets.length,
      percent: Math.round((discovered / chain.secrets.length) * 100),
    }
  }, [state.secrets])

  return {
    // Estado
    discoveries: state.secrets,
    isLoaded,
    stats,
    
    // Ações de segredos
    discoverSecret,
    hasDiscoveredSecret,
    canDiscoverSecret: (secret: Secret) => canDiscoverSecret(secret),
    
    // Conexões
    pendingConnection,
    acknowledgeConnection,
    
    // Cadeias
    pendingChainComplete,
    acknowledgeChainComplete,
    hasCompletedChain,
    getChainProgress,
    
    // Símbolos (pistas visuais)
    getSecretsBySymbol,
    getDiscoveredBySymbol,
    
    // Ações de NPCs
    interactWithNpc,
    getNpcInteractionCount,
    canShowWhisper,
    
    // Outros
    setLastVisited,
    lastVisited: state.lastVisited,
    resetDiscoveries,
  }
}
