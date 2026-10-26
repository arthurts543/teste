import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Montserrat';
import {ANCORA, FPS, termos} from './data';

const {fontFamily} = loadFont('normal', {weights: ['400', '900'], subsets: ['latin', 'latin-ext']});

const V = '#E2B23C'; // dourado
const O = '#FF7A1A'; // laranja
const K = '#111111'; // preto
const W = '#FFFFFF';
const W2 = 'rgba(255,255,255,.45)';
const W3 = 'rgba(255,255,255,.18)';
const E = Easing.bezier(0.2, 0.9, 0.2, 1);
const cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const p = (k: number, a: number, b: number) => interpolate(k, [a, b], [0, 1], {...cl, easing: E});
const f = (t: number) => Math.round(t * FPS);
const txt = (size: number, weight = 900, fill = W): React.SVGProps<SVGTextElement> => ({fontFamily, fontWeight: weight, fontSize: size, fill, textAnchor: 'middle'});

// ---------- 15 termos ----------
type Termo = {nome: string[]; desc: string; Visual: React.FC<{k: number}>};

// ---------- pequenos ícones ----------
const Pessoa: React.FC<{x: number; y: number; r?: number; cor?: string}> = ({x, y, r = 1, cor = W}) => (
  <g transform={`translate(${x},${y}) scale(${r})`}>
    <circle cx={0} cy={-22} r={11} fill={cor} />
    <path d="M-19 14 Q-19 -6 0 -6 Q19 -6 19 14 Z" fill={cor} />
  </g>
);
const Moeda: React.FC<{x: number; y: number; r?: number; cor?: string; rotulo?: string}> = ({x, y, r = 13, cor = V, rotulo = '$'}) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={cor} />
    <text x={x} y={y + r * 0.38} {...txt(r * 1.05, 900, K)}>{rotulo}</text>
  </g>
);

const Roas: React.FC<{k: number}> = ({k}) => {
  const g = p(k, 6, 26);
  const h = 22 + 98 * g;
  const seta = p(k, 2, 10);
  return (
    <g>
      <rect x={38} y={130 - 22} width={52} height={22} rx={6} fill={W2} />
      <text x={64} y={152} {...txt(20, 400)}>gasto R$1</text>
      <path d={`M104 110 L${104 + 70 * seta} 110`} stroke={W} strokeWidth={4} strokeLinecap="round" />
      {seta > 0.95 && <path d="M172 110 l-10 -7 v14 z" fill={W} />}
      <rect x={196} y={130 - h} width={62} height={h} rx={8} fill={V} style={{filter: `drop-shadow(0 0 8px ${V})`}} />
      <text x={227} y={152} {...txt(20, 400)}>volta R${Math.round(1 + 4 * g)}</text>
      <text x={150} y={40} {...txt(34, 900, O)}>{(1 + 4 * g).toFixed(1).replace(".", ",")}x</text>
    </g>
  );
};

const Cac: React.FC<{k: number}> = ({k}) => (
  <g>
    <Pessoa x={232} y={98} r={1.6} />
    {[0, 1, 2].map((i) => {
      const t = ((k + i * 9) % 27) / 27;
      return <rect key={i} x={30 + 150 * t} y={86 - Math.sin(t * Math.PI) * 26} width={34} height={20} rx={4} fill={i % 2 ? O : V} opacity={1 - t * 0.6} />;
    })}
    <text x={150} y={156} {...txt(21, 400)}>R$ 50 por cliente</text>
  </g>
);

const Ltv: React.FC<{k: number}> = ({k}) => {
  const d = p(k, 2, 30);
  const pts = [[24, 130], [74, 118], [124, 100], [174, 84], [224, 60], [276, 34]];
  const path = 'M' + pts.map((q) => q.join(' ')).join(' L');
  return (
    <g>
      <line x1={24} y1={138} x2={280} y2={138} stroke={W3} strokeWidth={2} />
      <path d={path} fill="none" stroke={V} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d} style={{filter: `drop-shadow(0 0 6px ${V})`}} />
      <circle cx={24 + 252 * d} cy={130 - 96 * d} r={7} fill={O} />
      {['1º mês', '6º', '12º'].map((m, i) => <text key={m} x={[24, 150, 276][i]} y={160} {...txt(19, 400, W2)}>{m}</text>)}
      <text x={92} y={44} {...txt(28, 900)}>R$ {Math.round(1200 * d).toLocaleString('pt-BR')}</text>
    </g>
  );
};

