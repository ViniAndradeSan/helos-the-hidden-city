import type { Item } from '@/lib/types'

// ============================================
// CATÁLOGO DE ITENS DE HELOS
// Organizado por categoria (~135 itens)
// ============================================

// ============================================
// ARMAS (~35 itens)
// ============================================
export const weapons: Item[] = [
  // Espadas
  { id: 'espada-curta', name: 'Espada Curta', description: 'Lâmina leve e versátil, ideal para combate próximo.', price: 10, category: 'armas', rarity: 'comum' },
  { id: 'espada-longa', name: 'Espada Longa', description: 'A arma clássica de cavaleiros e mercenários.', price: 15, category: 'armas', rarity: 'comum' },
  { id: 'espada-bastarda', name: 'Espada Bastarda', description: 'Pode ser empunhada com uma ou duas mãos.', price: 35, category: 'armas', rarity: 'incomum' },
  { id: 'espada-gemea', name: 'Lâmina Gêmea', description: 'Duas espadas curtas perfeitamente balanceadas.', price: 45, category: 'armas', rarity: 'incomum' },
  { id: 'espada-fogo-interno', name: 'Espada Fogo Interno', description: 'A lâmina parece pulsar com luz própria.', price: 200, category: 'armas', rarity: 'raro' },
  { id: 'sabre', name: 'Sabre', description: 'Lâmina curva favorita de marinheiros e duelistas.', price: 25, category: 'armas', rarity: 'comum' },
  { id: 'sabre-abordagem', name: 'Sabre de Abordagem', description: 'Mais pesado, para cortar cordas e inimigos.', price: 35, category: 'armas', rarity: 'incomum' },
  { id: 'montante', name: 'Montante', description: 'Espada de duas mãos para golpes devastadores.', price: 50, category: 'armas', rarity: 'incomum' },
  
  // Adagas
  { id: 'adaga', name: 'Adaga', description: 'Lâmina pequena para defesa pessoal.', price: 2, category: 'armas', rarity: 'comum' },
  { id: 'adaga-arremesso', name: 'Adaga de Arremesso', description: 'Balanceada para lançamento preciso. Vendida em par.', price: 4, category: 'armas', rarity: 'comum' },
  { id: 'adaga-sombria', name: 'Adaga Sombria', description: 'Lâmina negra que não reflete luz.', price: 50, category: 'armas', rarity: 'raro' },
  { id: 'punhal-envenenado', name: 'Punhal de Assassino', description: 'Lâmina negra com sulcos para veneno.', price: 75, category: 'armas', rarity: 'raro' },
  { id: 'main-gauche', name: 'Main Gauche', description: 'Adaga de parada para a mão secundária.', price: 15, category: 'armas', rarity: 'incomum' },
  
  // Machados
  { id: 'machado-mao', name: 'Machado de Mão', description: 'Ferramenta e arma, útil em qualquer situação.', price: 5, category: 'armas', rarity: 'comum' },
  { id: 'machado-batalha', name: 'Machado de Batalha', description: 'Pesado e mortal nas mãos certas.', price: 30, category: 'armas', rarity: 'incomum' },
  { id: 'machado-duplo', name: 'Machado Duplo', description: 'Duas lâminas, o dobro de problemas.', price: 60, category: 'armas', rarity: 'raro' },
  
  // Arcos e Bestas
  { id: 'arco-curto', name: 'Arco Curto', description: 'Compacto e fácil de usar.', price: 25, category: 'armas', rarity: 'comum' },
  { id: 'arco-longo', name: 'Arco Longo', description: 'Alcance superior, requer força.', price: 50, category: 'armas', rarity: 'incomum' },
  { id: 'besta-leve', name: 'Besta Leve', description: 'Simples de operar, lenta para recarregar.', price: 35, category: 'armas', rarity: 'comum' },
  { id: 'besta-pesada', name: 'Besta Pesada', description: 'Poder de perfuração de armaduras.', price: 75, category: 'armas', rarity: 'incomum' },
  { id: 'virotes', name: 'Virotes (20)', description: 'Munição para bestas.', price: 2, category: 'armas', rarity: 'comum' },
  { id: 'flechas', name: 'Flechas (20)', description: 'Munição para arcos.', price: 1, category: 'armas', rarity: 'comum' },
  
  // Outras armas
  { id: 'lanca', name: 'Lança', description: 'Alcance e versatilidade em combate.', price: 5, category: 'armas', rarity: 'comum' },
  { id: 'alabarda', name: 'Alabarda', description: 'Arma de haste com lâmina e gancho.', price: 20, category: 'armas', rarity: 'incomum' },
  { id: 'maca', name: 'Maça', description: 'Simples e eficaz contra armaduras.', price: 8, category: 'armas', rarity: 'comum' },
  { id: 'martelo-guerra', name: 'Martelo de Guerra', description: 'Esmaga escudos e capacetes.', price: 25, category: 'armas', rarity: 'incomum' },
  { id: 'mangual', name: 'Mangual', description: 'Corrente e esfera com espinhos.', price: 15, category: 'armas', rarity: 'comum' },
  { id: 'cajado-combate', name: 'Cajado de Combate', description: 'Madeira reforçada com ponteiras de ferro.', price: 5, category: 'armas', rarity: 'comum' },
  { id: 'chicote', name: 'Chicote', description: 'Arma de alcance que causa dor.', price: 10, category: 'armas', rarity: 'comum' },
  { id: 'arpao', name: 'Arpão', description: 'Para caça em alto mar. Ou em terra.', price: 15, category: 'armas', rarity: 'comum' },
]

