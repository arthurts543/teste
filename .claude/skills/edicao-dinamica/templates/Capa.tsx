import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Montserrat';

const {fontFamily} = loadFont('normal', {weights: ['200', '300', '700'], subsets: ['latin', 'latin-ext']});

// Capa no padrão da referência: fundo P&B, pessoa colorida recortada com contorno branco,
// texto à esquerda na altura do rosto (negrito + fino + palavra verde com brilho).
const VERDE = '#A6EE86';
const GLOW = '0 0 10px rgba(80,235,90,.85), 0 0 26px rgba(60,230,80,.6), 0 0 52px rgba(40,220,70,.35)';
const SOMBRA = '0 4px 20px rgba(0,0,0,.45)';

const base: React.CSSProperties = {fontFamily, color: '#FFFFFF', textShadow: SOMBRA, lineHeight: 0.92, whiteSpace: 'pre'};

export const Capa: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <Img src={staticFile('capa_fundo.png')} style={{position: 'absolute', width: 1080, height: 1920}} />
    <Img src={staticFile('capa_pessoa.png')} style={{position: 'absolute', width: 1080, height: 1920}} />
    <div style={{position: 'absolute', left: 64, top: 560, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
        <span style={{...base, fontWeight: 700, fontSize: 210}}>15</span>
        <span style={{...base, fontWeight: 300, fontSize: 86}}>termos</span>
      </div>
      <span style={{...base, fontWeight: 200, fontSize: 88, letterSpacing: '0.01em', marginTop: 4}}>ESSENCIAIS</span>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 10}}>
        <span style={{...base, fontWeight: 300, fontSize: 76}}>pra não</span>
      </div>
      <span style={{...base, fontWeight: 700, fontSize: 116, color: VERDE, textShadow: `${GLOW}, ${SOMBRA}`, marginTop: -2}}>QUEBRAR</span>
    </div>
  </AbsoluteFill>
);