const Cpm: React.FC<{k: number}> = ({k}) => {
  const n = Math.round(1000 * p(k, 0, 24));
  const pisca = Math.abs(Math.sin(k / 9));
  return (
    <g>
      <path d="M70 80 Q150 20 230 80 Q150 140 70 80 Z" fill="none" stroke={W} strokeWidth={5} />
      <circle cx={150} cy={80} r={24} fill={O} />
      <circle cx={150} cy={80} r={10 * (0.6 + 0.4 * pisca)} fill={K} />
      <text x={150} y={150} {...txt(24, 900)}>{n.toLocaleString('pt-BR')} views</text>
    </g>
  );
};

const Cpa: React.FC<{k: number}> = ({k}) => {
  const drop = ((k % 24) / 24);
  const check = p(k, 16, 22);
  return (
    <g>
      <path d="M70 60 h20 l18 62 h92 l16 -46 H102" fill="none" stroke={W} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={120} cy={138} r={8} fill={W} />
      <circle cx={190} cy={138} r={8} fill={W} />
      <Moeda x={155} y={8 + 80 * drop} r={13} />
      <g opacity={check} transform={`translate(240 46) scale(${0.6 + 0.4 * check})`}>
        <circle r={20} fill={O} />
        <path d="M-9 0 l6 7 l12 -13" stroke={K} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};

const Cpc: React.FC<{k: number}> = ({k}) => {
  const ciclo = k % 36;
  const mov = p(ciclo, 0, 14);
  const clique = p(ciclo, 14, 24);
  const cx = 250 - 90 * mov, cy = 140 - 64 * mov;
  return (
    <g>
      <rect x={70} y={56} width={160} height={46} rx={23} fill={clique > 0 && clique < 1 ? O : W3} stroke={W} strokeWidth={2} />
      <text x={150} y={86} {...txt(21, 900)}>Saiba mais</text>
      {clique > 0 && <circle cx={160} cy={78} r={10 + 40 * clique} fill="none" stroke={V} strokeWidth={3} opacity={1 - clique} />}
      <path d={`M${cx} ${cy} l0 34 l9 -9 l7 15 l7 -3 l-7 -15 l13 0 z`} fill={W} stroke="#000" strokeWidth={1.5} />
      <text x={150} y={156} {...txt(21, 400)}>R$ 0,80 por clique</text>
    </g>
  );
};

const Cpr: React.FC<{k: number}> = ({k}) => {
  const voo = p(k % 40, 0, 12);
  const treme = voo >= 1 ? Math.sin(k) * 2 : 0;
  return (
    <g>
      {[46, 32, 18].map((r, i) => <circle key={r} cx={200} cy={84} r={r} fill={i === 2 ? O : i === 1 ? 'rgba(0,0,0,.35)' : 'none'} stroke={i === 2 ? O : i === 1 ? V : W} strokeWidth={5} />)}
      <g transform={`translate(${40 + 152 * voo + treme} 84)`}>
        <line x1={-50} y1={0} x2={0} y2={0} stroke={W} strokeWidth={5} strokeLinecap="round" />
        <path d="M0 0 l-12 -8 v16 z" fill={W} />
      </g>
      <text x={150} y={156} {...txt(21, 400)}>custo ÷ resultado</text>
    </g>
  );
};

const Janela: React.FC<{k: number}> = ({k}) => {
  const abre = p(k, 2, 18);
  const compra = p(k, 18, 26);
  return (
    <g>
      <line x1={22} y1={92} x2={282} y2={92} stroke={W2} strokeWidth={3} />
      {Array.from({length: 8}).map((_, i) => <line key={i} x1={40 + i * 32} y1={86} x2={40 + i * 32} y2={98} stroke={W2} strokeWidth={2} />)}
      <rect x={40} y={60} width={224 * abre} height={64} rx={10} fill="rgba(226,178,60,.18)" stroke={V} strokeWidth={3} />
      <circle cx={40} cy={92} r={10} fill={W} />
      <text x={40} y={146} {...txt(19, 400)}>clicou</text>
      <g opacity={compra}>
        <circle cx={200} cy={92} r={12} fill={O} />
        <text x={200} y={146} {...txt(19, 400)}>comprou</text>
      </g>
      <text x={152} y={44} {...txt(22, 900, V)}>7 dias</text>
    </g>
  );
};

const BackEnd: React.FC<{k: number}> = ({k}) => (
  <g>
    {['1ª', '2ª', '3ª'].map((r, i) => {
      const a = p(k, 2 + i * 9, 10 + i * 9);
      return (
        <g key={r} opacity={a} transform={`translate(${60 + i * 90} 82) scale(${0.6 + 0.4 * a})`}>
          <rect x={-32} y={-30} width={64} height={60} rx={12} fill={i === 0 ? W3 : i === 1 ? V : O} stroke={W} strokeWidth={2} />
          <text x={0} y={8} {...txt(22, 900, i === 0 ? W : K)}>{r}</text>
        </g>
      );
    })}
    {[0, 1].map((i) => <path key={i} d={`M${96 + i * 90} 82 l18 0`} stroke={W} strokeWidth={4} strokeLinecap="round" opacity={p(k, 8 + i * 9, 11 + i * 9)} />)}
    <text x={150} y={150} {...txt(21, 400)}>venda → venda → venda</text>
  </g>
);

const Cap: React.FC<{k: number}> = ({k}) => (
  <g>
    <Pessoa x={50} y={96} r={1.4} />
    {[0, 1, 2, 3].map((i) => {
      const a = p(k, 3 + i * 6, 8 + i * 6);
      const bloqueado = i === 3;
      return (
        <g key={i} opacity={a * (bloqueado ? 0.6 : 1)} transform={`translate(${116 + i * 48} 84)`}>
          <rect x={-18} y={-26} width={36} height={52} rx={6} fill={bloqueado ? 'rgba(0,0,0,.55)' : V} stroke={W} strokeWidth={2} />
          {bloqueado && <path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke={W} strokeWidth={4} strokeLinecap="round" />}
        </g>
      );
    })}
    <text x={170} y={150} {...txt(22, 900, O)}>máx. 3x</text>
  </g>
);

const Mix: React.FC<{k: number}> = ({k}) => {
  const fatias = [0.4, 0.3, 0.2, 0.1];
  const cores = [V, O, W, K];
  const nomes = ['Meta', 'Google', 'YouTube', 'outros'];
  const prog = p(k, 0, 24);
  let acc = 0;
  const C = 2 * Math.PI * 46;
  return (
    <g>
      <g transform="translate(80 84) rotate(-90)">
        {fatias.map((v, i) => {
          const ini = acc; acc += v;
          const vis = Math.max(0, Math.min(v, prog - ini));
          return <circle key={i} r={46} fill="none" stroke={cores[i]} strokeWidth={22} strokeDasharray={`${C * vis} ${C}`} strokeDashoffset={-C * ini} />;
        })}
      </g>
      {nomes.map((n, i) => (
        <g key={n} opacity={p(k, 4 + i * 4, 10 + i * 4)}>
          <rect x={146} y={36 + i * 30} width={16} height={16} rx={4} fill={cores[i]} stroke={W2} strokeWidth={1} />
          <text x={168} y={50 + i * 30} {...txt(17, 400)} textAnchor="start">{n} {Math.round(fatias[i] * 100)}%</text>
        </g>
      ))}
    </g>
  );
};

const Fadiga: React.FC<{k: number}> = ({k}) => {
  const d = p(k, 2, 30);
  const nivel = 1 - 0.85 * d;
  return (
    <g>
      <path d="M20 40 Q90 34 130 70 T230 128" fill="none" stroke={W} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d} />
      <text x={70} y={150} {...txt(20, 400)}>CTR caindo</text>
      <rect x={240} y={44} width={40} height={80} rx={8} fill="none" stroke={W} strokeWidth={4} />
      <rect x={252} y={36} width={16} height={8} rx={2} fill={W} />
      <rect x={246} y={50 + 68 * (1 - nivel)} width={28} height={68 * nivel} rx={4} fill={nivel > 0.4 ? V : O} />
    </g>
  );
};

