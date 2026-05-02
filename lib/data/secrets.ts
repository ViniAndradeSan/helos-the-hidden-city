import type { Secret } from '@/lib/types'

// ============================================
// SEGREDOS DE HELOS (~24 segredos)
// Agora com conexões, símbolos e requisitos
// ============================================

export const secrets: Secret[] = [
  // ============================================
  // PORTO DAS MARÉS (4 segredos)
  // ============================================
  {
    id: 'secret-contrabandista',
    type: 'hidden-npc',
    districtId: 'porto-das-mares',
    locationId: 'pier-norte',
    title: 'O Contrabandista',
    hint: 'Uma sombra se move entre os caixotes à noite.',
    content: 'Você nota uma figura encapuzada atrás dos caixotes. Ele se apresenta como "Maré Baixa" e oferece passagem para lugares que os mapas não mostram.',
    symbol: 'serpente-marinha',
    connections: [
      {
        targetId: 'secret-simbolo-porta',
        type: 'hints',
        description: 'O símbolo na capa do contrabandista é o mesmo que você viu na porta da Viela.',
      },
    ],
  },
  {
    id: 'secret-navio-fantasma',
    type: 'whisper',
    districtId: 'porto-das-mares',
    npcId: 'tobias-velho',
    title: 'O Navio Silencioso',
    content: 'Tobias fala sobre um navio que atracou à noite sem fazer nenhum som. Ninguém desembarcou, mas ele jura ter ouvido vozes. No dia seguinte, o navio havia sumido.',
    symbol: 'folha-prata',
    connections: [
      {
        targetId: 'secret-anel-elfico',
        type: 'reveals',
        description: 'O navio silencioso... e o anel da rainha que voltou sozinho. Ela não morreu. Ela partiu.',
      },
    ],
  },
  {
    id: 'secret-lanterna-apagada',
    type: 'hidden-location',
    districtId: 'porto-das-mares',
    title: 'A Lanterna do Farol',
    hint: 'Uma lanterna apagada no píer, diferente das outras.',
    content: 'Ao examinar a lanterna, você percebe um símbolo gravado na base. É a marca da Guilda dos Navegantes — uma organização que não existe mais. Ou não deveria.',
    symbol: 'serpente-marinha',
    chainId: 'chain-navegantes',
    chainOrder: 1,
    connections: [
      {
        targetId: 'secret-simbolo-porta',
        type: 'reveals',
        description: 'O mesmo símbolo da serpente marinha. A Guilda não acabou — apenas se escondeu.',
      },
      {
        targetId: 'secret-decreto-antigo',
        type: 'hints',
        description: 'Se a Guilda ainda existe... talvez os documentos antigos expliquem por quê.',
      },
    ],
  },
  {
    id: 'secret-ancora-enterrada',
    type: 'hidden-location',
    districtId: 'porto-das-mares',
    title: 'A Âncora Enterrada',
    hint: 'Uma corrente velha some na areia.',
    content: 'Seguindo a corrente, você encontra uma âncora antiga com o nome "Esperança Perdida". Os registros dizem que esse navio nunca existiu.',
    symbol: 'chama-interior',
    chainId: 'chain-tecnica-perdida',
    chainOrder: 2,
    connections: [
      {
        targetId: 'secret-tecnica-dragao',
        type: 'hints',
        description: 'A âncora tem marcas de derretimento, mas não por fogo comum. Algo a aqueceu por dentro.',
      },
    ],
  },

  // ============================================
  // MERCADO CENTRAL (4 segredos)
  // ============================================
  {
    id: 'secret-mercador-ambulante',
    type: 'whisper',
    districtId: 'mercado-central',
    npcId: 'zahira',
    title: 'O Vendedor das Ilhas',
    content: 'Zahira menciona um mercador que aparece apenas em noites de lua cheia, vendendo especiarias das Ilhas Proibidas. Ele monta sua tenda perto da fonte, mas some antes do amanhecer.',
    connections: [
      {
        targetId: 'secret-fonte-central',
        type: 'hints',
        description: 'Perto da fonte... onde você encontrou a moeda antiga. Talvez ele também a tenha visto.',
      },
    ],
  },
  {
    id: 'secret-tecido-vermelho',
    type: 'whisper',
    districtId: 'mercado-central',
    npcId: 'elara-tecidos',
    title: 'O Tecido Maldito',
    content: 'Elara mostra um tecido vermelho escondido. Veio de uma caravana que desapareceu nas montanhas. O tecido foi encontrado sem nenhum sinal dos mercadores.',
    symbol: 'folha-prata',
    chainId: 'chain-rainha-elfica',
    chainOrder: 2,
    connections: [
      {
        targetId: 'secret-anel-elfico',
        type: 'reveals',
        description: 'A caravana perdida... e a rainha que nunca chegou ao destino. O tecido tem bordados élficos.',
      },
      {
        targetId: 'secret-navio-fantasma',
        type: 'hints',
        description: 'Se a caravana desapareceu por terra... como o navio está conectado?',
      },
    ],
  },
  {
    id: 'secret-fonte-central',
    type: 'hidden-location',
    districtId: 'mercado-central',
    title: 'A Moeda na Fonte',
    hint: 'Algo brilha no fundo da fonte central.',
    content: 'Entre as moedas comuns, há uma diferente — antiga, com um símbolo que ninguém mais usa. A efígie mostra um rei com três luas ao redor da cabeça.',
    symbol: 'tres-luas',
    chainId: 'chain-eldoria',
    chainOrder: 3,
    connections: [
      {
        targetId: 'secret-inscricao-antiga',
        type: 'reveals',
        description: 'Três luas. "Quando as três luas se alinharem..." O mesmo símbolo, em lugares diferentes.',
      },
      {
        targetId: 'secret-estatua-olhos',
        type: 'hints',
        description: 'O mapa na parede mostrava uma área que não existe. A moeda mostra um rei que não está nos livros.',
      },
    ],
  },
  {
    id: 'secret-placa-loja',
    type: 'hidden-location',
    districtId: 'mercado-central',
    title: 'A Placa Secreta',
    hint: 'Uma placa de loja com letras meio apagadas.',
    content: 'As letras apagadas formam outra mensagem: "Pergunte sobre o tempero das ilhas". É um código antigo de contrabandistas.',
    connections: [
      {
        targetId: 'secret-mercador-ambulante',
        type: 'hints',
        description: 'O vendedor das ilhas... e o código na placa. Ele não vende apenas especiarias.',
      },
    ],
  },

  // ============================================
  // CIDADELA ALTA (4 segredos)
  // ============================================
  {
    id: 'secret-cripta-esquecida',
    type: 'lore',
    districtId: 'cidadela-alta',
    npcId: 'sacerdotisa-lyra',
    shopId: 'templo-aurora',
    title: 'A Cripta dos Guardiões',
    content: 'Há uma cripta sob o Templo da Aurora onde descansam os primeiros guardiões de Helos. Dizem que seus espíritos ainda vagam, protegendo a cidade de ameaças invisíveis.',
    symbol: 'olho-fechado',
    chainId: 'chain-guardioes',
    chainOrder: 1,
    connections: [
      {
        targetId: 'secret-tomo-proibido',
        type: 'reveals',
        description: 'A cripta dos guardiões... e o livro que não se abre à noite. Os guardiões não eram humanos.',
      },
      {
        targetId: 'secret-automato-antigo',
        type: 'hints',
        description: 'Se os guardiões ainda vigiam... talvez não em forma de espíritos.',
      },
    ],
  },
  {
    id: 'secret-decreto-antigo',
    type: 'whisper',
    districtId: 'cidadela-alta',
    npcId: 'cedric-escriba',
    title: 'O Decreto Selado',
    content: 'Cedric menciona um documento com um selo que não reconheceu. O decreto parece ordenar a dissolução de algo, mas partes estão em código. Ele guardou uma cópia.',
    symbol: 'serpente-marinha',
    chainId: 'chain-navegantes',
    chainOrder: 3,
    connections: [
      {
        targetId: 'secret-lanterna-apagada',
        type: 'reveals',
        description: 'O decreto ordenava a dissolução da Guilda dos Navegantes. Mas o selo é da própria Guilda.',
      },
      {
        targetId: 'secret-conde-varis',
        type: 'hints',
        description: 'Um decreto falsificado... e um conde envenenado. Alguém no Conselho tem segredos.',
      },
    ],
  },
  {
    id: 'secret-estatua-olhos',
    type: 'hidden-location',
    districtId: 'cidadela-alta',
    title: 'Os Olhos que Veem',
    hint: 'Uma estátua na praça parece olhar para lugar nenhum.',
    content: 'Seguindo o olhar da estátua, você encontra uma marca na parede oposta. É um mapa simplificado de Helos — com uma área marcada que não existe nos mapas oficiais.',
    symbol: 'tres-luas',
    chainId: 'chain-eldoria',
    chainOrder: 2,
    connections: [
      {
        targetId: 'secret-inscricao-antiga',
        type: 'reveals',
        description: 'A área não mapeada... e Eldoria. O caminho existe, mas não está mais visível.',
      },
    ],
  },
  {
    id: 'secret-jardim-torre',
    type: 'hidden-location',
    districtId: 'cidadela-alta',
    title: 'O Jardim Secreto',
    hint: 'Uma porta escondida por hera na torre norte.',
    content: 'Atrás da hera, há uma porta que leva a um pequeno jardim interior. Flores que não crescem em nenhum outro lugar de Helos florescem aqui. Alguém ainda cuida delas.',
  },

  // ============================================
  // BAIRRO DOS ARTÍFICES (4 segredos)
  // ============================================
  {
    id: 'secret-tecnica-dragao',
    type: 'lore',
    districtId: 'bairro-artifices',
    shopId: 'forja-dragao',
    npcId: 'ignis-forjador',
    title: 'O Fogo Interior',
    hint: 'As brasas parecem formar um padrão estranho.',
    content: 'Ignis conta sobre a técnica perdida de seu avô: uma forma de forjar que fazia as lâminas brilharem por dentro, como se tivessem fogo próprio. O segredo morreu com ele.',
    symbol: 'chama-interior',
    chainId: 'chain-tecnica-perdida',
    chainOrder: 1,
    connections: [
      {
        targetId: 'secret-raiz-guardada',
        type: 'reveals',
        description: 'O fogo interior... e a raiz protegida por algo antigo. A mesma energia. A mesma fonte.',
      },
    ],
  },
  {
    id: 'secret-pocao-misteriosa',
    type: 'whisper',
    districtId: 'bairro-artifices',
    npcId: 'mestre-orin',
    title: 'A Fórmula Viva',
    content: 'Mestre Orin mostra um frasco com um líquido que muda de cor sozinho. Ele não sabe o que faz, mas jura que às vezes o líquido se move contra a gravidade.',
    symbol: 'adaga-gota',
    chainId: 'chain-conde-varis',
    chainOrder: 2,
    connections: [
      {
        targetId: 'secret-conde-varis',
        type: 'hints',
        description: 'Uma fórmula que muda de cor... e um veneno que ninguém conseguiu identificar.',
      },
    ],
  },
  {
    id: 'secret-automato-antigo',
    type: 'hidden-location',
    districtId: 'bairro-artifices',
    title: 'O Autômato Esquecido',
    hint: 'Uma pilha de sucata que parece organizada demais.',
    content: 'Entre a sucata, você encontra peças de um autômato antigo — muito mais avançado que qualquer coisa que Gears faz. Os símbolos nas engrenagens não são de Helos.',
    symbol: 'olho-fechado',
    chainId: 'chain-guardioes',
    chainOrder: 3,
    connections: [
      {
        targetId: 'secret-cripta-esquecida',
        type: 'reveals',
        description: 'Os guardiões não eram espíritos. Eram máquinas. E algumas ainda podem funcionar.',
      },
    ],
  },
  {
    id: 'secret-chamine-mensagens',
    type: 'hidden-location',
    districtId: 'bairro-artifices',
    title: 'A Chaminé dos Segredos',
    hint: 'Uma chaminé que solta fumaça em padrões estranhos.',
    content: 'A fumaça forma letras, brevemente. É um código usado pelos artífices para se comunicar. Diz: "Reunião à meia-noite. Tragam os projetos."',
  },

  // ============================================
  // VIELA DAS SOMBRAS (4 segredos)
  // ============================================
  {
    id: 'secret-guilda-sombras',
    type: 'hidden-location',
    districtId: 'viela-sombras',
    locationId: 'beco-ratos',
    title: 'Esconderijo da Guilda',
    hint: 'Uma rachadura na parede parece mais profunda do que deveria.',
    content: 'Atrás da parede rachada, você encontra uma passagem estreita que leva a uma sala subterrânea. Símbolos de uma guilda de ladrões decoram as paredes. Parece abandonado, mas há sinais de uso recente.',
  },
  {
    id: 'secret-conde-varis',
    type: 'whisper',
    districtId: 'viela-sombras',
    npcId: 'velha-nyx',
    title: 'A Morte do Conde',
    content: 'Nyx sabe quem encomendou o veneno que matou o Conde Varis. Foi alguém da própria família. Ela não vende a informação barato, mas garante que vale cada moeda.',
    symbol: 'adaga-gota',
    chainId: 'chain-conde-varis',
    chainOrder: 1,
    connections: [
      {
        targetId: 'secret-decreto-antigo',
        type: 'reveals',
        description: 'O veneno foi encomendado por alguém do Conselho. O mesmo Conselho que assinou o decreto misterioso.',
      },
    ],
  },
  {
    id: 'secret-barril-moedas',
    type: 'hidden-location',
    districtId: 'viela-sombras',
    title: 'O Barril de Moedas',
    hint: 'Um barril que parece mais pesado que os outros.',
    content: 'Dentro do barril, escondidas sob palha podre, há moedas de vários reinos. Alguém está guardando um tesouro aqui. A marca na tampa sugere que o dono voltará em breve.',
  },
  {
    id: 'secret-simbolo-porta',
    type: 'hidden-location',
    districtId: 'viela-sombras',
    title: 'O Símbolo na Porta',
    hint: 'Uma marca quase invisível em uma porta comum.',
    content: 'O símbolo indica uma casa segura para quem precisa desaparecer. É a serpente marinha — a marca da Guilda dos Navegantes. Bata três vezes, espere, bata mais duas.',
    symbol: 'serpente-marinha',
    chainId: 'chain-navegantes',
    chainOrder: 2,
    connections: [
      {
        targetId: 'secret-lanterna-apagada',
        type: 'reveals',
        description: 'A Guilda dos Navegantes. Não são só marinheiros. São uma rede que atravessa toda Helos.',
      },
    ],
  },

  // ============================================
  // JARDINS ANTIGOS (4 segredos)
  // ============================================
  {
    id: 'secret-inscricao-antiga',
    type: 'lore',
    districtId: 'jardins-antigos',
    locationId: 'estatua-fundador',
    title: 'As Palavras Esquecidas',
    hint: 'A base da estátua parece ter letras desgastadas.',
    content: 'Na base da estátua quebrada, você decifra uma inscrição: "Quando as três luas se alinharem, o caminho para Eldoria se abrirá novamente." Ninguém sabe mais o que é Eldoria.',
    symbol: 'tres-luas',
    chainId: 'chain-eldoria',
    chainOrder: 1,
    connections: [
      {
        targetId: 'secret-estatua-olhos',
        type: 'hints',
        description: 'Eldoria. Um lugar que não está nos mapas. Mas a estátua na Cidadela aponta para algo.',
      },
    ],
  },
  {
    id: 'secret-raiz-guardada',
    type: 'whisper',
    districtId: 'jardins-antigos',
    npcId: 'velha-thorn',
    title: 'A Raiz Proibida',
    content: 'Thorn fala de uma raiz que cura qualquer doença, mas cresce apenas nas ruínas mais profundas dos Jardins. Algo antigo a protege — ela perdeu dois aprendizes tentando colhê-la.',
    symbol: 'chama-interior',
    chainId: 'chain-tecnica-perdida',
    chainOrder: 3,
    connections: [
      {
        targetId: 'secret-tecnica-dragao',
        type: 'reveals',
        description: 'O mesmo tipo de energia. O fogo interior das forjas e o guardião da raiz. Uma fonte antiga, ainda ativa.',
      },
    ],
  },
  {
    id: 'secret-tomo-proibido',
    type: 'whisper',
    districtId: 'jardins-antigos',
    npcId: 'guardiao-biblioteca',
    title: 'O Livro Sem Nome',
    content: 'O Guardião menciona um tomo que não está nas estantes visíveis. Está onde a sombra não alcança. Se você encontrá-lo, não o abra à noite.',
    symbol: 'olho-fechado',
    chainId: 'chain-guardioes',
    chainOrder: 2,
    connections: [
      {
        targetId: 'secret-cripta-esquecida',
        type: 'reveals',
        description: 'O livro fala dos guardiões. E por que não devem ser acordados sem necessidade.',
      },
    ],
  },
  {
    id: 'secret-anel-elfico',
    type: 'whisper',
    districtId: 'jardins-antigos',
    npcId: 'colecionador-vero',
    title: 'O Anel da Rainha',
    content: 'Vero mostra um anel que pertenceu à última rainha élfica. Ela não morreu — desapareceu. Mas o anel voltou sozinho para Helos, décadas depois. Ainda brilha como se tivesse dono.',
    symbol: 'folha-prata',
    chainId: 'chain-rainha-elfica',
    chainOrder: 1,
    connections: [
      {
        targetId: 'secret-tecido-vermelho',
        type: 'reveals',
        description: 'A rainha partiu em uma caravana. O tecido vermelho com bordados élficos... era dela.',
      },
      {
        targetId: 'secret-navio-fantasma',
        type: 'hints',
        description: 'O anel voltou sozinho. O navio aparece e desaparece. Ela ainda viaja.',
      },
    ],
  },
]

// ============================================
// EXPORTAÇÃO E UTILIDADES
// ============================================

export const secretsById: Record<string, Secret> = Object.fromEntries(
  secrets.map(s => [s.id, s])
)

export function getSecretById(id: string): Secret | undefined {
  return secretsById[id]
}

export function getSecretsByDistrictId(districtId: string): Secret[] {
  return secrets.filter(s => s.districtId === districtId)
}

export function getSecretsByNpcId(npcId: string): Secret[] {
  return secrets.filter(s => s.npcId === npcId)
}

export function getSecretsBySymbol(symbol: string): Secret[] {
  return secrets.filter(s => s.symbol === symbol)
}

export function getWhisperSecrets(): Secret[] {
  return secrets.filter(s => s.type === 'whisper')
}

export function getMapSecrets(): Secret[] {
  return secrets.filter(s => s.type === 'hidden-location' || s.type === 'hidden-npc')
}

export function getSecretsInChain(chainId: string): Secret[] {
  return secrets.filter(s => s.chainId === chainId).sort((a, b) => 
    (a.chainOrder || 0) - (b.chainOrder || 0)
  )
}
