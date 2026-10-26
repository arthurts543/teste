import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, OffthreadVideo, random, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Montserrat';
import {ANCORA, DURACAO, FPS, glitches, Grupo, grupos, PAINEL, Palavra, termos, zooms} from './data';
import {CardGlass, TermoTopo} from './Cards';

const {fontFamily} = loadFont('normal', {weights: ['400', '900'], subsets: ['latin', 'latin-ext']});

const BRANCO = '#FFFFFF';
const VERDE = '#00DC0C';
const SOMBRA = '0 4px 18px rgba(0,0,0,.45), 0 2px 4px rgba(0,0,0,.35)';
const GLOW = `0 0 12px ${VERDE}, 0 0 28px ${VERDE}CC, 0 0 60px ${VERDE}88`;
const EASE = Easing.bezier(0.2, 0.9, 0.2, 1);
const f = (t: number) => Math.round(t * FPS);

// ---------- câmera ----------
function escala(frame: number) {
  let i = 0;
  while (i + 1 < zooms.length && f(zooms[i + 1].t) <= frame) i++;
  const k = zooms[i];
  const ini = f(k.t);
  const anterior = i > 0 ? zooms[i - 1].s : k.s;
  const s = k.instant ? k.s : interpolate(frame - ini, [0, 4], [anterior, k.s], {extrapolateRight: 'clamp', easing: EASE});
  // "respiro": empurrão lento depois de cada troca, câmera nunca parada
  const respiro = interpolate(frame - ini, [0, 75], [0, 0.035], {extrapolateRight: 'clamp'});
  return s * (1 + respiro);
}

const Video: React.FC<{src: string; s: number; dx?: number; muted?: boolean}> = ({src, s, dx = 0, muted}) => (
  <AbsoluteFill style={{transform: `translateX(${dx}px) scale(${s})`, transformOrigin: `${ANCORA.x}px ${ANCORA.y}px`}}>
    <OffthreadVideo src={staticFile(src)} muted={muted} style={{width: 1080, height: 1920}} />
  </AbsoluteFill>
);

const Glitch: React.FC<{src: string; s: number; ini: number}> = ({src, s, ini}) => {
  const frame = useCurrentFrame();
  const k = frame - ini;
  const fatias = 12;
  const h = 1920 / fatias;
  const forca = interpolate(k, [0, 2, 8], [0.4, 1, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      {Array.from({length: fatias}).map((_, i) => {
        const dx = (random(`g${ini}-${i}-${Math.floor(k / 2)}`) - 0.5) * 2 * 320 * forca;
        return (
          <div key={i} style={{position: 'absolute', left: 0, top: i * h, width: 1080, height: h, overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: -i * h, width: 1080, height: 1920}}>
              <Video src={src} s={s} dx={dx} muted />
            </div>
          </div>
        );
      })}
      {Array.from({length: 7}).map((_, i) => {
        const y = random(`b${ini}-${i}-${k}`) * 1920;
        const cor = i % 2 ? 'rgba(0,255,255,.35)' : 'rgba(255,0,200,.3)';
        return <div key={`b${i}`} style={{position: 'absolute', left: 0, top: y, width: 1080, height: 10 + random(`h${i}${k}`) * 40, background: cor, mixBlendMode: 'screen', opacity: forca}} />;
      })}
    </AbsoluteFill>
  );
};

// ---------- tipografia ----------
const estiloApoio = (tam = 54): React.CSSProperties => ({fontFamily, fontWeight: 400, fontSize: tam, color: BRANCO, textShadow: SOMBRA, lineHeight: 1, whiteSpace: 'pre'});
const estiloDestaque = (tam: number, verde?: boolean): React.CSSProperties => ({
  fontFamily, fontWeight: 900, fontSize: tam, color: verde ? VERDE : BRANCO, textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: '-0.01em',
  textShadow: verde ? `${GLOW}, ${SOMBRA}` : SOMBRA, whiteSpace: 'pre',
});
const caber = (txt: string, larg: number, max = 118) => Math.min(max, larg / (txt.length * 0.8));

// Entrada de uma palavra a partir do frame em que ela é falada.
function entrada(k: number, anim: Palavra['anim'], fps: number) {
  if (anim === 'slam') {
    const sp = spring({frame: k, fps, config: {damping: 12, stiffness: 220, mass: 0.6}});
    return {opacity: interpolate(k, [0, 2], [0, 1], {extrapolateRight: 'clamp'}), filter: `blur(${interpolate(k, [0, 6], [16, 0], {extrapolateRight: 'clamp'})}px)`, transform: `scale(${interpolate(sp, [0, 1], [1.8, 1])})`};
  }
  const p = interpolate(k, [0, 5], [0, 1], {extrapolateRight: 'clamp', easing: EASE});
  return {opacity: p, filter: `blur(${12 * (1 - p)}px)`, transform: `scale(${1.15 - 0.15 * p})`};
}

// Letras entrando uma a uma (CTA / siglas).
const LetterPop: React.FC<{txt: string; k: number; estilo: React.CSSProperties; intervalo?: number}> = ({txt, k, estilo, intervalo = 2}) => (
  <span style={{display: 'inline-flex', ...estilo}}>
    {txt.split('').map((c, i) => {
      const ki = k - i * intervalo;
      const p = interpolate(ki, [0, 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE});
      return <span key={i} style={{display: 'inline-block', opacity: ki < 0 ? 0 : 1, transform: `translateY(${40 * (1 - p)}%) scale(${0.6 + 0.4 * p})`, whiteSpace: 'pre'}}>{c}</span>;
    })}
  </span>
);

const Linha: React.FC<{children: React.ReactNode; gap?: number; mt?: number}> = ({children, gap = 14, mt = 0}) => (
  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap, marginTop: mt}}>{children}</div>
);