const Horario: React.FC<{k: number}> = ({k}) => {
  const ang = (k * 9) % 360;
  const alturas = [10, 14, 12, 20, 26, 34, 30, 44, 60, 74, 52, 24];
  return (
    <g>
      <circle cx={52} cy={74} r={38} fill="none" stroke={W} strokeWidth={5} />
      <line x1={52} y1={74} x2={52} y2={50} stroke={W} strokeWidth={5} strokeLinecap="round" />
      <line x1={52} y1={74} x2={52 + 28 * Math.sin((ang * Math.PI) / 180)} y2={74 - 28 * Math.cos((ang * Math.PI) / 180)} stroke={O} strokeWidth={4} strokeLinecap="round" />
      {alturas.map((h, i) => {
        const g = p(k, i * 1.5, 8 + i * 1.5);
        const pico = i === 9;
        return <rect key={i} x={110 + i * 15} y={120 - h * g} width={11} height={h * g} rx={3} fill={pico ? V : W2} />;
      })}
      <text x={150} y={156} {...txt(21, 900, O)}>pico às 20h</text>
    </g>
  );
};

const Funil: React.FC<{k: number}> = ({k}) => {
  const etapas = [['1.000', 'viram'], ['100', 'clicam'], ['10', 'compram']];
  return (
    <g>
      {etapas.map(([n, r], i) => {
        const a = p(k, 2 + i * 8, 9 + i * 8);
        const w0 = 180 - i * 52, w1 = 180 - (i + 1) * 52;
        const y = 22 + i * 44;
        return (
          <g key={n}>
            <path d={`M${110 - w0 / 2} ${y} H${110 + w0 / 2} L${110 + w1 / 2} ${y + 40} H${110 - w1 / 2} Z`} fill={i === 2 ? V : i === 1 ? O : W3} stroke={W} strokeWidth={2} opacity={0.3 + 0.7 * a} />
            <text x={238} y={y + 22} {...txt(21, 900)} opacity={a}>{n}</text>
            <text x={238} y={y + 38} {...txt(16, 400, W2)} opacity={a}>{r}</text>
          </g>
        );
      })}
    </g>
  );
};

