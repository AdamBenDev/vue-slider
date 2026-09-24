// Controllo automatico dei file esportati:
// 1. formato (1080x1920, 30 fps, H.264, yuv420p, durata attesa);
// 2. stabilità e correttezza delle scritte: OCR (Tesseract, italiano) su più fotogrammi
//    della clip, per ogni scritta prevista, dopo il suo ingresso.
// Uso: npm run check   (richiede ffmpeg, ffprobe e tesseract-ocr con lingua ita)
import {execFileSync} from 'node:child_process';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';

// Griglia dell'infografica (vedi src/infographics/CalendarioOttobre1582.tsx)
const COLS = [0, 1, 2, 3, 4, 5, 6].map((c) => 110 + (800 / 7) * (c + 0.5));
const ROWS = [590, 718, 846];
const WEEK = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const cells = (row, days, from) =>
  days.map((d, c) => ({
    expect: String(d),
    label: `${WEEK[c]} ${d}`,
    crop: [Math.round(COLS[c] - 38), ROWS[row] - 34, 76, 68],
    from,
    digits: true,
  }));

const CLIPS = [
  {
    file: 'anteprime/01-personaggio-animazione.mp4',
    duration: 5,
    texts: [
      {expect: 'PAPA GREGORIO XIII', crop: [100, 230, 880, 70], from: 0.6},
      {expect: '24 febbraio 1582', crop: [100, 295, 880, 100], from: 0.6},
      {expect: 'Il papa cambia il calendario', crop: [60, 1290, 960, 190], from: 0.4},
    ],
  },
  {
    file: 'anteprime/02-infografica-animazione.mp4',
    duration: 6,
    texts: [
      {expect: 'Ottobre 1582', crop: [150, 280, 780, 120], from: 0},
      {expect: 'Lun Mar Mer Gio Ven Sab Dom', crop: [90, 420, 840, 70], from: 0},
      // numeri controllati cella per cella: verifica anche la colonna (giorno della settimana)
      ...cells(0, [1, 2, 3, 4, 15, 16, 17], 2.2),
      ...cells(1, [18, 19, 20, 21, 22, 23, 24], 2.6),
      ...cells(2, [25, 26, 27, 28, 29, 30, 31], 2.8),
      {expect: '10 giorni saltati', crop: [200, 975, 680, 85], from: 2.4},
      {expect: 'Dopo giovedì 4 venne venerdì 15', crop: [60, 1290, 960, 190], from: 0.4},
    ],
  },
];

const norm = (s) => s.replace(/[^0-9A-Za-zÀ-ÿ ]/g, '').replace(/\s+/g, ' ').trim();
const tmp = mkdtempSync(path.join(tmpdir(), 'check-'));
let failures = 0;

for (const clip of CLIPS) {
  const probe = JSON.parse(
    execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,pix_fmt:format=duration', '-of', 'json', clip.file]).toString(),
  );
  const s = probe.streams[0];
  const dur = Number(probe.format.duration);
  const fmtOk = s.codec_name === 'h264' && s.width === 1080 && s.height === 1920 && s.r_frame_rate === '30/1' && /yuv(j)?420p/.test(s.pix_fmt) && Math.abs(dur - clip.duration) < 0.05;
  console.log(`\n${clip.file}\n  formato: ${s.codec_name} ${s.width}x${s.height} ${s.r_frame_rate} ${s.pix_fmt} ${dur.toFixed(2)}s -> ${fmtOk ? 'OK' : 'ERRORE'}`);
  if (!fmtOk) failures++;

  for (const t of clip.texts) {
    const times = [];
    for (let x = t.from; x < clip.duration - 0.05; x += 0.5) times.push(Number(x.toFixed(2)));
    const [x, y, w, h] = t.crop;
    let ok = 0;
    let maxDiff = 0;
    let prev = null;
    const seen = new Set();
    for (const time of times) {
      // stabilità: la scritta non deve cambiare tra un campione e l'altro (differenza media in pixel)
      const raw = execFileSync('ffmpeg', ['-loglevel', 'error', '-ss', String(time), '-i', clip.file, '-frames:v', '1', '-vf', `crop=${w}:${h}:${x}:${y}`, '-f', 'rawvideo', '-pix_fmt', 'gray', '-']);
      if (prev) {
        let sum = 0;
        for (let i = 0; i < raw.length; i++) sum += Math.abs(raw[i] - prev[i]);
        maxDiff = Math.max(maxDiff, sum / raw.length);
      }
      prev = raw;
      // correttezza: OCR; per i numeri più letture con preprocessing diversi, maggioranza
      const variants = t.digits ? [[4, 'ita'], [4, 'eng'], [2, 'eng']] : [[2, 'ita']];
      let votes = 0;
      for (const [scale, lang] of variants) {
        const png = path.join(tmp, 'f.png');
        execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', String(time), '-i', clip.file, '-frames:v', '1', '-vf', `crop=${w}:${h}:${x}:${y},format=gray,scale=iw*${scale}:ih*${scale}:flags=lanczos,pad=iw+80:ih+80:40:40:color=white`, png]);
        const psm = t.expect.length === 1 ? '10' : '7'; // una sola cifra: modalità carattere singolo
        const args = t.digits ? ['--psm', psm, '-c', 'tessedit_char_whitelist=0123456789'] : ['--psm', '6'];
        const text = norm(execFileSync('tesseract', [png, '-', '-l', lang, ...args], {stdio: ['ignore', 'pipe', 'ignore']}).toString());
        seen.add(text);
        if (text.toLowerCase().replace(/ /g, '') === t.expect.toLowerCase().replace(/ /g, '')) votes++;
      }
      if (votes * 2 > variants.length) ok++;
    }
    const stable = maxDiff < 2;
    const pass = ok === times.length && stable;
    if (!pass) failures++;
    console.log(
      `  "${t.label ?? t.expect}": OCR ${ok}/${times.length}, variazione ${maxDiff.toFixed(2)} ${pass ? 'OK' : 'ERRORE -> letto: ' + [...seen].join(' | ')}`,
    );
  }
}
rmSync(tmp, {recursive: true, force: true});
console.log(failures ? `\n${failures} controlli falliti` : '\nTutti i controlli superati');
process.exit(failures ? 1 : 0);
