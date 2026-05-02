'use client'

import { useState, useCallback, useMemo, useEffect, useRef, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { districts } from '@/lib/data/districts'
import type { District } from '@/lib/types'

// Coordenadas e paths dos distritos no mapa
const districtPaths: Record<string, { path: string; labelX: number; labelY: number }> = {
  'porto-das-mares': {
    path: 'M50,350 L150,300 L250,320 L280,400 L220,450 L100,430 Z',
    labelX: 160,
    labelY: 375,
  },
  'mercado-central': {
    path: 'M250,180 L380,150 L420,220 L400,300 L280,320 L220,260 Z',
    labelX: 320,
    labelY: 235,
  },
  'cidadela-alta': {
    path: 'M380,50 L500,30 L550,100 L530,180 L420,200 L360,140 Z',
    labelX: 455,
    labelY: 115,
  },
  'bairro-artifices': {
    path: 'M420,220 L530,200 L580,280 L550,360 L450,340 L400,300 Z',
    labelX: 485,
    labelY: 280,
  },
  'viela-sombras': {
    path: 'M280,320 L400,300 L450,340 L430,420 L350,450 L280,400 Z',
    labelX: 365,
    labelY: 375,
  },
  'jardins-antigos': {
    path: 'M100,180 L220,160 L250,180 L220,260 L150,300 L80,250 Z',
    labelX: 165,
    labelY: 220,
  },
}

// ===========================
// ELEMENTOS DECORATIVOS (sem interação - só visual)
// ===========================
const decorativeElements = [
  // Muralhas externas
  { type: 'path', d: 'M30,150 Q60,50 150,30 Q350,10 520,40 Q600,70 620,200 Q630,400 550,480 Q400,520 200,500 Q50,470 30,350 Q20,250 30,150', stroke: true },
  // Torres principais nas muralhas
  { type: 'circle', cx: 60, cy: 150, r: 8 },
  { type: 'circle', cx: 520, cy: 50, r: 8 },
  { type: 'circle', cx: 600, cy: 220, r: 8 },
  { type: 'circle', cx: 550, cy: 450, r: 8 },
  { type: 'circle', cx: 200, cy: 490, r: 8 },
  { type: 'circle', cx: 50, cy: 350, r: 8 },
  // Torres menores
  { type: 'circle', cx: 100, cy: 80, r: 5 },
  { type: 'circle', cx: 300, cy: 25, r: 5 },
  { type: 'circle', cx: 420, cy: 25, r: 5 },
  { type: 'circle', cx: 615, cy: 320, r: 5 },
  { type: 'circle', cx: 380, cy: 490, r: 5 },
  { type: 'circle', cx: 120, cy: 470, r: 5 },
  { type: 'circle', cx: 35, cy: 250, r: 5 },
  // Rio principal
  { type: 'path', d: 'M0,280 Q100,300 150,300 Q200,290 250,320 Q300,350 350,340 Q420,320 500,350 Q580,380 650,360', stroke: true, isWater: true },
  // Afluente menor
  { type: 'path', d: 'M150,300 Q180,350 170,400 Q160,440 180,480', stroke: true, isWater: true, thin: true },
  // Pontes
  { type: 'rect', x: 148, y: 298, width: 12, height: 6 },
  { type: 'rect', x: 345, y: 338, width: 12, height: 6 },
  { type: 'rect', x: 478, y: 348, width: 10, height: 5 },
  // Estradas principais (linhas sutis)
  { type: 'path', d: 'M160,375 L320,235 L455,115', stroke: true, isRoad: true },
  { type: 'path', d: 'M320,235 L485,280', stroke: true, isRoad: true },
  { type: 'path', d: 'M160,375 L365,375', stroke: true, isRoad: true },
  // Árvores decorativas nos Jardins
  { type: 'tree', cx: 110, cy: 195 },
  { type: 'tree', cx: 140, cy: 215 },
  { type: 'tree', cx: 195, cy: 195 },
  { type: 'tree', cx: 125, cy: 245 },
  { type: 'tree', cx: 175, cy: 265 },
  { type: 'tree', cx: 105, cy: 270 },
  // Barcos no porto (decorativos)
  { type: 'boat', cx: 65, cy: 400, rotation: 15 },
  { type: 'boat', cx: 90, cy: 420, rotation: -10 },
  { type: 'boat', cx: 185, cy: 455, rotation: 5 },
]

// ===========================
// ELEMENTOS "SUSPEITOS"
// ===========================
type SuspectElement = {
  id: string
  cx: number
  cy: number
  district: string
  label: string
  hint: string
  shape: 'circle' | 'square' | 'diamond'
}

const suspectElements: SuspectElement[] = [
  { id: 'sus-caixotes', cx: 125, cy: 405, district: 'porto', label: 'Caixotes', hint: 'Apenas caixas de mercadorias.', shape: 'square' },
  { id: 'sus-rede', cx: 175, cy: 385, district: 'porto', label: 'Redes', hint: 'Redes de pesca secando ao sol.', shape: 'circle' },
  { id: 'sus-barril-porto', cx: 145, cy: 360, district: 'porto', label: 'Barris', hint: 'Cheiram a peixe salgado.', shape: 'circle' },
  { id: 'sus-ancora', cx: 235, cy: 415, district: 'porto', label: 'Âncora', hint: 'Uma âncora enferrujada.', shape: 'diamond' },
  { id: 'sus-cordas', cx: 108, cy: 378, district: 'porto', label: 'Cordas', hint: 'Cordas entrelaçadas no chão.', shape: 'circle' },
  { id: 'sus-mastro', cx: 200, cy: 395, district: 'porto', label: 'Mastro', hint: 'Um mastro quebrado.', shape: 'square' },

  { id: 'sus-barraca1', cx: 295, cy: 210, district: 'mercado', label: 'Barraca', hint: 'Frutas e legumes coloridos.', shape: 'square' },
  { id: 'sus-barraca2', cx: 335, cy: 195, district: 'mercado', label: 'Barraca', hint: 'Tecidos e roupas usadas.', shape: 'square' },
  { id: 'sus-barraca3', cx: 375, cy: 210, district: 'mercado', label: 'Barraca', hint: 'Especiarias aromáticas.', shape: 'square' },
  { id: 'sus-carroça', cx: 310, cy: 280, district: 'mercado', label: 'Carroça', hint: 'Carroça de um mercador.', shape: 'diamond' },
  { id: 'sus-poço', cx: 280, cy: 240, district: 'mercado', label: 'Poço', hint: 'Um poço de água limpa.', shape: 'circle' },
  { id: 'sus-estatua-mercado', cx: 355, cy: 250, district: 'mercado', label: 'Estátua', hint: 'Estátua de um comerciante famoso.', shape: 'diamond' },

  { id: 'sus-guarda', cx: 475, cy: 145, district: 'cidadela', label: 'Sentinela', hint: 'Um guarda imóvel.', shape: 'diamond' },
  { id: 'sus-bandeira', cx: 505, cy: 85, district: 'cidadela', label: 'Bandeira', hint: 'A bandeira de Helos tremula.', shape: 'square' },

  { id: 'sus-bigorna', cx: 505, cy: 245, district: 'artifices', label: 'Bigorna', hint: 'Uma bigorna quente.', shape: 'square' },
  { id: 'sus-engrenagem', cx: 545, cy: 285, district: 'artifices', label: 'Engrenagem', hint: 'Engrenagens enferrujadas.', shape: 'circle' },
  { id: 'sus-ferramentas', cx: 465, cy: 305, district: 'artifices', label: 'Ferramentas', hint: 'Martelos e alicates.', shape: 'square' },
  { id: 'sus-chaminé', cx: 520, cy: 225, district: 'artifices', label: 'Chaminé', hint: 'Fumaça constante sobe.', shape: 'circle' },
  { id: 'sus-sucata', cx: 485, cy: 330, district: 'artifices', label: 'Sucata', hint: 'Peças de metal empilhadas.', shape: 'square' },

  { id: 'sus-lixo', cx: 305, cy: 385, district: 'viela', label: 'Entulho', hint: 'Lixo e trapos velhos.', shape: 'circle' },
  { id: 'sus-escada', cx: 415, cy: 380, district: 'viela', label: 'Escada', hint: 'Escada quebrada.', shape: 'square' },
  { id: 'sus-porta-viela', cx: 340, cy: 400, district: 'viela', label: 'Porta', hint: 'Uma porta trancada.', shape: 'square' },

  { id: 'sus-fonte', cx: 165, cy: 235, district: 'jardins', label: 'Fonte', hint: 'Água cristalina jorra suavemente.', shape: 'circle' },
  { id: 'sus-banco', cx: 135, cy: 195, district: 'jardins', label: 'Banco', hint: 'Um banco de pedra antiga.', shape: 'square' },
  { id: 'sus-flores', cx: 195, cy: 210, district: 'jardins', label: 'Flores', hint: 'Flores silvestres perfumadas.', shape: 'circle' },
]

// ===========================
// ELEMENTOS SECRETOS REAIS
// ===========================
type SecretElement = {
  id: string
  cx: number
  cy: number
  district: string
  hint: string
  shape: 'circle' | 'rune' | 'crack' | 'symbol'
}

const secretElements: SecretElement[] = [
  { id: 'secret-contrabandista', cx: 128, cy: 425, district: 'porto', hint: 'Há algo estranho entre os caixotes...', shape: 'crack' },
  { id: 'secret-lanterna-apagada', cx: 78, cy: 383, district: 'porto', hint: 'Esta lanterna nunca acende.', shape: 'symbol' },
  { id: 'secret-ancora-enterrada', cx: 215, cy: 448, district: 'porto', hint: 'Uma corrente some na areia.', shape: 'circle' },

  { id: 'secret-fonte-central', cx: 322, cy: 268, district: 'mercado', hint: 'Algo brilha no fundo da água...', shape: 'circle' },
  { id: 'secret-placa-loja', cx: 288, cy: 178, district: 'mercado', hint: 'Letras quase apagadas.', shape: 'rune' },

  { id: 'secret-estatua-olhos', cx: 423, cy: 168, district: 'cidadela', hint: 'Os olhos parecem seguir você.', shape: 'symbol' },
  { id: 'secret-jardim-torre', cx: 518, cy: 98, district: 'cidadela', hint: 'Uma porta quase invisível.', shape: 'crack' },

  { id: 'secret-automato-antigo', cx: 538, cy: 298, district: 'artifices', hint: 'Esta sucata parece... respirar?', shape: 'symbol' },
  { id: 'secret-chamine-mensagens', cx: 495, cy: 243, district: 'artifices', hint: 'A fumaça forma padrões estranhos.', shape: 'circle' },

  { id: 'secret-guilda-sombras', cx: 385, cy: 435, district: 'viela', hint: 'Uma rachadura profunda demais.', shape: 'crack' },
  { id: 'secret-barril-moedas', cx: 358, cy: 365, district: 'viela', hint: 'Este barril é pesado demais.', shape: 'circle' },
  { id: 'secret-simbolo-porta', cx: 295, cy: 418, district: 'viela', hint: 'Uma marca quase invisível.', shape: 'rune' },

  { id: 'secret-inscricao-antiga', cx: 178, cy: 248, district: 'jardins', hint: 'Letras de uma era esquecida.', shape: 'rune' },
  { id: 'secret-arvore-oca', cx: 112, cy: 268, district: 'jardins', hint: 'O tronco parece oco.', shape: 'crack' },
]

// ===========================
// FALSOS PONTOS
// ===========================
type FalseElement = {
  id: string
  cx: number
  cy: number
  opacity: number
}

const falseElements: FalseElement[] = [
  { id: 'false-1', cx: 255, cy: 345, opacity: 0.12 },
  { id: 'false-2', cx: 188, cy: 315, opacity: 0.1 },
  { id: 'false-3', cx: 398, cy: 255, opacity: 0.14 },
  { id: 'false-4', cx: 442, cy: 185, opacity: 0.11 },
  { id: 'false-5', cx: 565, cy: 315, opacity: 0.13 },
  { id: 'false-6', cx: 325, cy: 425, opacity: 0.12 },
  { id: 'false-7', cx: 148, cy: 275, opacity: 0.1 },
  { id: 'false-8', cx: 88, cy: 345, opacity: 0.14 },
  { id: 'false-9', cx: 475, cy: 365, opacity: 0.11 },
  { id: 'false-10', cx: 538, cy: 145, opacity: 0.12 },
]

// ===========================
// MICRO-INTERAÇÕES
// ===========================
type MicroDetail = {
  id: string
  cx: number
  cy: number
  icon: 'lantern' | 'barrel' | 'sign' | 'crack' | 'symbol' | 'plant'
  text: string
}

const microDetails: MicroDetail[] = [
  { id: 'micro-lantern-1', cx: 92, cy: 358, icon: 'lantern', text: 'Uma lanterna de óleo.' },
  { id: 'micro-lantern-2', cx: 265, cy: 235, icon: 'lantern', text: 'Luz fraca ilumina a rua.' },
  { id: 'micro-lantern-3', cx: 438, cy: 125, icon: 'lantern', text: 'Uma chama dourada.' },
  { id: 'micro-lantern-4', cx: 378, cy: 345, icon: 'lantern', text: 'Está apagada.' },

  { id: 'micro-barrel-1', cx: 158, cy: 415, icon: 'barrel', text: 'Cheira a vinho.' },
  { id: 'micro-barrel-2', cx: 298, cy: 255, icon: 'barrel', text: 'Água de chuva.' },
  { id: 'micro-barrel-3', cx: 475, cy: 275, icon: 'barrel', text: 'Óleo de máquinas.' },

  { id: 'micro-sign-1', cx: 172, cy: 338, icon: 'sign', text: 'Porto das Marés' },
  { id: 'micro-sign-2', cx: 348, cy: 178, icon: 'sign', text: 'Praça do Mercado' },
  { id: 'micro-sign-3', cx: 458, cy: 228, icon: 'sign', text: 'Oficinas' },
  { id: 'micro-sign-4', cx: 315, cy: 358, icon: 'sign', text: 'Cuidado.' },

  { id: 'micro-crack-1', cx: 245, cy: 295, icon: 'crack', text: 'Uma rachadura antiga.' },
  { id: 'micro-crack-2', cx: 405, cy: 385, icon: 'crack', text: 'O chão está cedendo.' },

  { id: 'micro-plant-1', cx: 148, cy: 225, icon: 'plant', text: 'Ervas medicinais.' },
  { id: 'micro-plant-2', cx: 205, cy: 255, icon: 'plant', text: 'Musgo antigo.' },
]

interface CityMapProps {
  onDistrictHover?: (district: District | null) => void
  onSecretFound?: (secretId: string) => void
  discoveredSecrets?: string[]
}

type HoveredElement = {
  id: string
  type: 'suspect' | 'secret' | 'micro' | 'false'
}

export function CityMap({ onDistrictHover, onSecretFound, discoveredSecrets = [] }: CityMapProps) {
  const router = useRouter()
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null)
  const [hoveredElement, setHoveredElement] = useState<HoveredElement | null>(null)
  const [clickedElement, setClickedElement] = useState<string | null>(null)
  const [microText, setMicroText] = useState<{ text: string; x: number; y: number } | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const handleElementInteraction = (
    element: { id: string; type: 'suspect' | 'secret' | 'micro' | 'false' },
    e?: React.MouseEvent
  ) => {
    if (isMobile) {
      e?.stopPropagation()

      setHoveredElement(prev =>
        prev?.id === element.id ? null : element
      )
    } else {
      setHoveredElement(element)
    }
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')

    const check = () => setIsMobile(media.matches)
    check()

    if (media.addEventListener) {
      media.addEventListener('change', check)
      return () => media.removeEventListener('change', check)
    }

    media.addListener(check)
    return () => media.removeListener(check)
  }, [])

    useEffect(() => {
    if (!isMobile) return

    const handleClickOutside = () => {
      setHoveredElement(null)
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [isMobile])

  useEffect(() => {
    return () => {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current)
      }
    }
  }, [])

  const clearMobileTooltip = useCallback(() => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current)
      tooltipTimerRef.current = null
    }
  }, [])

  const showMobileTooltip = useCallback((id: string, type: HoveredElement['type']) => {
    setHoveredElement({ id, type })
    clearMobileTooltip()
    tooltipTimerRef.current = setTimeout(() => {
      setHoveredElement(null)
      tooltipTimerRef.current = null
    }, 2200)
  }, [clearMobileTooltip])

  // Som do hover
  const hoverSound = useMemo(() => {
    if (typeof window === 'undefined') return null
    const audio = new Audio('/sounds/hover.mp3')
    audio.volume = 0.15
    audio.preload = 'auto'
    return audio
  }, [])

  // Tooltip atual baseado no elemento hover
  const currentTooltip = useMemo(() => {
    if (!hoveredElement) return null

    if (hoveredElement.type === 'suspect') {
      const el = suspectElements.find(e => e.id === hoveredElement.id)
      return el ? { label: el.label, hint: el.hint } : null
    }

    if (hoveredElement.type === 'secret') {
      const el = secretElements.find(e => e.id === hoveredElement.id)
      const isDiscovered = discoveredSecrets.includes(hoveredElement.id)
      return el ? { label: isDiscovered ? 'Descoberto' : '???', hint: el.hint } : null
    }

    if (hoveredElement.type === 'false') {
      return { label: '...', hint: 'Parece ser apenas uma marca antiga.' }
    }

    return null
  }, [hoveredElement, discoveredSecrets])

  const parchmentDots = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        cx: Math.random() * 650,
        cy: Math.random() * 520,
        r: Math.random() * 3 + 0.5,
      })),
    []
  )

  const handleDistrictClick = useCallback((district: District) => {
    setSelectedDistrict(district.id)

    setTimeout(() => {
      router.push(`/distrito/${district.slug}`)
    }, 550)
  }, [router])

  const handleDistrictHover = useCallback((district: District | null) => {
    setHoveredDistrict(district?.id || null)
    onDistrictHover?.(district)
  }, [onDistrictHover])

  const handleSecretClick = useCallback((secretId: string, e: MouseEvent<SVGGElement>) => {
    e.stopPropagation()
    setClickedElement(secretId)

    setTimeout(() => setClickedElement(null), 300)

    if (!discoveredSecrets.includes(secretId)) {
      onSecretFound?.(secretId)
    }
  }, [discoveredSecrets, onSecretFound])

  const handleMicroClick = useCallback((detail: MicroDetail, e: MouseEvent<SVGGElement>) => {
    e.stopPropagation()
    setMicroText({ text: detail.text, x: detail.cx, y: detail.cy - 15 })
    setTimeout(() => setMicroText(null), 2500)
  }, [])

  const renderShape = (shape: string, size: number, isHovered: boolean) => {
    const s = isHovered ? size * 1.3 : size

    switch (shape) {
      case 'square':
        return <rect x={-s / 2} y={-s / 2} width={s} height={s} transform="rotate(45)" />
      case 'diamond':
        return <polygon points={`0,${-s} ${s},0 0,${s} ${-s},0`} />
      case 'rune':
        return <path d={`M${-s / 2},${-s} L${s / 2},${-s} L0,0 L${s / 2},${s} L${-s / 2},${s} L0,0 Z`} />
      case 'crack':
        return <path d={`M${-s},0 L${-s / 3},${-s / 2} L0,0 L${s / 3},${s / 2} L${s},0`} strokeWidth="1.5" fill="none" />
      case 'symbol':
        return <circle r={s * 0.7} strokeWidth="1" fill="none" />
      default:
        return <circle r={s} />
    }
  }

  return (
    <div className="relative w-full h-full select-none">
      <svg
        viewBox="0 0 650 520"
        className="w-full h-full"
        style={{ maxHeight: '80vh' }}
      >
        <defs>
          <filter id="fogBlurSoft">
            <feGaussianBlur stdDeviation="14" />
          </filter>

          <radialGradient id="fogGradientSoft">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.22" />
          </radialGradient>

          <radialGradient id="mapBg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--background))" />
          </radialGradient>

          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="hsl(var(--gold))" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="secretGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="hsl(var(--gold))" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="suspectGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feFlood floodColor="hsl(var(--primary))" floodOpacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="clickFlash" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(var(--gold))" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M0,10 Q5,5 10,10 T20,10" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>

        {/* Fundo do mapa */}
        <rect x="0" y="0" width="650" height="520" fill="url(#mapBg)" />

        <motion.rect
          x="0"
          y="0"
          width="650"
          height="520"
          fill="url(#fogGradientSoft)"
          filter="url(#fogBlurSoft)"
          animate={{ opacity: isMobile ? [0.08, 0.16, 0.08] : [0.12, 0.22, 0.12] }}
          transition={{ duration: isMobile ? 14 : 10, repeat: Infinity, ease: 'easeInOut' }}
          pointerEvents="none"
        />

        <rect
          x="0"
          y="0"
          width="650"
          height="520"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="18"
          pointerEvents="none"
        />

        {/* Textura de pergaminho */}
        <g opacity="0.06">
          {parchmentDots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill="hsl(var(--foreground))"
            />
          ))}
        </g>

        {/* ===== CAMADA 1: Elementos decorativos (sem interação) ===== */}
        <g className="decorative-elements" opacity="0.4">
          {decorativeElements.map((el, i) => {
            if (el.type === 'path') {
              return (
                <path
                  key={i}
                  d={el.d}
                  fill={el.isWater ? 'url(#waterPattern)' : 'none'}
                  stroke={el.stroke ? (el.isWater ? 'hsl(var(--accent))' : el.isRoad ? 'hsl(var(--muted-foreground))' : 'hsl(var(--border))') : 'none'}
                  strokeWidth={el.isWater ? (el.thin ? 1.5 : 3) : el.isRoad ? 0.5 : 2}
                  strokeDasharray={el.isWater ? '5,5' : el.isRoad ? '2,4' : undefined}
                  opacity={el.isRoad ? 0.3 : 1}
                />
              )
            }

            if (el.type === 'circle') {
              return (
                <circle
                  key={i}
                  cx={el.cx}
                  cy={el.cy}
                  r={el.r}
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                />
              )
            }

            if (el.type === 'rect') {
              return (
                <rect
                  key={i}
                  x={el.x}
                  y={el.y}
                  width={el.width}
                  height={el.height}
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                />
              )
            }

            if (el.type === 'tree') {
              return (
                <g key={i} transform={`translate(${el.cx}, ${el.cy})`}>
                  <circle r="4" fill="hsl(150 30% 25%)" opacity="0.6" />
                  <circle r="2.5" cy="-1" fill="hsl(150 35% 30%)" opacity="0.7" />
                </g>
              )
            }

            if (el.type === 'boat') {
              return (
                <g key={i} transform={`translate(${el.cx}, ${el.cy}) rotate(${el.rotation})`}>
                  <ellipse rx="6" ry="2" fill="hsl(30 30% 30%)" opacity="0.5" />
                  <line x1="0" y1="0" x2="0" y2="-5" stroke="hsl(30 20% 40%)" strokeWidth="0.5" opacity="0.5" />
                </g>
              )
            }

            return null
          })}
        </g>

        {/* ===== CAMADA 2: Distritos clicáveis ===== */}
        <motion.g
          className="districts"
          animate={{
            scale: selectedDistrict ? 1.05 : 1,
            x: selectedDistrict ? -8 : 0,
            y: selectedDistrict ? -5 : 0,
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {districts.map((district) => {
            const pathData = districtPaths[district.id]
            if (!pathData) return null

            const isHovered = hoveredDistrict === district.id
            const isSelected = selectedDistrict === district.id
            const isDimmed = hoveredDistrict ? hoveredDistrict !== district.id : false

            return (
              <g key={district.id}>
                {isSelected && (
                  <motion.path
                    d={pathData.path}
                    fill={district.color}
                    fillOpacity={0.18}
                    stroke={district.color}
                    strokeWidth={10}
                    strokeOpacity={0.22}
                    style={{ filter: 'blur(8px)' }}
                    pointerEvents="none"
                  />
                )}

                <motion.path
                  d={pathData.path}
                  fill={district.color}
                  fillOpacity={isSelected ? 0.42 : isHovered ? 0.35 : 0.14}
                  stroke={district.color}
                  strokeWidth={isSelected ? 4 : isHovered ? 2.5 : 1.2}
                  strokeOpacity={isDimmed ? 0.15 : isHovered ? 1 : 0.45}
                  className="cursor-pointer"
                  filter={isSelected ? 'url(#goldGlow)' : isHovered ? 'url(#goldGlow)' : undefined}
                  onMouseEnter={() => {
                    if (!isMobile) handleDistrictHover(district)
                    if (hoverSound) {
                      hoverSound.currentTime = 0
                      hoverSound.play().catch(() => {})
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) handleDistrictHover(null)
                  }}
                  onClick={() => {
                    if (isMobile) {
                      if (hoveredDistrict === district.id) {
                        handleDistrictClick(district)
                      } else {
                        setSelectedDistrict(district.id)
                        handleDistrictHover(district)
                      }
                    } else {
                      handleDistrictClick(district)
                    }
                  }}
                  animate={{
                    scale: isSelected ? 1.08 : isHovered ? 1.03 : 1,
                    opacity: isDimmed ? 0.35 : 1,
                  }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                />

                <rect
                  x={pathData.labelX - 38}
                  y={pathData.labelY - 12}
                  width="76"
                  height="18"
                  rx="9"
                  fill="rgba(0,0,0,0.32)"
                  pointerEvents="none"
                />

                <text
                  x={pathData.labelX}
                  y={pathData.labelY}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fill="white"
                  fontSize="12"
                  fontWeight="700"
                  opacity={isDimmed ? 0.35 : isHovered ? 1 : 0.82}
                  style={{ fontFamily: 'var(--font-cinzel, var(--font-serif))' }}
                  stroke="rgba(0,0,0,0.72)"
                  strokeWidth="1.4"
                  paintOrder="stroke"
                  letterSpacing="0.08em"
                >
                  {district.name}
                </text>
              </g>
            )
          })}
        </motion.g>

        {/* ===== CAMADA 3: Micro-detalhes ===== */}
        <g className="micro-details">
          {microDetails.map((detail) => {
            const isHovered = hoveredElement?.id === detail.id

            return (
              <g
                key={detail.id}
                transform={`translate(${detail.cx}, ${detail.cy})`}
                className="cursor-pointer"
                onMouseEnter={() => !isMobile && handleElementInteraction({ id: detail.id, type: 'micro' })}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
                onClick={(e) => {
                  handleMicroClick(detail, e)
                  handleElementInteraction({ id: detail.id, type: 'micro' }, e)
                }}
              >
                <motion.circle
                  r={isHovered ? 5 : 3}
                  fill="hsl(var(--muted-foreground))"
                  opacity={isHovered ? 0.6 : 0.25}
                  filter={isHovered ? 'url(#suspectGlow)' : undefined}
                  animate={{ scale: isHovered ? 1.2 : 1 }}
                  transition={{ duration: 0.15 }}
                />
              </g>
            )
          })}
        </g>

        {/* ===== CAMADA 4: Elementos suspeitos ===== */}
        <g className="suspect-elements">
          {suspectElements.map((element) => {
            const isHovered = hoveredElement?.id === element.id

            return (
              <g
                key={element.id}
                transform={`translate(${element.cx}, ${element.cy})`}
                className="cursor-pointer"
                onMouseEnter={() => !isMobile && handleElementInteraction({ id: element.id, type: 'suspect' })}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
                onClick={(e) => handleElementInteraction({ id: element.id, type: 'suspect' }, e)}
              >
                <motion.g
                  fill="hsl(var(--muted-foreground))"
                  opacity={isHovered ? 0.55 : 0.2}
                  filter={isHovered ? 'url(#suspectGlow)' : undefined}
                  animate={{ scale: isHovered ? 1.15 : 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {renderShape(element.shape, 4, isHovered)}
                </motion.g>
              </g>
            )
          })}
        </g>

        {/* ===== CAMADA 5: Falsos pontos ===== */}
        <g className="false-elements">
          {falseElements.map((element, index) => {
            const isHovered = hoveredElement?.id === element.id

            return (
              <motion.circle
                key={element.id}
                cx={element.cx}
                cy={element.cy}
                r={isHovered ? 4 : 2.5}
                fill="hsl(var(--muted-foreground))"
                opacity={isHovered ? 0.3 : element.opacity}
                className="cursor-pointer"
                onMouseEnter={() => !isMobile && handleElementInteraction({ id: element.id, type: 'false' })}
                onMouseLeave={() => !isMobile && setHoveredElement(null)}
                onClick={(e) => handleElementInteraction({ id: element.id, type: 'false' }, e)}
                animate={{
                  opacity: isHovered ? 0.3 : [element.opacity * 0.7, element.opacity, element.opacity * 0.7],
                }}
                transition={{
                  duration: isHovered ? 0.15 : 5 + index * 0.25,
                  repeat: isHovered ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
        </g>

        {/* ===== CAMADA 6: Elementos secretos REAIS ===== */}
        <g className="secret-elements">
          {secretElements.map((secret) => {
            const isDiscovered = discoveredSecrets.includes(secret.id)
            const isHovered = hoveredElement?.id === secret.id
            const isClicked = clickedElement === secret.id

            return (
              <g
                key={secret.id}
                transform={`translate(${secret.cx}, ${secret.cy})`}
                className="cursor-pointer"
                onClick={(e) => {
                  if (isMobile) {
                    e.stopPropagation()

                    if (hoveredElement?.id === secret.id && hoveredElement.type === 'secret') {
                      handleSecretClick(secret.id, e)
                    } else {
                      showMobileTooltip(secret.id, 'secret')
                    }
                    return
                  }

                  handleSecretClick(secret.id, e)
                }}
                onMouseEnter={() => {
                  if (!isMobile) setHoveredElement({ id: secret.id, type: 'secret' })
                }}
                onMouseLeave={() => {
                  if (!isMobile) setHoveredElement(null)
                }}
              >
                <motion.g
                  fill={isDiscovered ? 'hsl(var(--gold))' : 'hsl(var(--muted-foreground))'}
                  stroke={isDiscovered ? 'hsl(var(--gold))' : 'hsl(var(--muted-foreground))'}
                  opacity={isDiscovered ? 0.85 : isHovered ? 0.5 : 0.12}
                  filter={isClicked ? 'url(#clickFlash)' : (isHovered && !isDiscovered) ? 'url(#secretGlow)' : undefined}
                  animate={{
                    opacity: isDiscovered ? 0.85 : isHovered ? 0.5 : [0.08, 0.15, 0.08],
                    scale: isClicked ? 1.5 : isHovered ? 1.2 : 1,
                  }}
                  transition={{
                    duration: isDiscovered || isHovered || isClicked ? 0.2 : 4 + secret.cx * 0.001,
                    repeat: (isDiscovered || isHovered || isClicked) ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {renderShape(secret.shape, 4, isHovered)}
                </motion.g>
              </g>
            )
          })}
        </g>

        {/* Texto de micro-interação flutuante */}
        <AnimatePresence>
          {microText && (
            <motion.g
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <rect
                x={microText.x - 50}
                y={microText.y - 10}
                width="100"
                height="18"
                rx="4"
                fill="hsl(var(--card))"
                fillOpacity="0.95"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                pointerEvents="none"
              />
              <text
                x={microText.x}
                y={microText.y + 3}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                opacity="0.9"
                fontSize="12"
                fontWeight="600"
                letterSpacing="0.08em"
                style={{ fontFamily: 'var(--font-cinzel, var(--font-serif))' }}
                pointerEvents="none"
              >
                {microText.text}
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Título do mapa */}
        <text
          x="325"
          y="502"
          textAnchor="middle"
          fill="hsl(var(--gold))"
          fontSize="13"
          opacity="0.5"
          letterSpacing="0.2em"
          style={{ fontFamily: 'var(--font-cormorant, var(--font-serif))' }}
          pointerEvents="none"
        >
          CIDADE DE HELOS
        </text>

        {/* Bússola sutil */}
        <g transform="translate(600, 480)" opacity="0.4" pointerEvents="none">
          <circle r="12" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
          <text y="-4" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="8">N</text>
          <line y1="-8" y2="-2" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        </g>
      </svg>

      {/* Tooltip para elementos suspeitos/secretos */}
      <AnimatePresence>
        {currentTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={`absolute bottom-4 pointer-events-none ${
              isMobile
                ? 'left-1/2 -translate-x-1/2 w-[92%] max-w-sm'
                : 'left-4'
            }`}
          >
            <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2.5 shadow-lg max-w-xs">
              <p className="text-xs text-muted-foreground mb-0.5">{currentTooltip.label}</p>
              <p className="text-sm text-foreground/90 italic leading-relaxed">{currentTooltip.hint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip do distrito */}
      <AnimatePresence>
        {hoveredDistrict && !hoveredElement && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className={`absolute bottom-4 pointer-events-none ${
              isMobile
                ? 'left-1/2 -translate-x-1/2 w-[92%] max-w-sm'
                : 'left-4 right-auto'
            }`}
          >
            <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg max-w-sm">
              <h3
                className="text-primary font-semibold"
                style={{ fontFamily: 'var(--font-cinzel, var(--font-serif))' }}
              >
                {districts.find(d => d.id === hoveredDistrict)?.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                {districts.find(d => d.id === hoveredDistrict)?.atmosphere}
              </p>
              <p className="text-xs text-gold/60 mt-2">
                {isMobile ? 'Toque novamente para entrar' : 'Clique para explorar'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}