// ============================================
// ARMADURAS (~20 itens)
// ============================================
export const armors: Item[] = [
  // Armaduras Leves
  { id: 'couro', name: 'Armadura de Couro', description: 'Proteção básica sem restringir movimento.', price: 10, category: 'armaduras', rarity: 'comum' },
  { id: 'couro-batido', name: 'Couro Batido', description: 'Couro tratado para maior resistência.', price: 25, category: 'armaduras', rarity: 'comum' },
  { id: 'gibao-peles', name: 'Gibão de Peles', description: 'Aquece e protege contra golpes leves.', price: 15, category: 'armaduras', rarity: 'comum' },
  
  // Armaduras Médias
  { id: 'cota-malha', name: 'Cota de Malha', description: 'Anéis de metal entrelaçados. Clássica e confiável.', price: 75, category: 'armaduras', rarity: 'incomum' },
  { id: 'brigandina', name: 'Brigandina', description: 'Placas de metal costuradas em tecido.', price: 100, category: 'armaduras', rarity: 'incomum' },
  { id: 'cota-escamas', name: 'Cota de Escamas', description: 'Placas sobrepostas como escamas de peixe.', price: 50, category: 'armaduras', rarity: 'incomum' },
  
  // Armaduras Pesadas
  { id: 'meia-armadura', name: 'Meia Armadura', description: 'Placas protegendo tronco e membros.', price: 200, category: 'armaduras', rarity: 'incomum' },
  { id: 'armadura-completa', name: 'Armadura Completa', description: 'Proteção total em aço forjado.', price: 500, category: 'armaduras', rarity: 'raro' },
  { id: 'armadura-guarda', name: 'Armadura da Guarda de Helos', description: 'O orgulho da cidade, forjada na Cidadela.', price: 750, category: 'armaduras', rarity: 'raro' },
  
  // Escudos
  { id: 'broquel', name: 'Broquel', description: 'Escudo pequeno para parar golpes rápidos.', price: 5, category: 'armaduras', rarity: 'comum' },
  { id: 'escudo-medio', name: 'Escudo Médio', description: 'Equilíbrio entre proteção e mobilidade.', price: 15, category: 'armaduras', rarity: 'comum' },
  { id: 'escudo-torre', name: 'Escudo Torre', description: 'Cobertura total, pesado demais para atacar.', price: 30, category: 'armaduras', rarity: 'incomum' },
  { id: 'escudo-helos', name: 'Escudo com Brasão de Helos', description: 'Símbolo de proteção e honra da cidade.', price: 50, category: 'armaduras', rarity: 'incomum' },
  
  // Capacetes
  { id: 'elmo-aberto', name: 'Elmo Aberto', description: 'Protege a cabeça sem restringir visão.', price: 10, category: 'armaduras', rarity: 'comum' },
  { id: 'elmo-fechado', name: 'Elmo Fechado', description: 'Proteção total com viseira articulada.', price: 25, category: 'armaduras', rarity: 'incomum' },
  { id: 'capuz-malha', name: 'Capuz de Malha', description: 'Proteção para cabeça e pescoço.', price: 20, category: 'armaduras', rarity: 'comum' },
  
  // Outros
  { id: 'capa-viajante', name: 'Capa do Viajante', description: 'Repele água e resiste ao fogo. Quase.', price: 30, category: 'armaduras', rarity: 'incomum' },
  { id: 'mascara-noite', name: 'Máscara da Noite', description: 'Esconde o rosto nas sombras.', price: 25, category: 'armaduras', rarity: 'incomum' },
]