const Api: React.FC<{k: number}> = ({k}) => (
  <g>
    <rect x={20} y={46} width={70} height={76} rx={10} fill={W3} stroke={W} strokeWidth={3} />
    {[0, 1, 2].map((i) => <line key={i} x1={32} y1={64 + i * 20} x2={78} y2={64 + i * 20} stroke={W} strokeWidth={4} strokeLinecap="round" />)}
    <text x={55} y={146} {...txt(19, 400)}>seu site</text>
    <line x1={98} y1={84} x2={204} y2={84} stroke={W2} strokeWidth={3} strokeDasharray="6 8" />
    {[0, 1, 2].map((i) => {
      const t = ((k + i * 8) % 24) / 24;
      return <circle key={i} cx={100 + 104 * t} cy={84} r={7} fill={O} style={{filter: `drop-shadow(0 0 6px ${O})`}} />;
    })}
    <circle cx={246} cy={84} r={36} fill={V} />
    <path d="M232 84 l9 10 l18 -20" stroke={K} strokeWidth={6} fill="none" strokeLinecap="round" />
    <text x={246} y={146} {...txt(19, 400)}>Meta</text>
  </g>
);

export const TERMOS: Termo[] = [
  {nome: ['ROAS'], desc: 'Retorno sobre o investimento em anúncios', Visual: Roas},
  {nome: ['CAC'], desc: 'Quanto custa conquistar um cliente', Visual: Cac},
  {nome: ['LTV'], desc: 'Quanto o cliente gera ao longo do tempo', Visual: Ltv},
  {nome: ['CPM'], desc: 'Custo por mil impressões', Visual: Cpm},
  {nome: ['CPA'], desc: 'Custo por aquisição (venda, cadastro)', Visual: Cpa},
  {nome: ['CPC'], desc: 'Custo por clique no anúncio', Visual: Cpc},
  {nome: ['CPR'], desc: 'Custo por resultado', Visual: Cpr},
  {nome: ['JANELA DE', 'ATRIBUIÇÃO'], desc: 'Prazo em que a venda conta pro anúncio', Visual: Janela},
  {nome: ['VENDAS', 'BACK-END'], desc: 'Vender de novo pra quem já comprou', Visual: BackEnd},
  {nome: ['CAP DE', 'FREQUÊNCIA'], desc: 'Limite de vezes que a pessoa vê o anúncio', Visual: Cap},
  {nome: ['MIX DE', 'MÍDIA'], desc: 'Como a verba se divide entre canais', Visual: Mix},
  {nome: ['FADIGA', 'CRIATIVA'], desc: 'Quando o público cansa do anúncio', Visual: Fadiga},
  {nome: ['HORÁRIO DE', 'EVENTOS'], desc: 'Quando as conversões acontecem', Visual: Horario},
  {nome: ['MÉTRICA', 'DE FUNIL'], desc: 'O resultado de cada etapa do funil', Visual: Funil},
  {nome: ['API DE', 'CONVERSÃO'], desc: 'Envia as vendas do seu site direto pra Meta', Visual: Api},
];

// Termo falado no instante (frame absoluto).
export function termoAtual(frame: number) {
  let n = -1;
  while (n + 1 < termos.length && f(termos[n + 1]) <= frame) n++;
  return {n, k: n >= 0 ? frame - f(termos[n]) : 0};
}

const SOMBRA = '0 4px 18px rgba(0,0,0,.45), 0 2px 4px rgba(0,0,0,.35)';

