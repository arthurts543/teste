---
name: edicao-dinamica
description: Estilo de edição padrão do Arthur para Reels/TikTok/Shorts — legenda cinética em duas camadas (palavra-chave pesada + apoio fino), destaque verde neon, punch-in zooms, transição glitch, logos/prints sobrepostos e SFX pontuais. Use SEMPRE que o Arthur pedir para editar um vídeo, fazer legenda, motion, "edição dinâmica" ou "no meu estilo", e ao montar qualquer composição Remotion para ele.
---

# Edição dinâmica — guia de estilo

Estilo aprendido do reel de referência `instagram.com/reel/DZxgywUO-nO` (talking head de assessoria de marketing, 64 s, 9:16, 30 fps).
Objetivo: toda edição nova deve parecer feita pelo mesmo editor. Siga os valores abaixo; só desvie se o Arthur pedir.

## 1. DNA do estilo (resumo em 6 linhas)

1. **Toda fala vira texto na tela**, sincronizada palavra a palavra, em grupos de 1–4 palavras.
2. **Duas camadas tipográficas**: palavra de apoio em fonte fina minúscula + palavra-chave em CAIXA ALTA superpesada.
3. **Um único acento de cor: verde neon** só nas palavras que vendem (vendas, marketing, hoje, aparecendo…).
4. **Câmera nunca parada**: punch-in (zoom de corte) a cada frase de impacto, volta pro plano aberto na seguinte.
5. **Elementos gráficos de prova**: print/dado na tela, logos de marcas, números grandes.
6. **Sem música de fundo** — só voz limpa + SFX pontuais (whoosh, pop, "ding").

## 2. Formato e entrega

| Item | Valor |
|---|---|
| Resolução | 1080×1920 (9:16) — referência veio em 360×640, mas entregue sempre em 1080×1920 |
| FPS | 30 |
| Duração típica | 45–70 s |
| Loudness | −14 LUFS integrado (referência mediu −14,5) |
| Áudio | voz apenas, sem trilha; pausas cortadas (nenhum silêncio > ~0,7 s) |

## 3. Tipografia

| Camada | Fonte | Peso | Caixa | Tamanho @1080×1920 | Uso |
|---|---|---|---|---|---|
| **Destaque** | Montserrat | 900 (Black) | MAIÚSCULA | 110–140 px (palavra ocupa 55–85 % da largura) | substantivos/verbos de impacto: EMPRESÁRIO, COMEÇARAM, NEGÓCIO, AUMENTANDO, VALIDADO |
| **Apoio** | Montserrat | 400 (Regular) | minúscula | 55–65 px | conectores e o resto da frase: "de empresas", "e teve um", "as suas", "hoje grandes" |
| **Apoio espaçado** (variação rara) | Montserrat | 400 | MAIÚSCULA, tracking +15 % | 65–75 px | ênfase "elegante": ADIANTA, SEPHORA |

- Alternativas se Montserrat não estiver disponível: Archivo Black (destaque) + Poppins Regular (apoio).
- `line-height` do destaque: **0,85–0,95** (linhas quase encostando). A camada de apoio fica **sobreposta/encostada** em cima ou embaixo da palavra-chave (ex.: "de empresas" encostado em cima de "COMEÇARAM"), às vezes até invadindo 10–20 % da altura dela.
- Palavras longas podem ser **quebradas em duas linhas** pra caber grande: `NECESS / IDADE`.
- Sem contorno e sem caixa de fundo. Legibilidade vem de uma sombra suave: `text-shadow: 0 4px 18px rgba(0,0,0,.35)`.
- Pode usar `$` como enfeite em dinheiro: `$VENDAS$`.

## 4. Cores

| Token | Hex | Uso |
|---|---|---|
| `--texto` | `#FFFFFF` | toda legenda padrão |
| `--verde` | `#00DC0C` (medido: rgb ≈ 0,220,12) | 1 palavra a cada 5–10 s, só as que vendem: APARECENDO, $VENDAS$, MARKETING, ENTENDERAM, HOJE!, UMA COISA! |
| `--glow` | `#00DC0C` a 60–80 % | brilho em volta do verde nos momentos-chave (`text-shadow: 0 0 12px, 0 0 28px, 0 0 60px` verde) |