// ============================================
// FERRAMENTAS (~30 itens)
// ============================================
export const tools: Item[] = [
  // Ferramentas de Aventura
  { id: 'corda-15m', name: 'Corda (15m)', description: 'Cânhamo trançado, resistente e versátil.', price: 1, category: 'ferramentas', rarity: 'comum' },
  { id: 'corda-30m', name: 'Corda (30m)', description: 'Para descidas mais longas.', price: 2, category: 'ferramentas', rarity: 'comum' },
  { id: 'corda-seda', name: 'Corda de Seda (15m)', description: 'Leve, forte e silenciosa.', price: 50, category: 'ferramentas', rarity: 'raro' },
  { id: 'gancho', name: 'Gancho de Escalada', description: 'Metal forjado com três pontas.', price: 2, category: 'ferramentas', rarity: 'comum' },
  { id: 'gancho-retratil', name: 'Gancho Retrátil', description: 'Sobe sozinho quando você puxa a corda.', price: 75, category: 'ferramentas', rarity: 'raro' },
  { id: 'ganchos-escalada', name: 'Ganchos de Escalada (par)', description: 'Para subir paredes sem corda.', price: 15, category: 'ferramentas', rarity: 'incomum' },
  { id: 'lanterna', name: 'Lanterna', description: 'Ilumina 10m à frente. Precisa de óleo.', price: 5, category: 'ferramentas', rarity: 'comum' },
  { id: 'lanterna-focada', name: 'Lanterna Focada', description: 'Ilumina mais longe, mas mais estreito.', price: 15, category: 'ferramentas', rarity: 'incomum' },
  { id: 'cantil', name: 'Cantil', description: 'Comporta água para um dia de viagem.', price: 1, category: 'ferramentas', rarity: 'comum' },
  { id: 'pe-cabra', name: 'Pé de Cabra', description: 'Abre portas, caixas e crânios.', price: 2, category: 'ferramentas', rarity: 'comum' },
  { id: 'picareta', name: 'Picareta', description: 'Para escavar e quebrar pedras.', price: 3, category: 'ferramentas', rarity: 'comum' },
  { id: 'chave-mestra', name: 'Chave Mestra', description: 'Abre portas que não querem ser abertas.', price: 100, category: 'ferramentas', rarity: 'raro' },
  
  // Ferramentas de Ofício
  { id: 'ferramentas-ferreiro', name: 'Kit de Ferreiro', description: 'Martelo, tenazes, lima e outros.', price: 25, category: 'ferramentas', rarity: 'incomum' },
  { id: 'ferramentas-alquimia', name: 'Kit de Alquimia', description: 'Alambique, frascos, balança e ingredientes básicos.', price: 50, category: 'ferramentas', rarity: 'incomum' },
  { id: 'ferramentas-carpintaria', name: 'Kit de Carpinteiro', description: 'Serra, formão, plaina e pregos.', price: 15, category: 'ferramentas', rarity: 'comum' },
  { id: 'ferramentas-ladrao', name: 'Kit de Ladrão', description: 'Gazuas, ganchos e ferramentas de precisão.', price: 30, category: 'ferramentas', rarity: 'incomum' },
  { id: 'ferramentas-cura', name: 'Kit de Curandeiro', description: 'Bandagens, agulhas, ervas medicinais.', price: 20, category: 'ferramentas', rarity: 'comum' },
  { id: 'ferramentas-mecanico', name: 'Kit de Mecânico', description: 'Chaves, engrenagens sobressalentes, óleo fino.', price: 40, category: 'ferramentas', rarity: 'incomum' },
  
  // Ferramentas de Exploração
  { id: 'mapa-regiao', name: 'Mapa da Região', description: 'Detalhes de estradas e vilarejos próximos.', price: 15, category: 'ferramentas', rarity: 'comum' },
  { id: 'mapa-helos-completo', name: 'Mapa Completo de Helos', description: 'Cada rua, cada beco da cidade.', price: 50, category: 'ferramentas', rarity: 'incomum' },
  { id: 'bussola', name: 'Bússola', description: 'Sempre aponta para o norte. Geralmente.', price: 25, category: 'ferramentas', rarity: 'incomum' },
  { id: 'bussola-correntes', name: 'Bússola das Correntes', description: 'Aponta para onde o vento vai levar.', price: 75, category: 'ferramentas', rarity: 'raro' },
  { id: 'luneta', name: 'Luneta', description: 'Enxergue longe como uma águia.', price: 100, category: 'ferramentas', rarity: 'raro' },
  { id: 'luneta-marinheiro', name: 'Luneta de Marinheiro', description: 'Resistente a água salgada e quedas.', price: 75, category: 'ferramentas', rarity: 'incomum' },
  { id: 'lupa', name: 'Lupa', description: 'Para examinar detalhes e letras pequenas.', price: 15, category: 'ferramentas', rarity: 'comum' },
  { id: 'ampulheta', name: 'Ampulheta', description: 'Marca a passagem de uma hora.', price: 10, category: 'ferramentas', rarity: 'comum' },
  { id: 'ampulheta-quebrada', name: 'Ampulheta Quebrada', description: 'A areia ainda cai, mesmo partida.', price: 150, category: 'ferramentas', rarity: 'raro' },
  { id: 'relogio-bolso', name: 'Relógio de Bolso', description: 'Marca as horas com precisão.', price: 50, category: 'ferramentas', rarity: 'incomum' },
  { id: 'sino-pequeno', name: 'Sino Pequeno', description: 'Para alarmes e sinais.', price: 1, category: 'ferramentas', rarity: 'comum' },
  { id: 'espelho-aco', name: 'Espelho de Aço', description: 'Útil para olhar cantos e sinalizar.', price: 5, category: 'ferramentas', rarity: 'comum' },
  { id: 'giz', name: 'Giz (10 peças)', description: 'Para marcar caminhos e deixar mensagens.', price: 1, category: 'ferramentas', rarity: 'comum' },
  { id: 'corrente', name: 'Corrente (3m)', description: 'Elos de ferro para prender ou escalar.', price: 5, category: 'ferramentas', rarity: 'comum' },
]