// Topo da tela: nome do termo mencionado (substitui o contador).
export const TermoTopo: React.FC<{ini: number; y: number}> = ({ini, y}) => {
  const frame = useCurrentFrame() + ini;
  const {fps} = useVideoConfig();
  const {n, k} = termoAtual(frame);
  if (n < 0) return null;
  const nome = TERMOS[n].nome;
  const sp = spring({frame: k, fps, config: {damping: 12, stiffness: 220, mass: 0.6}});
  const larg = Math.max(...nome.map((l) => l.length));
  const tam = Math.min(128, 940 / (larg * 0.8));
  return (
    <div style={{position: 'absolute', top: y, left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {nome.map((l, i) => (
        <span key={i} style={{fontFamily, fontWeight: 900, fontSize: tam, lineHeight: 0.92, color: W, textShadow: SOMBRA, whiteSpace: 'pre', display: 'inline-block',
          opacity: interpolate(k - i * 2, [0, 2], [0, 1], cl), filter: `blur(${interpolate(k - i * 2, [0, 6], [16, 0], cl)}px)`, transform: `scale(${interpolate(sp, [0, 1], [1.6, 1])})`}}>{l}</span>
      ))}
    </div>
  );
};

// Card de vidro ao lado da cabeça.
export const CardGlass: React.FC<{ini: number; fim: number; s: number}> = ({ini, fim, s}) => {
  const frame = useCurrentFrame() + ini;
  const {fps} = useVideoConfig();
  const {n, k} = termoAtual(frame);
  if (n < 0) return null;
  const termo = TERMOS[n];
  // âncoras medidas no quadro original: topo do cabelo y≈630, lateral da cabeça x≈595
  const cy = ANCORA.y + (630 - ANCORA.y) * s;
  const esquerda = ANCORA.x + (595 - ANCORA.x) * s + 54;
  const LARG = 392;
  const entradaCard = spring({frame: frame - ini, fps, config: {damping: 14, stiffness: 170, mass: 0.7}});
  const saida = interpolate(frame, [fim - 5, fim], [1, 0], cl);
  const flutua = Math.sin(frame / 22) * 5;
  const brilho = ((frame % 90) / 90) * 1.8 - 0.4;
  const conteudo = p(k, 0, 6);
  const tamNome = Math.min(60, (LARG - 48) / (Math.max(...termo.nome.map((l) => l.length)) * 0.8));
  return (
    <div style={{
      position: 'absolute', left: esquerda, top: cy + flutua, width: LARG,
      transform: `translateY(-50%) scale(${(0.85 + 0.15 * entradaCard) * (0.9 + 0.1 * saida)})`, transformOrigin: 'left center',
      opacity: Math.min(entradaCard, saida), filter: `blur(${(1 - Math.min(entradaCard, saida)) * 12}px)`,
      borderRadius: 34, overflow: 'hidden',
      background: 'linear-gradient(140deg, rgba(255,255,255,.26), rgba(255,255,255,.07) 55%, rgba(255,255,255,.12))',
      backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      border: '1.5px solid rgba(255,255,255,.42)',
      boxShadow: '0 24px 60px rgba(0,0,0,.30), inset 0 1px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(255,255,255,.12)',
      padding: '22px 22px 18px', boxSizing: 'border-box',
    }}>
      {/* reflexo de luz passando pelo vidro */}
      <div style={{position: 'absolute', top: -60, bottom: -60, left: `${brilho * 100}%`, width: 70, transform: 'rotate(18deg)', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent)'}} />
      <div style={{opacity: conteudo, filter: `blur(${(1 - conteudo) * 8}px)`, transform: `translateY(${(1 - conteudo) * 10}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {termo.nome.map((l, i) => (
          <span key={i} style={{fontFamily, fontWeight: 900, fontSize: tamNome, lineHeight: 0.95, color: W, textShadow: '0 2px 10px rgba(0,0,0,.35)', whiteSpace: 'pre'}}>{l}</span>
        ))}
        <span style={{fontFamily, fontWeight: 400, fontSize: 25, lineHeight: 1.18, color: 'rgba(255,255,255,.88)', textAlign: 'center', marginTop: 8, textShadow: '0 1px 6px rgba(0,0,0,.35)'}}>{termo.desc}</span>
        <div style={{marginTop: 10, width: LARG - 44, height: 196, borderRadius: 20, background: 'rgba(0,0,0,.16)', border: '1px solid rgba(255,255,255,.14)'}}>
          <svg width={LARG - 44} height={196} viewBox="0 0 300 170">
            <termo.Visual k={k} />
          </svg>
        </div>
      </div>
    </div>
  );
};