Nada de outras cores na legenda. Cor extra só vem de elementos reais (logos, print).

## 5. Legenda — regras de sincronia e layout

- **Fonte da verdade:** timestamps por palavra da transcrição (ver §11). Cada palavra entra **no frame em que começa a ser falada** (no máximo 2 frames antes).
- **Grupo** = 1 a 4 palavras que formam uma ideia ("de empresas / COMEÇARAM / um / NEGÓCIO"). As palavras do grupo vão **empilhando** uma de cada vez; o grupo inteiro some quando a ideia termina e o próximo começa limpo.
- Em cada grupo, **uma palavra é o destaque** (Black, MAIÚSCULA); as outras ficam em apoio. Grupos de uma palavra só: destaque sozinho ("EMPRESÁRIO", "VALIDADO").
- **Posição varia por grupo**, alternando entre 3 zonas, sem cobrir o rosto:
  - **Zona alta** (y ≈ 15–25 %): acima da cabeça, no céu/fundo — mais usada quando ele está sentado/plano aberto.
  - **Zona peito** (y ≈ 55–70 %): sobre a camiseta — mais usada em plano fechado/punch-in.
  - **Lateral** (x deslocado 10–20 % pra esquerda ou direita, alinhado à esquerda) — pra variar.
  - Regra: nunca 3 grupos seguidos na mesma zona.
- **Alinhamento:** centralizado por padrão; às vezes alinhado à esquerda junto à lateral.
- **Saída:** corte seco ou fade+blur rápido (3–4 frames). Em grupos empilhados, a saída pode ser em cascata (primeira palavra sai primeiro).
- Revise o português do texto na tela (a referência tinha "TE CHAMO" no lugar de "te chamar" — não repita isso).

## 6. Animações de texto (catálogo)

Todas com `spring` do Remotion (`damping 14–18`, `stiffness 180–220`, `mass 0.6`) ou easing `cubic-bezier(.2,.9,.2,1)`.

| Nome | Quando | Como |
|---|---|---|
| **blurIn** (padrão) | quase todas as palavras | 0→100 % opacidade, `blur 12px→0`, `scale 1.15→1`, 4–6 frames |
| **slamIn** | palavra-chave verde/momento-chave | `scale 1.8→1` com overshoot leve, `blur 16→0`, 5–7 frames + glow que pulsa 1× (`$VENDAS$`, `HOJE!`) |
| **letterPop** | CTA / palavra que precisa ser "digitada" | cada letra entra de baixo (`translateY 40%→0`, `scale .6→1`), 2 frames de intervalo entre letras ("M-A-R-C-A", "DIRECT") |
| **underlineWipe** | antes da palavra do CTA | linha branca 3–4 px, ~70 % da largura, desenha da esquerda pra direita em 6–8 frames; a palavra entra em letterPop em cima dela |
| **counter** | números grandes | número verde conta de 0 até o valor em 12–18 frames (`+de` em apoio em cima, `4.000.000` em destaque verde com glow) |
| **fadeBlurOut** | saída de grupo | 3–4 frames, `blur 0→10px`, opacidade 100→0 |

## 7. Câmera e cortes

- **Jump cuts:** corte toda pausa de respiração; nenhum silêncio maior que ~0,7 s.
- **Punch-in (zoom de corte):** alternar plano **aberto (scale 1.0)** e **fechado (scale 1.25–1.4)** centrado no rosto. Troca instantânea no corte, ou "zoom rápido" de 3–5 frames. Use no início de frases de impacto e em toda palavra verde. Média de **1 troca de enquadramento a cada 3–6 s**.
- **Zoom de respiro:** depois de um corte de cena, zoom lento 1.0→1.08 em ~1 s pra não ficar estático.
- **Trocas de cenário/ângulo** a cada ~12–15 s (referência: sentado na mesa → em pé perto da piscina → em pé na frente das plantas). Se o material bruto tiver só um ângulo, simule com reenquadramento (crop) + espelhamento.
- **Gancho imediato:** primeiro texto aparece até 0,5 s e o primeiro punch-in ocorre até 1 s.

## 8. Elementos gráficos

