import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// EB Garamond: revival dei caratteri di Claude Garamond (1500-1561),
// coerente con l'epoca della riforma del calendario. Montserrat per i sottotitoli.
const FONTS = [
  {family: 'EB Garamond', weight: '500', file: 'eb-garamond-latin-500-normal.woff2'},
  {family: 'EB Garamond', weight: '600', file: 'eb-garamond-latin-600-normal.woff2'},
  {family: 'EB Garamond', weight: '700', file: 'eb-garamond-latin-700-normal.woff2'},
  {family: 'EB Garamond', weight: '800', file: 'eb-garamond-latin-800-normal.woff2'},
  {family: 'Montserrat', weight: '800', file: 'montserrat-latin-800-normal.woff2'},
  {family: 'Montserrat', weight: '900', file: 'montserrat-latin-900-normal.woff2'},
];

let started = false;
export const loadAllFonts = () => {
  if (started) return;
  started = true;
  for (const f of FONTS) {
    loadFont({family: f.family, weight: f.weight, url: staticFile(`fonts/${f.file}`)});
  }
};
