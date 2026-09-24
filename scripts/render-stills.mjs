// Renderizza i fotogrammi di stile (PNG), le versioni con le aree dell'interfaccia
// di TikTok/Instagram sovrapposte e le brevi clip animate di anteprima (MP4).
// Uso: npm run stills
import {bundle} from '@remotion/bundler';
import {renderStill, renderMedia, selectComposition} from '@remotion/renderer';
import {mkdirSync} from 'node:fs';
import path from 'node:path';

const BROWSER =
  process.env.REMOTION_BROWSER ?? '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const OUT = 'anteprime';
mkdirSync(OUT, {recursive: true});

const JOBS = [
  {id: 'StyleFrame-Personaggio', name: '01-personaggio', stillFrame: 60},
  {id: 'StyleFrame-Infografica', name: '02-infografica', stillFrame: 120},
];

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});

for (const job of JOBS) {
  for (const safeZones of [false, true]) {
    const inputProps = {safeZones};
    const composition = await selectComposition({serveUrl, id: job.id, inputProps, browserExecutable: BROWSER});
    const file = path.join(OUT, `${job.name}${safeZones ? '-aree-interfaccia' : ''}.png`);
    await renderStill({composition, serveUrl, output: file, frame: job.stillFrame, inputProps, browserExecutable: BROWSER});
    console.log('PNG', file);
  }
  const composition = await selectComposition({serveUrl, id: job.id, inputProps: {safeZones: false}, browserExecutable: BROWSER});
  const clip = path.join(OUT, `${job.name}-animazione.mp4`);
  await renderMedia({
    composition,
    serveUrl,
    codec: 'h264',
    crf: 18,
    pixelFormat: 'yuv420p',
    outputLocation: clip,
    inputProps: {safeZones: false},
    browserExecutable: BROWSER,
    concurrency: 3,
  });
  console.log('MP4', clip);
}
