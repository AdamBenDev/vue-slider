# Video storici 9:16

Video storici divulgativi verticali (1080×1920) per Instagram Reels e TikTok, in animazione illustrata 2D.

Primo progetto: **«I 10 giorni che non sono mai esistiti»**, sulla riforma del calendario gregoriano (1582).

## Stato

Fase 1: approvazione dello stile. La cartella [`anteprime/`](anteprime) contiene:

| File | Contenuto |
|---|---|
| `01-personaggio.png` | Fotogramma di stile con personaggio: Gregorio XIII con la bolla *Inter gravissimas* |
| `02-infografica.png` | Fotogramma di stile con infografica: il calendario di ottobre 1582 |
| `*-aree-interfaccia.png` | Gli stessi fotogrammi con in rosso le aree coperte dall'interfaccia di TikTok e Instagram |
| `*-animazione.mp4` | Clip di 5-6 s per giudicare il movimento |

Il video completo si produce dopo l'approvazione. La bozza è in [`docs/storyboard.md`](docs/storyboard.md), i fatti con le fonti in [`docs/fatti-verificati.md`](docs/fatti-verificati.md).

## Strumenti scelti e perché

| Esigenza | Strumento | Motivo |
|---|---|---|
| Animazione e montaggio | [Remotion](https://www.remotion.dev) 4 (React + TypeScript) | Ogni fotogramma è calcolato dal codice. Il risultato è deterministico: stessi personaggi, stessi ambienti, stessa sincronizzazione a ogni esportazione. |
| Illustrazione | SVG vettoriale disegnato a mano, con ombre morbide (clip + sfocatura) | Forme morbide e volumi semplici. I personaggi sono componenti riutilizzabili con pose ed espressioni. |
| Testi e numeri | Testo vero (font), non immagini generate | Date, lettere e accenti restano corretti e fermi. I generatori video AI tendono a deformare le scritte e a cambiare i personaggi tra una scena e l'altra. |
| Tipografia | EB Garamond (titoli, infografiche), Montserrat ExtraBold (sottotitoli) | EB Garamond è un revival dei caratteri di Claude Garamond, cioè del Cinquecento. I font sono inclusi in `public/fonts`, senza dipendere dalla rete. |
| Esportazione | Remotion + FFmpeg, H.264, yuv420p, 30 fps | Formato accettato da Instagram e TikTok. |
| Controllo qualità | `scripts/check-output.mjs`: ffprobe + OCR Tesseract (ita) + confronto dei pixel | Verifica il formato, la correttezza di ogni scritta (i numeri del calendario cella per cella) e che le scritte non cambino tra un fotogramma e l'altro. |

Voce narrante (fase 2, da decidere):

- **Consigliato:** ElevenLabs (voce italiana di qualità alta). Serve una chiave API e l'accesso di rete ad `api.elevenlabs.io`. Fornisce anche i tempi di ogni parola per sincronizzare i sottotitoli.
- **Alternativa:** una voce registrata da te, allineata con Whisper.
- **Gratuita e offline:** Piper, con qualità inferiore.

## Uso

```bash
npm install
npm run fonts      # copia i font in public/fonts (già inclusi nel repository)
npm run studio     # anteprima interattiva nel browser
npm run stills     # rigenera anteprime/ (PNG + MP4)
npm run check      # controlla formato e scritte delle clip esportate
npm run typecheck
```

Servono Node 22+, FFmpeg e `tesseract-ocr` + `tesseract-ocr-ita` (solo per `check`).
Il browser è configurato in `remotion.config.ts`; la variabile `REMOTION_BROWSER` lo sovrascrive.

## Struttura

```
src/
  theme/          palette comune e font
  components/     sottotitoli, titoli, grana, aree di sicurezza, helper SVG
  characters/     personaggi (Gregorio XIII)
  scenes/         ambienti (studio notturno: sfondo e primo piano separati)
  infographics/   infografiche (calendario di ottobre 1582)
  style-frames/   composizioni dei fotogrammi di stile
scripts/          rendering delle anteprime e controlli
docs/             fatti verificati e storyboard
anteprime/        file da approvare
```

## Regole di stile

- **Palette:** blu cobalto e blu notte, avorio e pergamena, bordeaux, ambra calda, accenti turchesi. È definita in `src/theme/palette.ts`.
- **Area di sicurezza:** contenuti importanti in x 60-940 e y 220-1290. Sottotitoli in y 1300-1480. In basso (y > 1500) e a destra (x > 950) c'è l'interfaccia delle piattaforme.
- **Testi:** pochi, grandi, in italiano. Niente loghi inventati, lettere isolate, badge o diciture tipo "ricostruzione animata".
- **Infografiche:** ogni elemento spiega un concetto. Nessun grafico che suggerisca informazioni inesatte.