// Grupo de legenda: palavras vão empilhando; apoio e destaque em linhas próprias.
const GrupoLegenda: React.FC<{g: Grupo; fim: number; larg: number; ini: number}> = ({g, fim, larg, ini}) => {
  const frame = useCurrentFrame() + ini; // frame absoluto
  const {fps} = useVideoConfig();
  const saida = interpolate(frame, [f(fim) - 3, f(fim)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const linhas: Palavra[][] = [];
  for (const p of g) {
    const ult = linhas[linhas.length - 1];
    if (ult && ult[0].tipo === p.tipo) ult.push(p);
    else linhas.push([p]);
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: saida, filter: `blur(${(1 - saida) * 10}px)`}}>
      {linhas.map((l, i) => {
        const destaque = l[0].tipo === 'destaque';
        const tam = destaque ? caber(l.map((p) => p.txt).join(' '), larg) : 54;
        return (
          <Linha key={i} gap={destaque ? 22 : 12} mt={i === 0 ? 0 : destaque ? -4 : -2}>
            {l.map((p, j) => {
              const k = frame - f(p.t);
              if (k < -1) return <span key={j} style={{...(destaque ? estiloDestaque(tam) : estiloApoio()), opacity: 0}}>{p.txt}</span>;
              if (p.anim === 'pop') return <LetterPop key={j} txt={p.txt} k={k} estilo={estiloDestaque(tam, p.verde)} />;
              return (
                <span key={j} style={{...(destaque ? estiloDestaque(tam, p.verde) : estiloApoio()), display: 'inline-block', ...entrada(k, p.anim, fps)}}>
                  {p.txt}
                </span>
              );
            })}
          </Linha>
        );
      })}
    </div>
  );
};

