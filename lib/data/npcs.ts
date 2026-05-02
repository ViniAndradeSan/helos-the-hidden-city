import type { NPC } from '@/lib/types'

// ============================================
// NPCs DE HELOS (30 NPCs - 5 por distrito)
// Agora com diálogos reativos que mudam baseado em descobertas
// ============================================

export const npcs: NPC[] = [
  // ============================================
  // PORTO DAS MARÉS (5 NPCs)
  // ============================================
  {
    id: 'tobias-velho',
    name: 'Tobias, o Velho',
    role: 'Mercador de Suprimentos Náuticos',
    personality: 'Experiente e cauteloso. Fala pausadamente, sempre olhando para o mar.',
    appearance: 'Cabelos brancos, rosto marcado pelo sal, olhos azuis desbotados.',
    greeting: 'Ah, outro viajante. Precisa de cordas? Lanternas? Tenho tudo que um marinheiro pode precisar.',
    whisper: 'Viu aquele navio que atracou ontem à noite? Ninguém desembarcou. Mas eu ouvi vozes vindo de lá.',
    shopId: 'ancora-corda',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-anel-elfico' },
        dialogue: 'Você tem um olhar diferente agora. Como se tivesse visto algo que não deveria. O mar guarda muitos segredos, amigo. Nem todos querem ser encontrados.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-rainha-elfica' },
        dialogue: 'Então você também sabe sobre ela. A rainha que partiu mas nunca chegou. Às vezes vejo o navio dela, sabe. Sempre à noite. Sempre em silêncio.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'mira-ondas',
    name: 'Mira Ondas',
    role: 'Taverneira',
    personality: 'Alegre e observadora. Conhece todos os marinheiros pelo nome.',
    appearance: 'Mulher robusta, cabelos ruivos presos, sempre com um pano no ombro.',
    greeting: 'Bem-vindo ao Peixe Dourado! Um rum para aquecer? Ou prefere algo mais forte?',
    whisper: 'Teve um homem aqui na semana passada, perguntando sobre passagens secretas no píer. Pagou bem pra ninguém falar sobre isso.',
    shopId: 'peixe-dourado',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-lanterna-apagada' },
        dialogue: 'Notou a lanterna também? Achei que era a única. Meu avô dizia que quem carrega aquele símbolo nunca se perde no mar. Mas também nunca volta a ser o mesmo.',
      },
    ],
  },
  {
    id: 'korth-armeiro',
    name: 'Korth',
    role: 'Armeiro do Cais',
    personality: 'Direto e impaciente. Ex-pirata, agora comerciante honesto.',
    appearance: 'Cicatriz no queixo, braços tatuados, voz rouca.',
    greeting: 'Quer uma lâmina que funcione ou uma que brilhe? Aqui você escolhe.',
    shopId: 'arsenal-cais',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-ancora-enterrada' },
        dialogue: 'Então achou a âncora. Eu servi naquele navio, sabia? O "Esperança Perdida". Não pergunte como sobrevivi. Nem eu sei.',
      },
    ],
  },
  {
    id: 'rulf-desconfiado',
    name: 'Rulf, o Desconfiado',
    role: 'Mercador de Relíquias Marítimas',
    personality: 'Paranóico e calculista. Sempre acha que estão tentando enganá-lo.',
    appearance: 'Magro, olhos pequenos que se movem demais, mãos inquietas.',
    greeting: 'Se não vai comprar, não atrapalhe. E não toque em nada.',
    whisper: 'Nem tudo que chega ao porto é declarado. Essa bússola? Veio de um navio que afundou. Ou deveria ter afundado.',
    shopId: 'bau-navegante',
  },
  {
    id: 'cego-farol',
    name: 'Cego do Farol',
    role: 'Taverneiro',
    personality: 'Silencioso e perturbador. Perdeu a visão no mar, mas enxerga mais do que deveria.',
    appearance: 'Olhos brancos, cicatrizes de queimadura, movimentos precisos demais para um cego.',
    greeting: 'Sente. Beba. Esqueça. É pra isso que veio, não é?',
    whisper: 'O farol não serve só pra guiar navios. Às vezes ele avisa. Às vezes ele atrai.',
    shopId: 'velas-rasgadas',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-navio-fantasma' },
        dialogue: 'Você o viu também. O navio silencioso. Posso sentir o cheiro dele em você. Sal antigo. Madeira que não apodrece. E algo mais... algo que não deveria existir.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-navegantes' },
        dialogue: 'A Guilda sabe que você está procurando. Eles sempre sabem. Se quiser respostas... vá ao cais norte. Meia-noite. Mas não espere voltar o mesmo.',
        replaces: 'whisper',
      },
    ],
  },

  // ============================================
  // MERCADO CENTRAL (5 NPCs)
  // ============================================
  {
    id: 'zahira',
    name: 'Zahira',
    role: 'Mercadora de Especiarias',
    personality: 'Misteriosa e encantadora. Fala com sotaque de terras distantes.',
    appearance: 'Véus coloridos, olhos escuros delineados, joias de ouro.',
    greeting: 'As especiarias do Oriente trazem mais que sabor, viajante. Trazem memórias de lugares que você nunca viu.',
    whisper: 'Tem um tempero que não está nas prateleiras. Vem das Ilhas Proibidas. Se tiver interesse... e coragem.',
    shopId: 'especiarias-oriente',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-placa-loja' },
        dialogue: 'Então leu a mensagem na placa. Poucos percebem. O "tempero das ilhas" não é apenas comida. É informação. E eu tenho bastante.',
      },
    ],
  },
  {
    id: 'bram-forjafogo',
    name: 'Bram Forjafogo',
    role: 'Ferreiro',
    personality: 'Orgulhoso do seu trabalho. Fala pouco, mas cada palavra tem peso.',
    appearance: 'Alto, musculoso, avental de couro queimado, barba negra.',
    greeting: 'Minhas lâminas falam por si. Quer uma espada? Vem ver o trabalho.',
    shopId: 'ferreiro-real',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-tecnica-dragao' },
        dialogue: 'Ignis te contou sobre o fogo interior? Eu vi uma vez. Uma lâmina que brilhava como brasas vivas. Nunca consegui replicar. Mas ainda tento.',
      },
    ],
  },
  {
    id: 'elara-tecidos',
    name: 'Elara',
    role: 'Mercadora de Tecidos',
    personality: 'Elegante e persuasiva. Sempre elogia os clientes.',
    appearance: 'Vestidos finos, cabelos escuros elaborados, mãos delicadas.',
    greeting: 'Ah, um cliente com bom gosto, posso ver. Tenho sedas que fariam um nobre chorar de inveja.',
    whisper: 'Vê aquele tecido vermelho no fundo? É de uma caravana que nunca chegou ao destino. Os bordados são élficos.',
    shopId: 'tecidos-finos',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-anel-elfico' },
        dialogue: 'Você viu o anel, não foi? O mesmo padrão dos bordados no meu tecido. A rainha... ela usava vermelho quando partiu. Pelo menos é o que dizem.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-rainha-elfica' },
        dialogue: 'Guarde esse tecido. Se ela voltar um dia... talvez reconheça. E talvez recompense quem cuidou de suas coisas.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'saffron-antiquario',
    name: 'Saffron',
    role: 'Antiquário',
    personality: 'Exuberante e teatral. Cada item é uma história que ele conta com prazer.',
    appearance: 'Roupas coloridas demais, bigode encerado, gestos largos.',
    greeting: 'Bem-vindo! Cada peça aqui tem história. Algumas belas, outras... bem, melhor não contar.',
    whisper: 'Essa moeda? Do Primeiro Rei de Helos. Alguns dizem que ele não morreu. Apenas partiu.',
    shopId: 'reliquias-saffron',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-fonte-central' },
        dialogue: 'Encontrou outra moeda do Primeiro Rei! Excelente! Sabia que o símbolo das três luas aparece em vários lugares de Helos? Coincidência? Acho que não.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-eldoria' },
        dialogue: 'Eldoria. Você descobriu sobre Eldoria. Poucos chegam tão longe. O Primeiro Rei veio de lá, dizem. E quando morreu... voltou.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'velha-nyra',
    name: 'Velha Nyra',
    role: 'Boticária',
    personality: 'Sábia e irônica. Fala pouco e olha muito.',
    appearance: 'Cabelos grisalhos, olhos penetrantes, mãos manchadas de ervas.',
    greeting: 'Essas ervas não crescem sozinhas. Diga o que precisa. Sem rodeios.',
    whisper: 'A terra aqui lembra de coisas antigas. E eu lembro junto com ela.',
    shopId: 'ervas-meia-noite',
  },

  // ============================================
  // CIDADELA ALTA (5 NPCs)
  // ============================================
  {
    id: 'sacerdotisa-lyra',
    name: 'Sacerdotisa Lyra',
    role: 'Guardiã do Templo da Aurora',
    personality: 'Serena e compassiva. Fala com uma calma que acalma.',
    appearance: 'Vestes brancas e douradas, cabelos prateados, olhos claros.',
    greeting: 'A luz da Aurora ilumina todos que buscam conforto. Como posso ajudar sua jornada?',
    whisper: 'Há uma cripta sob o templo que poucos conhecem. Lá descansam os primeiros guardiões. Alguns dizem que não descansam de verdade.',
    shopId: 'templo-aurora',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-automato-antigo' },
        dialogue: 'Então você viu os restos dos guardiões. Sim, eles eram máquinas. Construídos por mãos que não eram humanas. Para proteger algo que ainda está aqui.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-guardioes' },
        dialogue: 'Os guardiões podem ser reativados. Mas o preço é alto. A última vez que isso aconteceu... bem, é por isso que temos ruínas.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'capitao-aldric',
    name: 'Capitão Aldric',
    role: 'Comandante da Armaria da Guarda',
    personality: 'Rígido e honorável. Cada palavra é uma ordem.',
    appearance: 'Armadura polida, postura impecável, cabelos grisalhos curtos.',
    greeting: 'A Guarda de Helos não vende para qualquer um. Prove seu valor e teremos negócio.',
    shopId: 'armaria-guarda',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-conde-varis' },
        dialogue: 'Você também está investigando a morte do Conde? Cuidado. Quem encomendou aquilo ainda tem poder. E não gosta de curiosos.',
      },
    ],
  },
  {
    id: 'cedric-escriba',
    name: 'Cedric',
    role: 'Escriba Real',
    personality: 'Meticuloso e nervoso. Sempre verificando documentos.',
    appearance: 'Magro, óculos redondos, dedos manchados de tinta.',
    greeting: 'Documentos? Selos? Cartas oficiais? Tudo em ordem aqui.',
    whisper: 'Vi um documento estranho. Um decreto antigo, selado com um símbolo que não reconheci. Guardei uma cópia.',
    shopId: 'escriba-real',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-lanterna-apagada' },
        dialogue: 'O símbolo da serpente marinha! Aparece no decreto que encontrei. Era uma ordem de dissolução... assinada pela própria Guilda. Estranho, não?',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-navegantes' },
        dialogue: 'Destruí a cópia do decreto. Era perigoso demais. Mas antes fiz outra cópia. Está escondida onde a sombra não alcança.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'lady-altavara',
    name: 'Lady Altavara',
    role: 'Joalheira da Nobreza',
    personality: 'Sofisticada e condescendente. Trata clientes como súditos.',
    appearance: 'Vestido impecável, cabelos grisalhos em coque, muitas joias.',
    greeting: 'Minhas peças não são para qualquer bolso. Mas se você pode pagar... vejamos.',
    whisper: 'Este anel pertenceu a um diplomata que desapareceu. Dizem que ainda negocia... do outro lado.',
    shopId: 'joias-altavara',
  },
  {
    id: 'arquivista-morn',
    name: 'Arquivista Morn',
    role: 'Guardião do Arquivo do Conselho',
    personality: 'Obsessivo e protetor. Os arquivos são sua vida.',
    appearance: 'Velho, curvado, olhos que nunca param de ler.',
    greeting: 'O Arquivo não é para curiosos. O que busca? Seja específico.',
    whisper: 'Há mapas aqui que mostram partes de Helos que não existem mais. Ou que ainda não existem.',
    shopId: 'arquivo-conselho',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-estatua-olhos' },
        dialogue: 'Você viu o mapa na parede? Eu tenho um igual aqui. A área marcada... era onde ficava Eldoria. Antes de desaparecer.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-eldoria' },
        dialogue: 'Eldoria não desapareceu. Ela foi escondida. E o caminho só se abre quando as três luas se alinham. A próxima vez será... em breve.',
        replaces: 'whisper',
      },
    ],
  },

  // ============================================
  // BAIRRO DOS ARTÍFICES (5 NPCs)
  // ============================================
  {
    id: 'ignis-forjador',
    name: 'Ignis',
    role: 'Mestre Forjador',
    personality: 'Intenso e perfeccionista. Vive para sua arte.',
    appearance: 'Queimaduras nos braços, olhos de fogo, cabelos raspados.',
    greeting: 'A Forja do Dragão não faz lixo. Se quer barato, vá ao mercado. Se quer o melhor, está no lugar certo.',
    whisper: 'Meu avô forjou uma lâmina que brilhava por dentro. Não reflexo, não fogo. Brilhava sozinha. Ainda procuro a técnica.',
    shopId: 'forja-dragao',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-raiz-guardada' },
        dialogue: 'Thorn te contou sobre a raiz? O guardião que a protege... é o mesmo tipo de energia que meu avô usava. Fogo que não queima. Vida que não morre.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-tecnica-perdida' },
        dialogue: 'Agora entendo. O fogo interior não é técnica. É uma força. Antiga. Viva. Se eu conseguir canalizá-la... minhas lâminas vão mudar para sempre.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'mestre-orin',
    name: 'Mestre Orin',
    role: 'Alquimista',
    personality: 'Excêntrico e distraído. Sempre trabalhando em algo.',
    appearance: 'Barba longa queimada nas pontas, olhos grandes, roupas manchadas.',
    greeting: 'Hm? Ah, um cliente! O que precisa? Cura? Vigor? Algo mais experimental?',
    whisper: 'Descobri uma fórmula que não sei o que faz. Mas muda de cor sozinha. E às vezes se move contra a gravidade.',
    shopId: 'caldeirao-sabio',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-conde-varis' },
        dialogue: 'Alguém me perguntou sobre venenos raros. Há meses. Não vendi nada, juro. Mas... a fórmula que muda de cor. Ela reagiu quando mencionaram o Conde.',
      },
    ],
  },
  {
    id: 'pip-denteserra',
    name: 'Pip Denteserra',
    role: 'Inventora',
    personality: 'Energética e caótica. Fala rápido demais.',
    appearance: 'Baixinha, cabelos curtos bagunçados, óculos de proteção na testa.',
    greeting: 'Oi-oi-oi! Quer uma corda que se enrola sozinha? Um gancho que gruda em qualquer coisa? Tenho de tudo!',
    shopId: 'engenhocas-cia',
  },
  {
    id: 'gears-inventor',
    name: 'Gears',
    role: 'Inventor de Autômatos',
    personality: 'Metódico e obcecado. Fala mais com as máquinas do que com pessoas.',
    appearance: 'Óculos com múltiplas lentes, dedos manchados de óleo, sempre carrega engrenagens.',
    greeting: 'Ah. Pessoas. O que precisa? Seja rápido, tenho um projeto para terminar.',
    whisper: 'Estou construindo algo que pensa. Não como nós. Diferente.',
    shopId: 'engrenagens-bronze',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-automato-antigo' },
        dialogue: 'Você encontrou! Um dos antigos! As engrenagens... são perfeitas demais. Quem fez isso sabia mais que qualquer artífice de Helos. Preciso estudá-lo.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-guardioes' },
        dialogue: 'Se os guardiões eram máquinas... então eu posso fazer mais. Melhores. Preciso apenas do conhecimento certo. E você pode me ajudar a encontrá-lo.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'vara-flamejante',
    name: 'Vara Flamejante',
    role: 'Alquimista Explosiva',
    personality: 'Imprudente e entusiasmada. Cada explosão é uma lição.',
    appearance: 'Sobrancelhas chamuscadas, sorriso largo, marcas de queimadura.',
    greeting: 'Quer ver fogo de verdade? Não esse fogo comum. Fogo que não morre!',
    whisper: 'Tenho uma fórmula que faz fogo verde. Queima metal. Não sei bem como apagar.',
    shopId: 'vidros-fogo',
  },

  // ============================================
  // VIELA DAS SOMBRAS (5 NPCs)
  // ============================================
  {
    id: 'sombra',
    name: 'Sombra',
    role: 'Taverneiro (nome desconhecido)',
    personality: 'Silencioso e observador. Sabe mais do que diz.',
    appearance: 'Rosto sempre em sombras, voz baixa, movimentos suaves.',
    greeting: 'Bebida? Informação? Aqui tudo tem preço. E discrição.',
    whisper: 'A guilda não gosta que falem dela. Mas se procura trabalho... posso fazer uma introdução.',
    shopId: 'lua-negra',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-guilda-sombras' },
        dialogue: 'Então achou o esconderijo. Não se preocupe, já mudaram. Mas deixaram uma mensagem pra você. Não aqui. Em outro lugar.',
      },
    ],
  },
  {
    id: 'velha-nyx',
    name: 'Velha Nyx',
    role: 'Comerciante do Mercado Negro',
    personality: 'Astuta e perigosa. Sorri quando não deveria.',
    appearance: 'Idosa encurvada, olhos de corvo, unhas longas escuras.',
    greeting: 'Ah, alguém que sabe onde procurar. Tenho coisas que você não vai encontrar em lugar nenhum.',
    whisper: 'Procura o veneno que matou o Conde Varis? Sei quem tem. E sei quem encomendou.',
    shopId: 'lamina-oculta',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-decreto-antigo' },
        dialogue: 'O decreto... você o viu. Então sabe que alguém do Conselho está envolvido. Quer o nome? Vai custar. Mas vale cada moeda.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-conde-varis' },
        dialogue: 'Agora você sabe tudo. A questão é: o que vai fazer? Se quiser justiça, posso ajudar. Se quiser vingança... também.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'dado-rapido',
    name: 'Dado Rápido',
    role: 'Dono da Casa de Jogos',
    personality: 'Carismático e trapaceiro. Sempre sorrindo.',
    appearance: 'Bem vestido para o bairro, dentes de ouro, mãos ágeis.',
    greeting: 'Quer tentar a sorte? Na minha mesa, a fortuna sorri para os corajosos!',
    shopId: 'casa-jogos',
  },
  {
    id: 'dentes-prata',
    name: 'Dentes de Prata',
    role: 'Receptador',
    personality: 'Frio e profissional. Negócios são negócios.',
    appearance: 'Magro, pálido, dentes de prata que brilham quando fala.',
    greeting: 'Compro. Vendo. Não pergunto. Simples.',
    whisper: 'Tem gente procurando uma chave específica. Uma que abre qualquer porta. Paga bem por informação.',
    shopId: 'dentes-prata',
  },
  {
    id: 'porta-velha',
    name: 'Porta Velha',
    role: 'Taverneira Misteriosa',
    personality: 'Cansada e resignada. Já viu de tudo.',
    appearance: 'Idade indefinida, olhos vazios, movimentos lentos.',
    greeting: 'Sente. Não precisa falar. Ninguém aqui quer conversa.',
    whisper: 'Algumas pessoas vêm aqui para desaparecer. Eu ajudo.',
    shopId: 'ultima-porta',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-simbolo-porta' },
        dialogue: 'A serpente marinha. Você viu a marca. Eles usavam esse lugar, sabia? Antes de irem mais fundo. Agora só passam às vezes.',
      },
    ],
  },

  // ============================================
  // JARDINS ANTIGOS (5 NPCs)
  // ============================================
  {
    id: 'velha-thorn',
    name: 'Velha Thorn',
    role: 'Boticária',
    personality: 'Sábia e impaciente. Não tolera tolos.',
    appearance: 'Cabelos brancos selvagens, olhos verdes penetrantes, mãos cheias de cicatrizes.',
    greeting: 'Ervas, unguentos, curas. Diga o que precisa e vá embora.',
    whisper: 'Tem uma raiz que cresce só nas ruínas mais profundas. Cura qualquer coisa. Mas algo a protege. Algo velho.',
    shopId: 'ervas-floresta',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-tecnica-dragao' },
        dialogue: 'O fogo interior que Ignis menciona? É a mesma energia que protege a raiz. Uma vez, toquei a planta e senti calor. Não me queimou, mas algo... olhou de volta.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-tecnica-perdida' },
        dialogue: 'A força que protege a raiz é antiga. Mais antiga que Helos. Se você aprender a canalizá-la... traga um pouco da raiz. Farei algo que vale a pena.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'guardiao-biblioteca',
    name: 'O Guardião',
    role: 'Guardião da Biblioteca Esquecida',
    personality: 'Silencioso e atemporal. Fala em sussurros.',
    appearance: 'Idade indefinida, vestes desbotadas, olhos que parecem ver além.',
    greeting: '...Conhecimento tem peso. O que busca?',
    whisper: 'Há um tomo que não está nas estantes. Está onde a sombra não alcança. Se encontrar... não o abra à noite.',
    shopId: 'biblioteca-esquecida',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-cripta-esquecida' },
        dialogue: 'A cripta dos guardiões... O livro fala deles. Conta como foram feitos. E por que não devem ser acordados sem necessidade.',
      },
      {
        trigger: { type: 'chain_complete', id: 'chain-guardioes' },
        dialogue: 'Você sabe demais agora. Os guardiões foram criados para proteger algo. Algo que ainda está aqui. Algo que pode ser... despertado.',
        replaces: 'whisper',
      },
    ],
  },
  {
    id: 'colecionador-vero',
    name: 'Colecionador Vero',
    role: 'Antiquário',
    personality: 'Obcecado e nostálgico. Cada item tem uma história.',
    appearance: 'Velho elegante, roupas de outra era, monóculo sempre no olho.',
    greeting: 'Cada relíquia aqui tem uma história. Algumas belas, outras terríveis. Qual deseja ouvir?',
    whisper: 'Este anel pertenceu à última rainha élfica. Ela não morreu. Desapareceu. E o anel voltou sozinho.',
    shopId: 'reliquias-passado',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-tecido-vermelho' },
        dialogue: 'O tecido de Elara? Tem bordados idênticos ao anel. A rainha estava naquela caravana. Agora tenho certeza.',
      },
      {
        trigger: { type: 'secret_discovered', id: 'secret-navio-fantasma' },
        dialogue: 'Um navio silencioso que aparece e desaparece? E o anel que voltou sozinho? Ela ainda viaja. Entre mundos, talvez.',
      },
    ],
  },
  {
    id: 'druida-musgo',
    name: 'Druida Musgo',
    role: 'Curandeiro da Natureza',
    personality: 'Pacífico e conectado. Fala devagar, escolhendo cada palavra.',
    appearance: 'Barba com pequenas plantas, roupas de tons verdes, pés descalços.',
    greeting: 'A floresta te trouxe aqui. O que ela quer que você encontre?',
    whisper: 'A Árvore-Mãe ainda vive. Escondida. Esperando quem a mereça.',
    shopId: 'raizes-antigas',
    reactiveDialogues: [
      {
        trigger: { type: 'secret_discovered', id: 'secret-inscricao-antiga' },
        dialogue: 'Eldoria... Eu ouvi esse nome uma vez. Nos sonhos. A Árvore-Mãe sussurrou. Disse que Eldoria não é um lugar. É um momento.',
      },
    ],
  },
  {
    id: 'guardiao-tempo',
    name: 'Guardião do Tempo',
    role: 'Antiquário do Impossível',
    personality: 'Enigmático e perturbador. Sabe coisas que não deveria.',
    appearance: 'Rosto sem idade, olhos de cores diferentes, voz que ecoa.',
    greeting: 'Você chegou no momento certo. Ou errado. Depende de quem pergunta.',
    whisper: 'O tempo quebrou uma vez. Alguns fragmentos caíram aqui. Eu os guardo. Até que alguém venha buscá-los.',
    shopId: 'fragmentos-tempo',
    reactiveDialogues: [
      {
        trigger: { type: 'chain_complete', id: 'chain-eldoria' },
        dialogue: 'Eldoria. Você encontrou as peças. Agora entende que o tempo não é uma linha. É um círculo. E alguns momentos... voltam.',
        replaces: 'greeting',
      },
    ],
  },
]

// ============================================
// EXPORTAÇÃO E UTILIDADES
// ============================================

export const npcsById: Record<string, NPC> = Object.fromEntries(
  npcs.map(npc => [npc.id, npc])
)

export function getNpcById(id: string): NPC | undefined {
  return npcsById[id]
}

export function getNpcByShopId(shopId: string): NPC | undefined {
  return npcs.find(npc => npc.shopId === shopId)
}

export function getNpcsWithWhispers(): NPC[] {
  return npcs.filter(npc => npc.whisper)
}

export function getNpcsWithReactiveDialogues(): NPC[] {
  return npcs.filter(npc => npc.reactiveDialogues && npc.reactiveDialogues.length > 0)
}
