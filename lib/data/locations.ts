import type { Location } from '@/lib/types'

// ============================================
// LOCAIS NÃO-COMERCIAIS DE HELOS
// Pontos de interesse, praças, ruínas, etc.
// ============================================

export const locations: Location[] = [
  // ============================================
  // PORTO DAS MARÉS
  // ============================================
  {
    id: 'pier-norte',
    slug: 'pier-norte',
    name: 'Píer Norte',
    type: 'landmark',
    description: 'O maior píer de Helos. Navios de todas as terras atracam aqui, trazendo mercadorias e viajantes. À noite, apenas sombras e o som das ondas.',
    districtId: 'porto-das-mares',
  },
  {
    id: 'pier-sul',
    slug: 'pier-sul',
    name: 'Píer Sul',
    type: 'landmark',
    description: 'Mais movimentado durante o dia, com pescadores vendendo suas capturas. Barcos menores atracam aqui.',
    districtId: 'porto-das-mares',
  },
  {
    id: 'farol-antigo',
    slug: 'farol-antigo',
    name: 'Farol Antigo',
    type: 'landmark',
    description: 'Abandonado há décadas, o farol ainda se ergue sobre o porto. Dizem que sua luz se acende sozinha em noites de tempestade.',
    districtId: 'porto-das-mares',
  },

  // ============================================
  // MERCADO CENTRAL
  // ============================================
  {
    id: 'fonte-central',
    slug: 'fonte-central',
    name: 'Fonte Central',
    type: 'square',
    description: 'O coração do mercado. Comerciantes descansam aqui, crianças brincam na água, e acordos são fechados à sombra das estátuas.',
    districtId: 'mercado-central',
  },
  {
    id: 'praca-mercadores',
    slug: 'praca-mercadores',
    name: 'Praça dos Mercadores',
    type: 'square',
    description: 'A maior praça de comércio de Helos. Barracas coloridas competem por atenção, e o som de negociações nunca cessa.',
    districtId: 'mercado-central',
  },

  // ============================================
  // CIDADELA ALTA
  // ============================================
  {
    id: 'praca-cidadela',
    slug: 'praca-cidadela',
    name: 'Praça da Cidadela',
    type: 'square',
    description: 'Onde julgamentos públicos acontecem. Uma estátua da Justiça Cega observa tudo com olhos vendados.',
    districtId: 'cidadela-alta',
  },
  {
    id: 'torre-conselho',
    slug: 'torre-conselho',
    name: 'Torre do Conselho',
    type: 'landmark',
    description: 'A torre mais alta da Cidadela, onde o Conselho de Helos se reúne. Poucos são convidados a entrar.',
    districtId: 'cidadela-alta',
  },

  // ============================================
  // BAIRRO DOS ARTÍFICES
  // ============================================
  {
    id: 'forjas',
    slug: 'forjas',
    name: 'As Forjas',
    type: 'landmark',
    description: 'Conjunto de forjas que trabalham dia e noite. O calor é intenso e o som de martelos ecoa por todo o bairro.',
    districtId: 'bairro-artifices',
  },
  {
    id: 'oficinas',
    slug: 'oficinas',
    name: 'Oficinas',
    type: 'landmark',
    description: 'Onde inventores e artesãos trabalham em suas criações. Explosões ocasionais são esperadas.',
    districtId: 'bairro-artifices',
  },

  // ============================================
  // VIELA DAS SOMBRAS
  // ============================================
  {
    id: 'beco-ratos',
    slug: 'beco-ratos',
    name: 'Beco dos Ratos',
    type: 'landmark',
    description: 'O beco mais estreito e escuro da Viela. Poucas pessoas passam por aqui sem motivo.',
    districtId: 'viela-sombras',
  },
  {
    id: 'taverna-oculta',
    slug: 'taverna-oculta',
    name: 'Porta Sem Nome',
    type: 'landmark',
    description: 'Uma porta que não deveria existir, em uma parede que não parece ter construção. Poucos encontram. Menos ainda voltam para contar.',
    districtId: 'viela-sombras',
  },

  // ============================================
  // JARDINS ANTIGOS
  // ============================================
  {
    id: 'ruinas-antigas',
    slug: 'ruinas-antigas',
    name: 'Ruínas Antigas',
    type: 'ruin',
    description: 'Restos de estruturas que existiam antes de Helos. Ninguém sabe quem as construiu ou por quê. A hera cobre quase tudo.',
    districtId: 'jardins-antigos',
  },
  {
    id: 'estatua-fundador',
    slug: 'estatua-fundador',
    name: 'Estátua do Fundador',
    type: 'statue',
    description: 'Uma estátua quebrada de alguém cujo nome foi esquecido. Era o fundador de Helos? Ou de algo mais antigo?',
    districtId: 'jardins-antigos',
  },
]

// ============================================
// EXPORTAÇÃO E UTILIDADES
// ============================================

export const locationsById: Record<string, Location> = Object.fromEntries(
  locations.map(loc => [loc.id, loc])
)

export const locationsBySlug: Record<string, Location> = Object.fromEntries(
  locations.map(loc => [loc.slug, loc])
)

export function getLocationById(id: string): Location | undefined {
  return locationsById[id]
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locationsBySlug[slug]
}

export function getLocationsByDistrictId(districtId: string): Location[] {
  return locations.filter(loc => loc.districtId === districtId)
}