// ---------- elementos do topo (zona alta) ----------
const ZonaAlta: React.FC<{children: React.ReactNode; y?: number}> = ({children, y = 380}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
    <div style={{position: 'absolute', top: y, left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>{children}</div>
  </AbsoluteFill>
);

const Titulo: React.FC = () => {
  const frame = useCurrentFrame(); // relativo ao início da Sequence (0,58 s)
  const {fps} = useVideoConfig();
  const n = Math.round(interpolate(frame, [0, 14], [0, 15], {extrapolateRight: 'clamp'}));
  const kApoio = frame - f(0.82 - 0.58);
  return (
    <ZonaAlta>
      <Linha gap={26}>
        <span style={{...estiloDestaque(150, true), display: 'inline-block', ...entrada(frame, 'slam', fps)}}>{String(n)}</span>
        <span style={{...estiloDestaque(150), display: 'inline-block', ...entrada(frame - 2, 'slam', fps)}}>TERMOS</span>
      </Linha>
      <Linha mt={4}>
        <span style={{...estiloApoio(64), display: 'inline-block', ...(kApoio < 0 ? {opacity: 0} : entrada(kApoio, 'blur', fps))}}>essenciais para não quebrar</span>
      </Linha>
    </ZonaAlta>
  );
};

const VendasMarketing: React.FC = () => {
  const frame = useCurrentFrame(); // relativo a 23,6 s
  const {fps} = useVideoConfig();
  const k = (t: number) => frame - f(t - 23.6);
  const vis = (t: number) => (k(t) < -1 ? {opacity: 0} : entrada(k(t), t === 24.58 ? 'slam' : 'blur', fps));
  return (
    <ZonaAlta>
      <span style={{...estiloApoio(60), display: 'inline-block', ...vis(23.6)}}>com quem vive de</span>
      <span style={{...estiloDestaque(150), display: 'inline-block', marginTop: -2, ...vis(24.58)}}>VENDAS</span>
      <Linha gap={18} mt={-6}>
        <span style={{...estiloApoio(60), display: 'inline-block', ...vis(25.12)}}>e</span>
        <span style={{...estiloDestaque(130, true), display: 'inline-block', ...vis(25.24)}}>MARKETING</span>
      </Linha>
    </ZonaAlta>
  );
};

const Cta: React.FC = () => {
  const frame = useCurrentFrame(); // relativo a 26,58 s
  const {fps} = useVideoConfig();
  const linha = interpolate(frame, [4, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE});
  return (
    <ZonaAlta y={390}>
      <span style={{...estiloApoio(60), display: 'inline-block', ...entrada(frame, 'blur', fps)}}>é só</span>
      <div style={{position: 'relative', marginTop: 6, width: 'fit-content'}}>
        <LetterPop txt="SEGUIR O PERFIL" k={frame - 10} estilo={estiloDestaque(98)} />
        <div style={{position: 'absolute', left: '-4%', bottom: -16, height: 5, width: `${108 * linha}%`, background: BRANCO, borderRadius: 4, boxShadow: SOMBRA}} />
      </div>
      <span style={{...estiloDestaque(96, true), display: 'inline-block', marginTop: 34, ...(frame < 42 ? {opacity: 0} : entrada(frame - 42, 'slam', fps))}}>TODO DIA!</span>
    </ZonaAlta>
  );
};

// ---------- som ----------
const Sfx: React.FC<{t: number; arq: string; vol: number}> = ({t, arq, vol}) => (
  <Sequence from={Math.max(0, f(t) - (arq === 'whoosh.wav' ? 5 : 0))} durationInFrames={40} layout="none">
    <Audio src={staticFile(arq)} volume={vol} />
  </Sequence>
);

// ---------- composição ----------
export const Edit: React.FC<{versao: 2 | 3}> = ({versao}) => {
  const frame = useCurrentFrame();
  const src = versao === 3 ? 'base_v3.mp4' : 'base.mp4';
  const s = escala(frame);
  const glitch = glitches.find((g) => frame >= f(g) && frame < f(g) + 8);

  // posição da legenda nova acompanha o painel de vidro, que escala junto com o vídeo
  const centroPainel = PAINEL.y + PAINEL.h / 2;
  const yLegenda = ANCORA.y + (centroPainel - ANCORA.y) * s;
  const largLegenda = PAINEL.w * s - 90;

  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Video src={src} s={s} />
      {glitch !== undefined && <Glitch src={src} s={s} ini={f(glitch)} />}

      {versao === 3 &&
        grupos.map((g, i) => {
          const ini = f(g[0].t) - 1;
          const fim = i + 1 < grupos.length ? grupos[i + 1][0].t : DURACAO;
          return (
            <Sequence key={i} from={ini} durationInFrames={f(fim) - ini} layout="none">
              <AbsoluteFill>
                <div style={{position: 'absolute', left: 0, right: 0, top: yLegenda, transform: 'translateY(-50%)'}}>
                  <GrupoLegenda g={g} fim={fim} larg={largLegenda} ini={ini} />
                </div>
              </AbsoluteFill>
            </Sequence>
          );
        })}

      <Sequence from={f(0.58)} durationInFrames={f(4.94) - f(0.58)}><Titulo /></Sequence>
      <Sequence from={f(termos[0])} durationInFrames={f(21.3) - f(termos[0])} layout="none">
        <AbsoluteFill><TermoTopo ini={f(termos[0])} y={250} /></AbsoluteFill>
      </Sequence>
      {versao === 2 && (
        <Sequence from={f(termos[0])} durationInFrames={f(21.3) - f(termos[0])} layout="none">
          <AbsoluteFill><CardGlass ini={f(termos[0])} fim={f(21.3)} s={s} /></AbsoluteFill>
        </Sequence>
      )}
      {versao === 2 && <Sfx t={termos[0]} arq="whoosh.wav" vol={0.3} />}
      {versao === 2 && <Sequence from={f(23.6)} durationInFrames={f(26.5) - f(23.6)}><VendasMarketing /></Sequence>}
      {versao === 2 && <Sequence from={f(26.58)}><Cta /></Sequence>}

      {zooms.filter((z) => z.whoosh).map((z) => <Sfx key={`w${z.t}`} t={z.t} arq="whoosh.wav" vol={0.32} />)}
      {glitches.map((g) => <Sfx key={`g${g}`} t={g} arq="whoosh.wav" vol={0.4} />)}
      {termos.map((t) => <Sfx key={`t${t}`} t={t} arq="tick.wav" vol={0.22} />)}
      <Sfx t={0.58} arq="ding.wav" vol={0.28} />
      <Sfx t={24.58} arq="ding.wav" vol={0.24} />
      {versao === 3 && <Sfx t={28.08} arq="ding.wav" vol={0.24} />}
      {versao === 2 && Array.from({length: 15}).map((_, i) => <Sfx key={`p${i}`} t={26.58 + (10 + i * 2) / FPS} arq="pop.wav" vol={0.1} />)}
      {versao === 2 && <Sfx t={26.58 + 42 / FPS} arq="ding.wav" vol={0.24} />}
    </AbsoluteFill>
  );
};