- **Print de prova (split):** print de pesquisa/notícia/dado ocupa a **metade de cima** da tela (fundo escuro), o vídeo continua na metade de baixo. Entra com **glitch**; fica 2–3 s; número-chave em verde por cima (counter).
- **Logos de marcas:** PNG sem fundo, ~35–45 % da largura, sobre o peito, entrando em `slamIn` exatamente quando o nome é falado; 1–1,5 s cada; troca entre logos com glitch rápido (3–4 frames, faixas RGB). Use logos reais apenas como citação de exemplo, nunca sugerindo parceria.
- **Glitch:** faixas horizontais deslocadas (8–14 faixas, deslocamento x aleatório ±30 %, separação RGB), 6–10 frames. Usado em: entrada de print, troca de logo.

### 8.1 Cards de glass explicativos (preferência do Arthur)

Todo elemento visual que **explica o conteúdo** (termo, conceito, número, processo) vai num **card de glassmorphism** feito no Remotion:

- **Posição:** canto superior direito, ao lado da cabeça. **Centro vertical do card na linha do topo do cabelo**; borda esquerda ~55 px à direita da lateral da cabeça ("alguns centímetros" do rosto). Meça topo do cabelo/lateral da cabeça no bruto e faça o card **acompanhar os zooms** (`pos = âncora + (ponto − âncora) × escala`).
- **Tamanho:** ~390 px de largura em 1080×1920 (sem passar de ~20 px da borda direita).
- **Vidro:** `backdrop-filter: blur(20px) saturate(160%)`, fundo `linear-gradient(140deg, rgba(255,255,255,.26), rgba(255,255,255,.07) 55%, rgba(255,255,255,.12))`, borda 1,5 px branca 42 %, raio 34, sombra `0 24px 60px rgba(0,0,0,.30)` + brilho interno no topo.
- **Conteúdo (de cima pra baixo):** nome do termo (Montserrat 900, MAIÚSCULA, até 60 px, quebra em 2 linhas) → descrição curta (Montserrat 400, ~25 px) → **visual animado** (SVG ~350×196) com pequenos motions: gráfico desenhando, contador, ícone pulsando, pacotes de dados correndo etc. **Paleta dos motions dentro do card: dourado `#E2B23C` (principal), laranja `#FF7A1A` (destaque), preto `#111111` e branco** — sem verde dentro do card (o verde segue só na legenda).
- **Motions do card:** entrada com spring + blur, flutuação leve (±5 px), reflexo de luz passando pelo vidro a cada ~3 s, conteúdo troca com blur-in a cada termo, saída com fade/blur.
- **Topo central:** em listas, mostre **o nome do termo falado naquele instante** (não use contador "01/15").
- Gancho de lista no topo: número verde contando + palavra em destaque + linha de apoio (ex.: "**15 TERMOS** / essenciais para não quebrar").
- Biblioteca pronta de 15 visuais (ROAS, CAC, LTV, CPM, CPA, CPC, CPR, janela de atribuição, back-end, cap de frequência, mix de mídia, fadiga criativa, horário de eventos, funil, API de conversão) em `templates/Cards.tsx` — reutilize e adapte.

## 9. Som

- **Sem música de fundo.**
- **SFX pontuais**, discretos (−18 a −12 dB abaixo da voz):
  - `whoosh`/`swish` curto em punch-ins e glitches;
  - `ding`/brilho tonal em número/porcentagem e na palavra verde com glow;
  - `pop`/`click` nas letras do letterPop (opcional, baixo).
- Voz: limpar ruído, compressão leve, normalizar a −14 LUFS.

## 10. Estrutura de roteiro (o que funciona nesse formato)

| Bloco | Tempo | Exemplo da referência |
|---|---|---|
| Chamado + gancho | 0–2 s | "EMPRESÁRIO, deixa eu te contar UMA COISA!" |
| Dado chocante + prova | 2–14 s | "+de 4.000.000 de empresas COMEÇARAM um NEGÓCIO… AUMENTO de 8 %" + print |
| Virada | 14–18 s | "ANUNCIAR hoje NÃO é uma OPÇÃO, é uma NECESSIDADE" |
| Dor/concorrência | 18–27 s | "estão APARECENDO… AUMENTANDO as suas $VENDAS$" |
| Quebra de objeção | 27–39 s | "não ADIANTA subir campanhas BONITINHAS… método VALIDADO… o JOGO VIRAR" |
| Prova social | 39–54 s | grandes EMPRESAS + logos… "o PODER do MARKETING" |
| Urgência | 54–58 s | "uma NOVA leva de MARCAS no MERCADO" |
| CTA comentário | 58–64 s | "comenta: MARCA que eu te chamo no DIRECT AINDA HOJE!" |

