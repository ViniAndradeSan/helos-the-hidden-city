import type { DiscoveryChain } from '@/lib/types'

// ============================================
// CADEIAS DE DESCOBERTA
// Sequências naturais A → B → C
// Sem UI de quest - o jogador percebe sozinho
// ============================================

export const discoveryChains: DiscoveryChain[] = [
  // ============================================
  // A GUILDA DOS NAVEGANTES
  // Símbolos conectados: "serpente-marinha"
  // Porto → Viela → Cidadela
  // ============================================
  {
    id: 'chain-navegantes',
    name: 'A Guilda dos Navegantes',
    secrets: [
      'secret-lanterna-apagada',    // Porto: símbolo na lanterna
      'secret-simbolo-porta',       // Viela: mesmo símbolo em porta
      'secret-decreto-antigo',      // Cidadela: decreto sobre a guilda
    ],
    reward: {
      type: 'lore',
      content: 'A Guilda dos Navegantes não foi extinta. Ela apenas desceu às sombras. E ainda controla mais do que parece.',
    },
  },

  // ============================================
  // O MISTÉRIO DE ELDORIA
  // Símbolos conectados: "três-luas"
  // Jardins → Cidadela → Mercado
  // ============================================
  {
    id: 'chain-eldoria',
    name: 'O Mistério de Eldoria',
    secrets: [
      'secret-inscricao-antiga',    // Jardins: inscrição sobre Eldoria
      'secret-estatua-olhos',       // Cidadela: mapa com área desconhecida
      'secret-fonte-central',       // Mercado: moeda do Primeiro Rei
    ],
    reward: {
      type: 'lore',
      content: 'Eldoria não é um lugar. É um momento. E quando as condições certas se alinharem, o caminho se abrirá novamente.',
    },
  },

  // ============================================
  // OS GUARDIÕES ADORMECIDOS
  // Símbolos conectados: "olho-fechado"
  // Cidadela → Jardins → Artífices
  // ============================================
  {
    id: 'chain-guardioes',
    name: 'Os Guardiões Adormecidos',
    secrets: [
      'secret-cripta-esquecida',    // Cidadela: cripta sob o templo
      'secret-tomo-proibido',       // Jardins: livro que não se abre à noite
      'secret-automato-antigo',     // Artífices: autômato com símbolos antigos
    ],
    reward: {
      type: 'lore',
      content: 'Os primeiros guardiões não eram humanos. E alguns ainda funcionam, esperando ser ativados.',
    },
  },

  // ============================================
  // A RAINHA ÉLFICA
  // Símbolos conectados: "folha-prata"
  // Jardins → Mercado → Porto
  // ============================================
  {
    id: 'chain-rainha-elfica',
    name: 'A Rainha que Não Morreu',
    secrets: [
      'secret-anel-elfico',         // Jardins: anel que voltou sozinho
      'secret-tecido-vermelho',     // Mercado: tecido da caravana perdida
      'secret-navio-fantasma',      // Porto: navio que atracou em silêncio
    ],
    reward: {
      type: 'lore',
      content: 'Ela partiu em uma caravana que nunca chegou. Mas o navio que a levou ainda navega. E às vezes, retorna.',
    },
  },

  // ============================================
  // O VENENO DO CONDE
  // Símbolos conectados: "adaga-gota"
  // Viela → Artífices → Cidadela
  // ============================================
  {
    id: 'chain-conde-varis',
    name: 'A Morte do Conde Varis',
    secrets: [
      'secret-conde-varis',         // Viela: Nyx sabe quem encomendou
      'secret-pocao-misteriosa',    // Artífices: fórmula que muda de cor
      'secret-decreto-antigo',      // Cidadela: decreto selado misterioso
    ],
    reward: {
      type: 'lore',
      content: 'O veneno não veio de fora. Foi encomendado por alguém do Conselho. O decreto prova isso.',
    },
  },

  // ============================================
  // A TÉCNICA PERDIDA
  // Símbolos conectados: "chama-interior"
  // Artífices → Porto → Jardins
  // ============================================
  {
    id: 'chain-tecnica-perdida',
    name: 'O Fogo Interior',
    secrets: [
      'secret-tecnica-dragao',      // Artífices: técnica de forja perdida
      'secret-ancora-enterrada',    // Porto: âncora de navio inexistente
      'secret-raiz-guardada',       // Jardins: raiz protegida por algo antigo
    ],
    reward: {
      type: 'lore',
      content: 'O fogo interior não é metal. É vida. A mesma força que protege a raiz e que afundou o navio "Esperança Perdida".',
    },
  },
]

// ============================================
// UTILIDADES
// ============================================

export const chainsById: Record<string, DiscoveryChain> = Object.fromEntries(
  discoveryChains.map(c => [c.id, c])
)

export function getChainById(id: string): DiscoveryChain | undefined {
  return chainsById[id]
}

export function getChainsForSecret(secretId: string): DiscoveryChain[] {
  return discoveryChains.filter(c => c.secrets.includes(secretId))
}
