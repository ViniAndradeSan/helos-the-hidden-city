import type { District } from '@/lib/types'

// ============================================
// DISTRITOS DE HELOS
// 6 distritos únicos, cada um com atmosfera própria
// ============================================

export const districts: District[] = [
  {
    id: 'porto-das-mares',
    slug: 'porto-das-mares',
    name: 'Porto das Marés',
    description: 'O coração comercial de Helos. Aqui atracam navios de terras distantes, trazendo especiarias, tecidos e histórias. O cheiro de sal e peixe se mistura com o aroma de rum das tavernas.',
    atmosphere: 'Sal, cordas, gaivotas, marinheiros tatuados, caixotes empilhados',
    color: '#3B82F6',
    shops: ['ancora-corda', 'peixe-dourado', 'arsenal-cais', 'bau-navegante', 'velas-rasgadas'],
    locations: ['pier-norte', 'pier-sul', 'farol-antigo'],
    secrets: ['secret-contrabandista', 'secret-navio-fantasma', 'secret-lanterna-apagada', 'secret-ancora-enterrada'],
  },
  {
    id: 'mercado-central',
    slug: 'mercado-central',
    name: 'Mercado Central',
    description: 'Cores, vozes e aromas competem pela atenção. Mercadores gritam ofertas, crianças correm entre barracas, e todo tipo de mercadoria pode ser encontrada — se você souber procurar.',
    atmosphere: 'Cores vibrantes, vozes, especiarias, tecidos, multidão',
    color: '#F59E0B',
    shops: ['especiarias-oriente', 'ferreiro-real', 'tecidos-finos', 'reliquias-saffron', 'ervas-meia-noite'],
    locations: ['fonte-central', 'praca-mercadores'],
    secrets: ['secret-mercador-ambulante', 'secret-tecido-vermelho', 'secret-fonte-central', 'secret-placa-loja'],
  },
  {
    id: 'cidadela-alta',
    slug: 'cidadela-alta',
    name: 'Cidadela Alta',
    description: 'Torres de pedra branca se erguem sobre a cidade. Aqui residem nobres, sacerdotes e a Guarda de Helos. O silêncio é quebrado apenas pelo badalar dos sinos do Templo.',
    atmosphere: 'Silêncio, pedra branca, guardas, sinos distantes, ordem',
    color: '#E5E7EB',
    shops: ['templo-aurora', 'armaria-guarda', 'escriba-real', 'joias-altavara', 'arquivo-conselho'],
    locations: ['praca-cidadela', 'torre-conselho'],
    secrets: ['secret-cripta-esquecida', 'secret-decreto-antigo', 'secret-estatua-olhos', 'secret-jardim-torre'],
  },
  {
    id: 'bairro-artifices',
    slug: 'bairro-artifices',
    name: 'Bairro dos Artífices',
    description: 'Forjas crepitam dia e noite. O ar é denso com fumaça e o som de martelos. Aqui nascem as melhores armas, armaduras e engenhocas de Helos.',
    atmosphere: 'Fumaça, calor, martelos, faíscas, cheiro de metal',
    color: '#EF4444',
    shops: ['forja-dragao', 'caldeirao-sabio', 'engenhocas-cia', 'engrenagens-bronze', 'vidros-fogo'],
    locations: ['forjas', 'oficinas'],
    secrets: ['secret-tecnica-dragao', 'secret-pocao-misteriosa', 'secret-automato-antigo', 'secret-chaminé-mensagens'],
  },
  {
    id: 'viela-sombras',
    slug: 'viela-sombras',
    name: 'Viela das Sombras',
    description: 'Poucos se aventuram aqui após o pôr do sol. Lanternas fracas iluminam becos estreitos onde se negociam segredos, venenos e favores. A Guarda raramente patrulha estas ruas.',
    atmosphere: 'Escuridão, sussurros, lanternas fracas, vultos, perigo',
    color: '#6B21A8',
    shops: ['lua-negra', 'lamina-oculta', 'casa-jogos', 'dentes-prata', 'ultima-porta'],
    locations: ['beco-ratos', 'taverna-oculta'],
    secrets: ['secret-guilda-sombras', 'secret-conde-varis', 'secret-barril-moedas', 'secret-simbolo-porta'],
  },
  {
    id: 'jardins-antigos',
    slug: 'jardins-antigos',
    name: 'Jardins Antigos',
    description: 'Ruínas cobertas de hera cercam jardins que já foram grandiosos. Estudiosos e boticários buscam ervas raras entre as pedras. Dizem que magia antiga ainda pulsa sob o solo.',
    atmosphere: 'Ruínas, hera, silêncio, neblina, melancolia, magia antiga',
    color: '#10B981',
    shops: ['ervas-floresta', 'biblioteca-esquecida', 'reliquias-passado', 'raizes-antigas', 'fragmentos-tempo'],
    locations: ['ruinas-antigas', 'estatua-fundador'],
    secrets: ['secret-inscricao-antiga', 'secret-raiz-guardada', 'secret-tomo-proibido', 'secret-anel-elfico'],
  },
]

// ============================================
// EXPORTAÇÃO E UTILIDADES
// ============================================

export const districtsById: Record<string, District> = Object.fromEntries(
  districts.map(d => [d.id, d])
)

export const districtsBySlug: Record<string, District> = Object.fromEntries(
  districts.map(d => [d.slug, d])
)

export function getDistrictById(id: string): District | undefined {
  return districtsById[id]
}

export function getDistrictBySlug(slug: string): District | undefined {
  return districtsBySlug[slug]
}