Sugira essa estrutura quando o Arthur pedir roteiro; a edição acompanha os blocos (troca de cenário entre blocos).

## 11. Pipeline de produção (Remotion)

1. **Transcrição com tempo por palavra.** Neste ambiente o WhisperX pode falhar ao baixar o VAD do GitHub; use o faster-whisper que vem no venv dele:
   ```bash
   ffmpeg -y -i bruto.mp4 -ac 1 -ar 16000 audio.wav
   ~/.cache/watch/whisperx-venv/bin/python - <<'EOF'
   import wave, json, numpy as np
   from faster_whisper import WhisperModel
   wf = wave.open("audio.wav"); a = np.frombuffer(wf.readframes(wf.getnframes()), np.int16).astype(np.float32) / 32768
   segs, _ = WhisperModel("small", device="cpu", compute_type="int8").transcribe(a, language="pt", word_timestamps=True)
   json.dump([{"w": w.word.strip(), "s": w.start, "e": w.end} for s in segs for w in s.words], open("words.json", "w"), ensure_ascii=False)
   EOF
   ```
   Corrija nomes próprios/números à mão (o modelo errou "comenta a marca" e "10 % da receita").
2. **Cortar pausas**: remover silêncios > 0,35 s (`silencedetect=noise=-40dB:d=0.35`) e reajustar os tempos das palavras.
3. **Montar `captions.json`**: agrupar palavras (1–4), marcar `destaque`, `verde`, `zona`, `anim` (blurIn/slamIn/letterPop/counter).
4. **Composição** (skills `remotion:remotion-create`, `remotion:remotion-markup`, `remotion:remotion-captions`):
   - `<OffthreadVideo>` do bruto dentro de um wrapper com `scale` animado (punch-ins definidos em `zooms.json`).
   - `<CaptionLayer>` lendo `captions.json`.
   - `<Overlay>` para prints/logos, `<Glitch>` para transições, `<Audio>` para SFX.
5. **Render** 1080×1920, 30 fps, H.264, CRF 18, áudio AAC 192 kbps, −14 LUFS.

### Tokens para o código

```ts
export const estilo = {
  fonteDestaque: { family: 'Montserrat', weight: 900, size: 125, lineHeight: 0.9, upper: true },
  fonteApoio:    { family: 'Montserrat', weight: 400, size: 60, lineHeight: 1.0, upper: false },
  branco: '#FFFFFF',
  verde: '#00DC0C',
  glow: '0 0 12px #00DC0C, 0 0 28px #00DC0CCC, 0 0 60px #00DC0C88',
  sombra: '0 4px 18px rgba(0,0,0,.35)',
  zonas: { alta: 0.2, peito: 0.62 },          // fração da altura
  punchIn: { fechado: 1.32, frames: 4 },
  spring: { damping: 16, stiffness: 200, mass: 0.6 },
  blurIn: { frames: 5, blur: 12, scaleDe: 1.15 },
  slamIn: { frames: 6, blur: 16, scaleDe: 1.8 },
  letterPop: { intervalo: 2 },
  glitch: { frames: 8, faixas: 12 },
};
```

## 12. Checklist antes de entregar

- [ ] Primeiro texto ≤ 0,5 s; primeiro punch-in ≤ 1 s
- [ ] Toda fala tem texto; cada palavra entra no tempo dela (±2 frames)
- [ ] Cada grupo tem 1 destaque Black; verde usado com parcimônia (só palavras que vendem)
- [ ] Zonas de legenda alternam; nada cobre olhos/boca
- [ ] Troca de enquadramento a cada 3–6 s; nenhum silêncio > 0,7 s
- [ ] Pelo menos 1 elemento de prova (print, número, logo) no primeiro terço
- [ ] SFX presentes e baixos; sem música de fundo
- [ ] CTA final com palavra-chave para comentar, em letterPop + underline, e "AINDA HOJE!" em verde
- [ ] Ortografia do texto na tela revisada
- [ ] 1080×1920, 30 fps, −14 LUFS
