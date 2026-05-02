// ============================================
// TIPOS DO ATLAS DE HELOS
// ============================================

export type ItemCategory = 'armas' | 'armaduras' | 'ferramentas' | 'consumíveis' | 'aventura'
export type ItemRarity = 'comum' | 'incomum' | 'raro'
export type ShopType = 
  | 'ferreiro' 
  | 'alquimista' 
  | 'taverna' 
  | 'armeiro' 
  | 'boticário' 
  | 'mercador' 
  | 'joalheiro' 
  | 'arcano'
  | 'templo'
  | 'serviço'
  | 'mercado-negro'
  | 'entretenimento'
  | 'antiquário'
  | 'biblioteca'
  | 'inventor'

// ============================================
// ITEM
// ============================================
export interface Item {
  id: string
  name: string
  description: string
  price: number // em PO (peças de ouro)
  category: ItemCategory
  rarity?: ItemRarity
}

// ============================================
// LOJA
// ============================================
export interface Shop {
  id: string
  slug: string
  name: string
  type: ShopType
  description: string
  ambiance?: string // Descrição atmosférica curta
  highlight?: string // Item ou característica destaque
  districtId: string
  npcId: string
  items: string[] // IDs dos itens
}

// ============================================
// NPC
// ============================================
export interface NPC {
  id: string
  name: string
  role: string
  personality: string
  appearance?: string
  greeting: string      // 1ª interação
  whisper?: string      // 2ª interação (segredo) - opcional
  // Sistema de reação do mundo
  reactiveDialogues?: ReactiveDialogue[]
  shopId?: string
  locationId?: string
}

// Diálogos que mudam baseado em descobertas
export interface ReactiveDialogue {
  trigger: {
    type: 'secret_discovered' | 'npc_interacted' | 'chain_complete'
    id: string // ID do segredo, NPC ou cadeia
  }
  dialogue: string
  replaces?: 'greeting' | 'whisper' // se deve substituir o diálogo padrão
}

// ============================================
// DISTRITO
// ============================================
export interface District {
  id: string
  slug: string
  name: string
  description: string
  atmosphere: string // Atmosfera curta (sal, cordas, marinheiros...)
  color: string // Cor temática para o mapa
  shops: string[] // IDs das lojas
  locations: string[] // IDs de locais não-comerciais
  secrets: string[] // IDs dos segredos
}

// ============================================
// LOCAL (não-comercial)
// ============================================
export interface Location {
  id: string
  slug: string
  name: string
  type: 'landmark' | 'ruin' | 'square' | 'gate' | 'bridge' | 'well' | 'statue'
  description: string
  districtId: string
  npcId?: string
  // Sistema de reação do mundo
  reactiveDescriptions?: ReactiveDescription[]
}

// Descrições que mudam baseado em descobertas
export interface ReactiveDescription {
  trigger: {
    type: 'secret_discovered' | 'chain_complete'
    id: string
  }
  addendum: string // Texto adicional que aparece
}

// ============================================
// SEGREDO
// ============================================
export interface Secret {
  id: string
  type: 'hidden-npc' | 'hidden-location' | 'lore' | 'hidden-item' | 'whisper'
  locationId?: string    // Onde está (se for no mapa)
  npcId?: string        // Se for whisper de NPC
  shopId?: string       // Se estiver em uma loja
  districtId: string    // Distrito onde está
  hint?: string         // Dica sutil (opcional)
  content: string       // O que é revelado
  title: string         // Título curto para o toast
  // Sistema de conexões
  connections?: SecretConnection[]
  chainId?: string      // Se faz parte de uma cadeia
  chainOrder?: number   // Posição na cadeia (1, 2, 3...)
  requires?: string[]   // IDs de segredos necessários para desbloquear
  symbol?: string       // Símbolo visual que conecta (ex: "serpente", "lua", "chave")
}

// Conexão entre segredos
export interface SecretConnection {
  targetId: string      // ID do segredo conectado
  type: 'reveals' | 'hints' | 'unlocks' | 'contradicts'
  description?: string  // Texto que aparece quando a conexão é descoberta
}

// ============================================
// CADEIA DE DESCOBERTA
// ============================================
export interface DiscoveryChain {
  id: string
  name: string          // Nome interno (não visível ao jogador)
  secrets: string[]     // IDs dos segredos em ordem
  reward?: {
    type: 'lore' | 'npc_dialogue' | 'location_change'
    content: string
  }
}

// ============================================
// ESTADO DE DESCOBERTAS
// ============================================
export interface DiscoveryState {
  secrets: string[]     // IDs de segredos descobertos
  npcsInteracted: Record<string, number> // npcId -> número de interações
  chainsCompleted: string[] // IDs de cadeias completadas
  connectionsDiscovered: string[] // "secretA:secretB" conexões vistas
  lastVisited?: string  // Último local visitado
}

// ============================================
// COORDENADAS DO MAPA
// ============================================
export interface MapCoordinates {
  x: number
  y: number
  width?: number
  height?: number
}

export interface MapElement {
  id: string
  type: 'district' | 'location' | 'secret'
  coordinates: MapCoordinates
  path?: string // SVG path para formas complexas
}
