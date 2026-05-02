import type { Shop } from '@/lib/types'

// ============================================
// LOJAS DE HELOS
// 30 lojas (5 por distrito)
// ============================================

export const shops: Shop[] = [
  // ============================================
  // PORTO DAS MARÉS (5 lojas)
  // ============================================
  {
    id: 'ancora-corda',
    slug: 'ancora-corda',
    name: 'Âncora & Corda',
    type: 'mercador',
    description: 'Suprimentos para navegação e aventura. Tobias conhece cada nó de marinheiro.',
    ambiance: 'Cheiro de cânhamo e alcatrão. Cordas penduradas em todos os cantos.',
    highlight: 'Corda de seda élfica — leve como pena, forte como aço.',
    districtId: 'porto-das-mares',
    npcId: 'tobias-velho',
    items: [
      'corda-15m', 'corda-30m', 'corda-seda', 'gancho', 'lanterna', 'cantil',
      'mapa-regiao', 'oleo-lanterna', 'rede-caca', 'odre-agua', 'luneta-marinheiro'
    ],
  },
  {
    id: 'peixe-dourado',
    slug: 'peixe-dourado',
    name: 'Taverna Peixe Dourado',
    type: 'taverna',
    description: 'A melhor taverna do porto. Rum forte e histórias mais fortes ainda.',
    ambiance: 'Madeira velha, canções de marinheiros, cheiro de peixe frito.',
    highlight: 'Rum do Capitão — dizem que dá coragem até pra enfrentar krakens.',
    districtId: 'porto-das-mares',
    npcId: 'mira-ondas',
    items: [
      'vinho-comum', 'cerveja-barril', 'hidromel', 'rum-capitao', 'pao-fresco',
      'queijo-curado', 'carne-seca', 'racoes-semana', 'ensopado-peixe'
    ],
  },
  {
    id: 'arsenal-cais',
    slug: 'arsenal-cais',
    name: 'Arsenal do Cais',
    type: 'armeiro',
    description: 'Armas práticas para quem vive no mar. Nada de enfeites.',
    ambiance: 'Metal frio, lâminas expostas, atmosfera tensa.',
    highlight: 'Sabre de Abordagem — feito para cortar cordas e inimigos.',
    districtId: 'porto-das-mares',
    npcId: 'korth-armeiro',
    items: [
      'sabre', 'sabre-abordagem', 'adaga', 'adaga-arremesso', 'besta-leve', 'virotes',
      'machado-mao', 'couro', 'broquel', 'oleo-lamina', 'arpao'
    ],
  },
  {
    id: 'bau-navegante',
    slug: 'bau-navegante',
    name: 'Baú do Navegante',
    type: 'mercador',
    description: 'Tesouros trazidos de além-mar. Cada item conta uma viagem.',
    ambiance: 'Cheiro de sal e madeira molhada. Mapas antigos nas paredes.',
    highlight: 'Bússola das Correntes — aponta para onde o vento vai levar.',
    districtId: 'porto-das-mares',
    npcId: 'rulf-desconfiado',
    items: [
      'bussola', 'bussola-correntes', 'mapa-regiao', 'estojo-mapas', 'luneta',
      'amuleto-navegante', 'sino-pequeno', 'ampulheta', 'pergaminho'
    ],
  },
  {
    id: 'velas-rasgadas',
    slug: 'velas-rasgadas',
    name: 'Velas Rasgadas',
    type: 'taverna',
    description: 'Um lugar para quem quer beber sem ser visto. Sem perguntas.',
    ambiance: 'Escuridão, sussurros, cheiro de rum barato e segredos.',
    highlight: 'Grog do Esquecimento — você não vai lembrar de nada amanhã.',
    districtId: 'porto-das-mares',
    npcId: 'cego-farol',
    items: [
      'vinho-comum', 'rum-capitao', 'grog', 'racoes-semana', 'tocha', 'vela'
    ],
  },

  // ============================================
  // MERCADO CENTRAL (5 lojas)
  // ============================================
  {
    id: 'especiarias-oriente',
    slug: 'especiarias-oriente',
    name: 'Especiarias do Oriente',
    type: 'mercador',
    description: 'Aromas de terras distantes. Zahira conhece cada tempero pelo nome.',
    ambiance: 'Incenso no ar, cores vibrantes, tecidos exóticos nas paredes.',
    highlight: 'Pimenta das Dunas — ardente como o sol do deserto.',
    districtId: 'mercado-central',
    npcId: 'zahira',
    items: [
      'incenso', 'incenso-meditacao', 'vela', 'antidoto', 'pocao-energia',
      'racoes-semana', 'hidromel', 'tinta-pena', 'pergaminho', 'pimenta-dunas'
    ],
  },
  {
    id: 'ferreiro-real',
    slug: 'ferreiro-real',
    name: 'Ferreiro Real',
    type: 'ferreiro',
    description: 'Armas e ferramentas de qualidade. Bram não aceita trabalho mal feito.',
    ambiance: 'Calor constante, som de martelo, faíscas ocasionais.',
    highlight: 'Lâmina Gêmea — duas espadas que parecem uma só.',
    districtId: 'mercado-central',
    npcId: 'bram-forjafogo',
    items: [
      'espada-curta', 'espada-longa', 'espada-gemea', 'machado-mao', 'machado-batalha',
      'maca', 'ferramentas-ferreiro', 'ferramentas-carpintaria',
      'picareta', 'pe-cabra', 'oleo-lamina'
    ],
  },
  {
    id: 'tecidos-finos',
    slug: 'tecidos-finos',
    name: 'Tecidos Finos',
    type: 'mercador',
    description: 'Roupas, capas e tecidos para todos os gostos e bolsos.',
    ambiance: 'Sedas coloridas, espelhos, luz suave.',
    highlight: 'Capa do Viajante — repele água e não pega fogo facilmente.',
    districtId: 'mercado-central',
    npcId: 'elara-tecidos',
    items: [
      'mochila', 'mochila-grande', 'bolsa-cintura', 'cobertor', 'capa-viajante',
      'saco-dormir', 'barraca-1', 'barraca-4', 'corda-seda'
    ],
  },
  {
    id: 'reliquias-saffron',
    slug: 'reliquias-saffron',
    name: 'Relíquias de Saffron',
    type: 'antiquário',
    description: 'Objetos de outras eras. Saffron jura que tudo aqui tem história.',
    ambiance: 'Poeira dourada, objetos estranhos, luz de velas.',
    highlight: 'Moeda do Primeiro Rei — traz sorte, dizem os supersticiosos.',
    districtId: 'mercado-central',
    npcId: 'saffron-antiquario',
    items: [
      'amuleto-protecao', 'amuleto-sorte', 'espelho-aco', 'luneta', 'bussola',
      'moeda-primeiro-rei', 'estatueta-antiga', 'pergaminho-antigo'
    ],
  },
  {
    id: 'ervas-meia-noite',
    slug: 'ervas-meia-noite',
    name: 'Ervas da Meia-Noite',
    type: 'boticário',
    description: 'Remédios e venenos. A linha entre os dois é fina, diz Nyra.',
    ambiance: 'Cheiro forte de ervas, frascos escuros, silêncio tenso.',
    highlight: 'Essência de Sombraluna — para dormir sem sonhar.',
    districtId: 'mercado-central',
    npcId: 'velha-nyra',
    items: [
      'pocao-cura-menor', 'pocao-cura', 'antidoto', 'essencia-sombraluna',
      'ferramentas-cura', 'incenso', 'oleo-lamina', 'unguento-feridas'
    ],
  },

  // ============================================
  // CIDADELA ALTA (5 lojas)
  // ============================================
  {
    id: 'templo-aurora',
    slug: 'templo-aurora',
    name: 'Templo da Aurora',
    type: 'templo',
    description: 'Bênçãos, cura e conforto espiritual. A luz sempre brilha aqui.',
    ambiance: 'Incenso sagrado, vitrais coloridos, cânticos distantes.',
    highlight: 'Água Benta da Fonte Sagrada — nunca seca, nunca envelhece.',
    districtId: 'cidadela-alta',
    npcId: 'sacerdotisa-lyra',
    items: [
      'agua-benta', 'agua-benta-maior', 'pocao-cura-menor', 'pocao-cura', 'pocao-cura-maior',
      'antidoto', 'ferramentas-cura', 'vela', 'incenso', 'simbolo-aurora'
    ],
  },
  {
    id: 'armaria-guarda',
    slug: 'armaria-guarda',
    name: 'Armaria da Guarda',
    type: 'armeiro',
    description: 'Equipamento militar de Helos. Apenas para cidadãos de boa reputação.',
    ambiance: 'Ordem perfeita, armaduras polidas, silêncio respeitoso.',
    highlight: 'Escudo com o Brasão de Helos — proteção e honra.',
    districtId: 'cidadela-alta',
    npcId: 'capitao-aldric',
    items: [
      'espada-longa', 'espada-bastarda', 'lanca', 'alabarda', 'escudo-helos',
      'cota-malha', 'brigandina', 'meia-armadura', 'armadura-guarda',
      'escudo-medio', 'escudo-torre', 'elmo-aberto', 'elmo-fechado'
    ],
  },
  {
    id: 'escriba-real',
    slug: 'escriba-real',
    name: 'Escriba Real',
    type: 'serviço',
    description: 'Documentos, selos e cartas oficiais. Tudo em perfeita ordem.',
    ambiance: 'Papel e tinta, silêncio, estantes organizadas.',
    highlight: 'Pergaminho Selado — reconhecido em todas as cidades do reino.',
    districtId: 'cidadela-alta',
    npcId: 'cedric-escriba',
    items: [
      'pergaminho', 'pergaminho-selado', 'tinta-pena', 'mapa-regiao', 'estojo-mapas',
      'giz', 'vela', 'ampulheta', 'lacre-oficial'
    ],
  },
  {
    id: 'joias-altavara',
    slug: 'joias-altavara',
    name: 'Joias de Altavara',
    type: 'joalheiro',
    description: 'Peças para nobreza e aventureiros ricos. Cada joia é única.',
    ambiance: 'Brilho de ouro e prata, vitrines de veludo, segurança pesada.',
    highlight: 'Anel do Diplomata — dizem que torna as palavras mais doces.',
    districtId: 'cidadela-alta',
    npcId: 'lady-altavara',
    items: [
      'anel-diplomata', 'anel-sinete', 'colar-prata', 'bracelete-ouro',
      'amuleto-protecao', 'broche-nobreza', 'tiara-menor'
    ],
  },
  {
    id: 'arquivo-conselho',
    slug: 'arquivo-conselho',
    name: 'Arquivo do Conselho',
    type: 'biblioteca',
    description: 'Registros oficiais e mapas da cidade. Acesso restrito.',
    ambiance: 'Silêncio absoluto, prateleiras infinitas, cheiro de pergaminho.',
    highlight: 'Mapa Completo de Helos — cada rua, cada beco.',
    districtId: 'cidadela-alta',
    npcId: 'arquivista-morn',
    items: [
      'mapa-helos-completo', 'pergaminho', 'tinta-pena', 'estojo-mapas',
      'vela', 'ampulheta', 'lupa'
    ],
  },

  // ============================================
  // BAIRRO DOS ARTÍFICES (5 lojas)
  // ============================================
  {
    id: 'forja-dragao',
    slug: 'forja-dragao',
    name: 'Forja do Dragão',
    type: 'ferreiro',
    description: 'As melhores armas de Helos. Ignis é um perfeccionista.',
    ambiance: 'Calor intenso, fogo rugindo, cheiro de metal quente.',
    highlight: 'Espada Fogo Interno — a lâmina parece pulsar com vida.',
    districtId: 'bairro-artifices',
    npcId: 'ignis-forjador',
    items: [
      'espada-bastarda', 'espada-fogo-interno', 'montante', 'machado-batalha', 'machado-duplo',
      'martelo-guerra', 'main-gauche', 'punhal-envenenado',
      'brigandina', 'meia-armadura', 'armadura-completa'
    ],
  },
  {
    id: 'caldeirao-sabio',
    slug: 'caldeirao-sabio',
    name: 'Caldeirão Sábio',
    type: 'alquimista',
    description: 'Poções, reagentes e experimentos. Resultados não garantidos.',
    ambiance: 'Vapores coloridos, borbulhar constante, frascos por toda parte.',
    highlight: 'Elixir da Clareza — clareia a mente, mas causa dor de cabeça.',
    districtId: 'bairro-artifices',
    npcId: 'mestre-orin',
    items: [
      'pocao-cura-menor', 'pocao-cura', 'pocao-cura-maior', 'elixir-clareza',
      'pocao-energia', 'antidoto', 'antidoto-forte',
      'ferramentas-alquimia', 'bomba-fumaca', 'oleo-lamina', 'acido-frasco'
    ],
  },
  {
    id: 'engenhocas-cia',
    slug: 'engenhocas-cia',
    name: 'Engenhocas & Cia',
    type: 'mercador',
    description: 'Invenções, ferramentas e coisas que provavelmente funcionam.',
    ambiance: 'Engrenagens girando, coisas apitando, caos organizado.',
    highlight: 'Gancho Retratil — sobe sozinho quando você puxa a corda.',
    districtId: 'bairro-artifices',
    npcId: 'pip-denteserra',
    items: [
      'gancho', 'gancho-retratil', 'corda-15m', 'corda-30m', 'corda-seda',
      'lanterna', 'lanterna-focada', 'luneta', 'bussola', 'ampulheta',
      'ferramentas-carpintaria', 'pe-cabra', 'corrente', 'sino-pequeno', 'relogio-bolso'
    ],
  },
  {
    id: 'engrenagens-bronze',
    slug: 'engrenagens-bronze',
    name: 'Engrenagens de Bronze',
    type: 'inventor',
    description: 'Autômatos, mecanismos e maravilhas. Gears não faz nada simples.',
    ambiance: 'Tique-taque constante, vapor, brilho de bronze.',
    highlight: 'Pássaro Mecânico — canta ao amanhecer, nunca erra.',
    districtId: 'bairro-artifices',
    npcId: 'gears-inventor',
    items: [
      'passaro-mecanico', 'relogio-bolso', 'caixa-musica', 'bussola',
      'lanterna-focada', 'ampulheta', 'lupa', 'ferramentas-mecanico'
    ],
  },
  {
    id: 'vidros-fogo',
    slug: 'vidros-fogo',
    name: 'Vidros de Fogo',
    type: 'alquimista',
    description: 'Alquimia avançada. Explosões são apenas efeitos colaterais.',
    ambiance: 'Cheiro de enxofre, frascos selados, marcas de queimadura.',
    highlight: 'Fogo Líquido — não se apaga com água.',
    districtId: 'bairro-artifices',
    npcId: 'vara-flamejante',
    items: [
      'fogo-liquido', 'bomba-fumaca', 'bomba-flash', 'acido-frasco',
      'oleo-lamina', 'pocao-energia', 'antidoto-forte', 'ferramentas-alquimia'
    ],
  },

  // ============================================
  // VIELA DAS SOMBRAS (5 lojas)
  // ============================================
  {
    id: 'lua-negra',
    slug: 'lua-negra',
    name: 'Taverna Lua Negra',
    type: 'taverna',
    description: 'Bebidas, informações e silêncio. Aqui ninguém faz perguntas.',
    ambiance: 'Escuridão, sussurros, cheiro de fumaça e segredos.',
    highlight: 'Vinho Negro — o sabor muda de acordo com seus segredos.',
    districtId: 'viela-sombras',
    npcId: 'sombra',
    items: [
      'vinho-comum', 'vinho-negro', 'hidromel', 'racoes-semana', 'vela', 'tocha'
    ],
  },
  {
    id: 'lamina-oculta',
    slug: 'lamina-oculta',
    name: 'Lâmina Oculta',
    type: 'mercado-negro',
    description: 'Coisas que você não encontra em lugar nenhum. Por um preço.',
    ambiance: 'Cortinas pesadas, luz de vela, olhares desconfiados.',
    highlight: 'Veneno do Sono Eterno — uma gota, e os sonhos não acabam.',
    districtId: 'viela-sombras',
    npcId: 'velha-nyx',
    items: [
      'adaga', 'adaga-sombria', 'adaga-arremesso', 'punhal-envenenado',
      'veneno-basico', 'veneno-sono', 'veneno-sono-eterno', 'ferramentas-ladrao',
      'bomba-fumaca', 'corda-seda', 'algemas', 'mascara-noite'
    ],
  },
  {
    id: 'casa-jogos',
    slug: 'casa-jogos',
    name: 'Casa de Jogos',
    type: 'entretenimento',
    description: 'Dados, cartas e apostas. A sorte favorece os audazes.',
    ambiance: 'Fumaça, risos, tensão, moedas tilintando.',
    highlight: 'Dados de Osso de Dragão — dizem que nunca mentem.',
    districtId: 'viela-sombras',
    npcId: 'dado-rapido',
    items: [
      'vinho-comum', 'hidromel', 'dados-osso', 'baralho-marcado', 'tocha'
    ],
  },
  {
    id: 'dentes-prata',
    slug: 'dentes-prata',
    name: 'Dentes de Prata',
    type: 'mercado-negro',
    description: 'Compra e vende o que outros não tocam. Sem julgamentos.',
    ambiance: 'Escuridão, prateleiras ocultas, silêncio de cumplicidade.',
    highlight: 'Chave Mestra — abre portas que não querem ser abertas.',
    districtId: 'viela-sombras',
    npcId: 'dentes-prata',
    items: [
      'chave-mestra', 'ferramentas-ladrao', 'corda-seda', 'mascara-noite',
      'adaga', 'veneno-basico', 'bomba-fumaca', 'ganchos-escalada'
    ],
  },
  {
    id: 'ultima-porta',
    slug: 'ultima-porta',
    name: 'A Última Porta',
    type: 'taverna',
    description: 'Para quem não tem mais pra onde ir. Ou pra quem quer desaparecer.',
    ambiance: 'Silêncio pesado, rostos cobertos, nenhum nome é dito.',
    highlight: 'Bebida sem nome — você esquece por que veio.',
    districtId: 'viela-sombras',
    npcId: 'porta-velha',
    items: [
      'vinho-comum', 'grog', 'racoes-semana', 'tocha', 'vela'
    ],
  },

  // ============================================
  // JARDINS ANTIGOS (5 lojas)
  // ============================================
  {
    id: 'ervas-floresta',
    slug: 'ervas-floresta',
    name: 'Ervas da Floresta',
    type: 'boticário',
    description: 'Ervas raras e unguentos. Thorn conhece cada planta.',
    ambiance: 'Cheiro de terra e ervas, plantas secas penduradas.',
    highlight: 'Raiz da Vida — dizem que cura qualquer coisa. Quase.',
    districtId: 'jardins-antigos',
    npcId: 'velha-thorn',
    items: [
      'pocao-cura-menor', 'pocao-cura', 'raiz-vida', 'antidoto',
      'ferramentas-cura', 'incenso', 'vela', 'unguento-feridas'
    ],
  },
  {
    id: 'biblioteca-esquecida',
    slug: 'biblioteca-esquecida',
    name: 'Biblioteca Esquecida',
    type: 'biblioteca',
    description: 'Tomos antigos e conhecimento perdido. Silêncio obrigatório.',
    ambiance: 'Poeira, papel velho, luz fraca, silêncio absoluto.',
    highlight: 'Códice das Eras — ninguém conseguiu ler tudo.',
    districtId: 'jardins-antigos',
    npcId: 'guardiao-biblioteca',
    items: [
      'pergaminho', 'pergaminho-antigo', 'tinta-pena', 'mapa-regiao', 'estojo-mapas',
      'vela', 'ampulheta', 'lupa', 'codice-eras'
    ],
  },
  {
    id: 'reliquias-passado',
    slug: 'reliquias-passado',
    name: 'Relíquias do Passado',
    type: 'antiquário',
    description: 'Artefatos de eras esquecidas. Cada um conta uma história.',
    ambiance: 'Objetos estranhos, luz de vela, sensação de mistério.',
    highlight: 'Anel da Rainha Élfica — ainda brilha como se tivesse dono.',
    districtId: 'jardins-antigos',
    npcId: 'colecionador-vero',
    items: [
      'amuleto-protecao', 'anel-elfico', 'espelho-aco', 'luneta', 'bussola',
      'agua-benta', 'incenso', 'estatueta-antiga'
    ],
  },
  {
    id: 'raizes-antigas',
    slug: 'raizes-antigas',
    name: 'Raízes Antigas',
    type: 'boticário',
    description: 'Remédios druídicos. A natureza cura quem a respeita.',
    ambiance: 'Musgo, umidade, plantas vivas por toda parte.',
    highlight: 'Seiva da Árvore-Mãe — dizem que é lágrima de floresta.',
    districtId: 'jardins-antigos',
    npcId: 'druida-musgo',
    items: [
      'pocao-cura', 'seiva-arvore-mae', 'antidoto', 'unguento-feridas',
      'incenso-meditacao', 'vela', 'ferramentas-cura', 'raiz-vida'
    ],
  },
  {
    id: 'fragmentos-tempo',
    slug: 'fragmentos-tempo',
    name: 'Fragmentos do Tempo',
    type: 'antiquário',
    description: 'Objetos que não deveriam existir mais. Tempo não os esqueceu.',
    ambiance: 'Ar parado, luz que não vem de lugar nenhum, silêncio denso.',
    highlight: 'Ampulheta Quebrada — a areia ainda cai, mesmo partida.',
    districtId: 'jardins-antigos',
    npcId: 'guardiao-tempo',
    items: [
      'ampulheta-quebrada', 'espelho-aco', 'amuleto-protecao', 'bussola',
      'pergaminho-antigo', 'estatueta-antiga', 'vela'
    ],
  },
]

// ============================================
// EXPORTAÇÃO E UTILIDADES
// ============================================

export const shopsById: Record<string, Shop> = Object.fromEntries(
  shops.map(shop => [shop.id, shop])
)

export const shopsBySlug: Record<string, Shop> = Object.fromEntries(
  shops.map(shop => [shop.slug, shop])
)

export function getShopById(id: string): Shop | undefined {
  return shopsById[id]
}

export function getShopBySlug(slug: string): Shop | undefined {
  return shopsBySlug[slug]
}

export function getShopsByDistrictId(districtId: string): Shop[] {
  return shops.filter(shop => shop.districtId === districtId)
}