// ============================================
// CONSUMÍVEIS (~30 itens)
// ============================================
export const consumables: Item[] = [
  // Poções
  { id: 'pocao-cura-menor', name: 'Poção de Cura Menor', description: 'Restaura ferimentos leves. Gosto amargo.', price: 25, category: 'consumíveis', rarity: 'comum' },
  { id: 'pocao-cura', name: 'Poção de Cura', description: 'Cura ferimentos moderados em segundos.', price: 50, category: 'consumíveis', rarity: 'incomum' },
  { id: 'pocao-cura-maior', name: 'Poção de Cura Maior', description: 'Para ferimentos graves. Rara e valiosa.', price: 150, category: 'consumíveis', rarity: 'raro' },
  { id: 'pocao-energia', name: 'Poção de Vigor', description: 'Afasta o cansaço por algumas horas.', price: 30, category: 'consumíveis', rarity: 'comum' },
  { id: 'elixir-clareza', name: 'Elixir da Clareza', description: 'Clareia a mente, mas causa dor de cabeça.', price: 75, category: 'consumíveis', rarity: 'incomum' },
  { id: 'antidoto', name: 'Antídoto', description: 'Neutraliza venenos comuns.', price: 50, category: 'consumíveis', rarity: 'incomum' },
  { id: 'antidoto-forte', name: 'Antídoto Potente', description: 'Para venenos mais letais.', price: 100, category: 'consumíveis', rarity: 'raro' },
  { id: 'raiz-vida', name: 'Raiz da Vida', description: 'Cura quase qualquer coisa. Quase.', price: 200, category: 'consumíveis', rarity: 'raro' },
  { id: 'seiva-arvore-mae', name: 'Seiva da Árvore-Mãe', description: 'Dizem que é lágrima de floresta.', price: 175, category: 'consumíveis', rarity: 'raro' },
  { id: 'essencia-sombraluna', name: 'Essência de Sombraluna', description: 'Para dormir sem sonhar.', price: 40, category: 'consumíveis', rarity: 'incomum' },
  { id: 'unguento-feridas', name: 'Unguento de Feridas', description: 'Acelera a cicatrização natural.', price: 15, category: 'consumíveis', rarity: 'comum' },
  
  // Venenos e Ácidos
  { id: 'veneno-basico', name: 'Veneno Básico', description: 'Um frasco, uma dose. Use com cuidado.', price: 100, category: 'consumíveis', rarity: 'raro' },
  { id: 'veneno-sono', name: 'Veneno do Sono', description: 'Faz adormecer por horas.', price: 75, category: 'consumíveis', rarity: 'raro' },
  { id: 'veneno-sono-eterno', name: 'Veneno do Sono Eterno', description: 'Uma gota, e os sonhos não acabam.', price: 250, category: 'consumíveis', rarity: 'raro' },
  { id: 'acido-frasco', name: 'Ácido (frasco)', description: 'Corrói metal e carne.', price: 25, category: 'consumíveis', rarity: 'incomum' },
  { id: 'fogo-liquido', name: 'Fogo Líquido', description: 'Não se apaga com água.', price: 50, category: 'consumíveis', rarity: 'raro' },
  { id: 'bomba-fumaca', name: 'Bomba de Fumaça', description: 'Cria uma nuvem densa para fuga.', price: 30, category: 'consumíveis', rarity: 'incomum' },
  { id: 'bomba-flash', name: 'Bomba de Luz', description: 'Cega temporariamente.', price: 35, category: 'consumíveis', rarity: 'incomum' },
  { id: 'oleo-lamina', name: 'Óleo para Lâmina', description: 'Mantém armas afiadas e sem ferrugem.', price: 5, category: 'consumíveis', rarity: 'comum' },
  
  // Comida e Bebida
  { id: 'racoes-semana', name: 'Rações de Viagem (7 dias)', description: 'Carne seca, biscoitos e frutas secas.', price: 5, category: 'consumíveis', rarity: 'comum' },
  { id: 'pao-fresco', name: 'Pão Fresco', description: 'Direto do forno, dura dois dias.', price: 1, category: 'consumíveis', rarity: 'comum' },
  { id: 'queijo-curado', name: 'Queijo Curado', description: 'Forte e nutritivo, dura semanas.', price: 2, category: 'consumíveis', rarity: 'comum' },
  { id: 'carne-seca', name: 'Carne Seca', description: 'Proteína para longas jornadas.', price: 3, category: 'consumíveis', rarity: 'comum' },
  { id: 'ensopado-peixe', name: 'Ensopado de Peixe', description: 'Quente e reconfortante.', price: 2, category: 'consumíveis', rarity: 'comum' },
  { id: 'vinho-comum', name: 'Vinho Comum (garrafa)', description: 'Tinto da região, honesto e barato.', price: 2, category: 'consumíveis', rarity: 'comum' },
  { id: 'vinho-negro', name: 'Vinho Negro', description: 'O sabor muda de acordo com seus segredos.', price: 25, category: 'consumíveis', rarity: 'incomum' },
  { id: 'cerveja-barril', name: 'Cerveja (barril pequeno)', description: 'Para acampamentos ou festas.', price: 5, category: 'consumíveis', rarity: 'comum' },
  { id: 'hidromel', name: 'Hidromel', description: 'Bebida dos antigos, doce e forte.', price: 10, category: 'consumíveis', rarity: 'incomum' },
  { id: 'rum-capitao', name: 'Rum do Capitão', description: 'Dá coragem até pra enfrentar krakens.', price: 15, category: 'consumíveis', rarity: 'incomum' },
  { id: 'grog', name: 'Grog', description: 'Rum aguado. Melhor que nada.', price: 1, category: 'consumíveis', rarity: 'comum' },
  
  // Outros Consumíveis
  { id: 'tocha', name: 'Tocha (5 unidades)', description: 'Cada uma queima por uma hora.', price: 1, category: 'consumíveis', rarity: 'comum' },
  { id: 'oleo-lanterna', name: 'Óleo de Lanterna (frasco)', description: 'Queima por 6 horas.', price: 1, category: 'consumíveis', rarity: 'comum' },
  { id: 'tinta-pena', name: 'Tinta e Pena', description: 'Para escrever e desenhar.', price: 5, category: 'consumíveis', rarity: 'comum' },
  { id: 'pergaminho', name: 'Pergaminho (5 folhas)', description: 'Em branco, pronto para uso.', price: 2, category: 'consumíveis', rarity: 'comum' },
  { id: 'pergaminho-selado', name: 'Pergaminho Selado', description: 'Reconhecido em todas as cidades do reino.', price: 15, category: 'consumíveis', rarity: 'incomum' },
  { id: 'pergaminho-antigo', name: 'Pergaminho Antigo', description: 'Palavras desbotadas de outra era.', price: 50, category: 'consumíveis', rarity: 'raro' },
  { id: 'vela', name: 'Velas (10 unidades)', description: 'Luz fraca mas duradoura.', price: 1, category: 'consumíveis', rarity: 'comum' },
  { id: 'incenso', name: 'Incenso (pacote)', description: 'Aromas exóticos de terras distantes.', price: 3, category: 'consumíveis', rarity: 'comum' },
  { id: 'incenso-meditacao', name: 'Incenso de Meditação', description: 'Clareia a mente e acalma os nervos.', price: 10, category: 'consumíveis', rarity: 'incomum' },
  { id: 'lacre-oficial', name: 'Lacre Oficial', description: 'Para documentos importantes.', price: 5, category: 'consumíveis', rarity: 'comum' },
]

