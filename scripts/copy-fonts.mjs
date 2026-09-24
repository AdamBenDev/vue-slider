// Copia i font (EB Garamond, Montserrat) da @fontsource in public/fonts,
// così il render non dipende dalla rete.
import {copyFileSync, mkdirSync} from 'node:fs';
import {join} from 'node:path';

const out = 'public/fonts';
mkdirSync(out, {recursive: true});
const files = [
  ['eb-garamond', 'eb-garamond-latin-500-normal.woff2'],
  ['eb-garamond', 'eb-garamond-latin-600-normal.woff2'],
  ['eb-garamond', 'eb-garamond-latin-700-normal.woff2'],
  ['eb-garamond', 'eb-garamond-latin-800-normal.woff2'],
  ['montserrat', 'montserrat-latin-800-normal.woff2'],
  ['montserrat', 'montserrat-latin-900-normal.woff2'],
];
for (const [pkg, file] of files) {
  copyFileSync(join('node_modules/@fontsource', pkg, 'files', file), join(out, file));
}
console.log(`Copiati ${files.length} font in ${out}`);
