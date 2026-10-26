// Tempos em segundos na linha do tempo já cortada (base.mp4, 28,77 s).
export const FPS = 30;
export const DURACAO = 28.766;

export type Palavra = {t: number; txt: string; tipo: 'apoio' | 'destaque'; verde?: boolean; anim?: 'blur' | 'slam' | 'pop'};
export type Grupo = Palavra[];

const a = (t: number, txt: string): Palavra => ({t, txt, tipo: 'apoio'});
const d = (t: number, txt: string, extra: Partial<Palavra> = {}): Palavra => ({t, txt, tipo: 'destaque', ...extra});

// Legenda nova (V3), sincronizada com a transcrição palavra a palavra.
export const grupos: Grupo[] = [
  [a(0.0, 'Esses'), a(0.32, 'são os'), d(0.58, 'TERMOS')],
  [a(0.82, 'do'), d(0.9, 'MARKETING', {verde: true, anim: 'slam'})],
  [a(1.26, 'que se'), a(1.8, 'você é'), d(2.16, 'EMPRESÁRIO')],
  [a(2.8, 'e quer'), d(3.3, 'VENDER'), d(3.54, 'MAIS')],
  [a(3.98, 'você'), d(4.16, 'PRECISA'), a(4.52, 'saber.')],
  [d(5.04, 'ROAS', {anim: 'pop'})],
  [d(5.72, 'CAC', {anim: 'pop'})],
  [d(6.5, 'LTV', {anim: 'pop'})],
  [d(7.52, 'CPM', {anim: 'pop'})],
  [d(8.4, 'CPA', {anim: 'pop'})],
  [d(9.12, 'CPC', {anim: 'pop'})],
  [d(10.14, 'CPR', {anim: 'pop'})],
  [a(11.04, 'janela de'), d(11.76, 'ATRIBUIÇÃO')],
  [a(12.5, 'sistema de vendas'), d(13.3, 'BACK-END')],
  [a(14.06, 'cap de'), d(14.64, 'FREQUÊNCIA')],
  [a(15.5, 'modelo de'), d(16.14, 'MIX DE MÍDIA')],
  [d(16.8, 'FADIGA'), a(17.2, 'criativa')],
  [a(18.0, 'horário de'), d(18.48, 'EVENTOS')],
  [a(19.14, 'métrica de'), d(19.72, 'FUNIL')],
  [a(20.14, 'e'), d(20.36, 'API', {anim: 'slam'}), a(20.56, 'de conversão')],
  [a(21.4, 'e se você quiser'), d(22.62, 'APRENDER MAIS')],
  [a(23.6, 'com quem vive de'), d(24.58, 'VENDAS', {verde: true, anim: 'slam'})],
  [a(25.12, 'e'), d(25.24, 'MARKETING', {verde: true}), a(25.58, 'todos os dias')],
  [a(26.58, 'você já'), d(27.06, 'SABE')],
  [a(27.3, 'é só'), d(27.82, 'SEGUIR'), a(28.0, 'o'), d(28.08, 'PERFIL!', {verde: true, anim: 'slam'})],
];

// Início de cada um dos 15 termos (contador no topo).
export const termos = [5.04, 5.72, 6.5, 7.52, 8.4, 9.12, 10.14, 11.04, 12.5, 14.06, 15.5, 16.8, 18.0, 19.14, 20.36];

// Enquadramento: instant = troca seca no jump cut (esconde o pulo); senão zoom rápido de 4 frames.
export const zooms: {t: number; s: number; instant?: boolean; whoosh?: boolean}[] = [
  {t: 0, s: 1.0, instant: true},
  {t: 0.9, s: 1.22, whoosh: true},
  {t: 3.08, s: 1.0, instant: true},
  {t: 4.16, s: 1.3, whoosh: true},
  {t: 4.94, s: 1.0, instant: true},
  {t: 7.52, s: 1.2},
  {t: 10.96, s: 1.25, instant: true},
  {t: 14.06, s: 1.0},
  {t: 16.8, s: 1.22, whoosh: true},
  {t: 19.14, s: 1.0},
  {t: 20.36, s: 1.3, whoosh: true},
  {t: 21.3, s: 1.0, instant: true},
  {t: 24.58, s: 1.22, whoosh: true},
  {t: 26.76, s: 1.0, instant: true},
  {t: 27.82, s: 1.3, whoosh: true},
];

export const glitches = [4.94, 21.3];

// Centro do rosto no quadro original (âncora dos zooms).
export const ANCORA = {x: 540, y: 820};
// Painel de vidro da V3 (coordenadas do quadro original).
export const PAINEL = {x: 130, y: 1060, w: 820, h: 320};