// ============================================
// ITENS DE AVENTURA (~20 itens)
// ============================================
export const adventureItems: Item[] = [
  // Acampamento
  { id: 'barraca-1', name: 'Barraca Individual', description: 'Abrigo básico para uma pessoa.', price: 10, category: 'aventura', rarity: 'comum' },
  { id: 'barraca-4', name: 'Barraca Grande', description: 'Acomoda até quatro pessoas.', price: 25, category: 'aventura', rarity: 'comum' },
  { id: 'saco-dormir', name: 'Saco de Dormir', description: 'Noites mais confortáveis na estrada.', price: 5, category: 'aventura', rarity: 'comum' },
  { id: 'cobertor', name: 'Cobertor de Lã', description: 'Proteção contra o frio da noite.', price: 2, category: 'aventura', rarity: 'comum' },
  { id: 'panela-viagem', name: 'Panela de Viagem', description: 'Cozinhe onde estiver.', price: 3, category: 'aventura', rarity: 'comum' },
  { id: 'isqueiro', name: 'Pederneira', description: 'Faça fogo em qualquer lugar.', price: 1, category: 'aventura', rarity: 'comum' },
  
  // Transporte
  { id: 'mochila', name: 'Mochila', description: 'Carrega seus pertences com conforto.', price: 5, category: 'aventura', rarity: 'comum' },
  { id: 'mochila-grande', name: 'Mochila de Expedição', description: 'Para viagens longas e muito equipamento.', price: 15, category: 'aventura', rarity: 'comum' },
  { id: 'sela', name: 'Sela de Montaria', description: 'Para cavalgar com segurança.', price: 25, category: 'aventura', rarity: 'comum' },
  { id: 'alforje', name: 'Alforje', description: 'Bolsas laterais para sua montaria.', price: 10, category: 'aventura', rarity: 'comum' },
  
  // Diversos
  { id: 'bolsa-cintura', name: 'Bolsa de Cintura', description: 'Para moedas e itens pequenos.', price: 2, category: 'aventura', rarity: 'comum' },
  { id: 'odre-agua', name: 'Odre de Água', description: 'Armazena água para dois dias.', price: 2, category: 'aventura', rarity: 'comum' },
  { id: 'estojo-mapas', name: 'Estojo para Mapas', description: 'Protege pergaminhos de dano.', price: 5, category: 'aventura', rarity: 'comum' },
  { id: 'algemas', name: 'Algemas', description: 'Para prender prisioneiros.', price: 10, category: 'aventura', rarity: 'comum' },
  { id: 'rede-caca', name: 'Rede de Caça', description: 'Para capturar presas ou inimigos.', price: 5, category: 'aventura', rarity: 'comum' },
  
  // Jogos
  { id: 'dados-osso', name: 'Dados de Osso de Dragão', description: 'Dizem que nunca mentem.', price: 50, category: 'aventura', rarity: 'raro' },
  { id: 'baralho-marcado', name: 'Baralho Marcado', description: 'Para quem faz a própria sorte.', price: 15, category: 'aventura', rarity: 'incomum' },
]

// ============================================
// ITENS ESPECIAIS E RAROS
// ============================================
export const specialItems: Item[] = [
  // Amuletos e Joias
  { id: 'amuleto-protecao', name: 'Amuleto de Proteção', description: 'Dizem que afasta o mal. Quem sabe?', price: 50, category: 'aventura', rarity: 'incomum' },
  { id: 'amuleto-navegante', name: 'Amuleto do Navegante', description: 'Protege contra tempestades. Talvez.', price: 40, category: 'aventura', rarity: 'incomum' },
  { id: 'amuleto-sorte', name: 'Amuleto da Sorte', description: 'Um trevo de quatro folhas em ouro.', price: 75, category: 'aventura', rarity: 'incomum' },
  { id: 'anel-diplomata', name: 'Anel do Diplomata', description: 'Dizem que torna as palavras mais doces.', price: 150, category: 'aventura', rarity: 'raro' },
  { id: 'anel-sinete', name: 'Anel Sinete', description: 'Para selar documentos importantes.', price: 30, category: 'aventura', rarity: 'comum' },
  { id: 'anel-elfico', name: 'Anel da Rainha Élfica', description: 'Ainda brilha como se tivesse dono.', price: 500, category: 'aventura', rarity: 'raro' },
  { id: 'colar-prata', name: 'Colar de Prata', description: 'Simples e elegante.', price: 25, category: 'aventura', rarity: 'comum' },
  { id: 'bracelete-ouro', name: 'Bracelete de Ouro', description: 'Ostentação pura.', price: 100, category: 'aventura', rarity: 'incomum' },
  { id: 'broche-nobreza', name: 'Broche da Nobreza', description: 'Abre portas em certos círculos.', price: 75, category: 'aventura', rarity: 'incomum' },
  { id: 'tiara-menor', name: 'Tiara Menor', description: 'Para quem quer parecer importante.', price: 200, category: 'aventura', rarity: 'raro' },
  { id: 'moeda-primeiro-rei', name: 'Moeda do Primeiro Rei', description: 'Traz sorte, dizem os supersticiosos.', price: 100, category: 'aventura', rarity: 'raro' },
  
  // Relíquias e Artefatos
  { id: 'agua-benta', name: 'Água Benta (frasco)', description: 'Abençoada no Templo da Aurora.', price: 25, category: 'consumíveis', rarity: 'incomum' },
  { id: 'agua-benta-maior', name: 'Água Benta da Fonte Sagrada', description: 'Nunca seca, nunca envelhece.', price: 100, category: 'consumíveis', rarity: 'raro' },
  { id: 'simbolo-aurora', name: 'Símbolo da Aurora', description: 'Símbolo sagrado do templo.', price: 50, category: 'aventura', rarity: 'incomum' },
  { id: 'estatueta-antiga', name: 'Estatueta Antiga', description: 'De uma civilização esquecida.', price: 75, category: 'aventura', rarity: 'incomum' },
  { id: 'codice-eras', name: 'Códice das Eras', description: 'Ninguém conseguiu ler tudo.', price: 300, category: 'aventura', rarity: 'raro' },
  
  // Engenhocas
  { id: 'passaro-mecanico', name: 'Pássaro Mecânico', description: 'Canta ao amanhecer, nunca erra.', price: 150, category: 'aventura', rarity: 'raro' },
  { id: 'caixa-musica', name: 'Caixa de Música', description: 'Toca uma melodia que ninguém mais conhece.', price: 50, category: 'aventura', rarity: 'incomum' },
  
  // Outros especiais
  { id: 'pimenta-dunas', name: 'Pimenta das Dunas', description: 'Ardente como o sol do deserto.', price: 20, category: 'consumíveis', rarity: 'incomum' },
]

// ============================================
// EXPORTAÇÃO CONSOLIDADA
// ============================================
export const allItems: Item[] = [
  ...weapons,
  ...armors,
  ...tools,
  ...consumables,
  ...adventureItems,
  ...specialItems,
]

export const itemsById: Record<string, Item> = Object.fromEntries(
  allItems.map(item => [item.id, item])
)

export function getItemById(id: string): Item | undefined {
  return itemsById[id]
}

export function getItemsByCategory(category: Item['category']): Item[] {
  return allItems.filter(item => item.category === category)
}

export function getItemsByRarity(rarity: Item['rarity']): Item[] {
  return allItems.filter(item => item.rarity === rarity)
}
