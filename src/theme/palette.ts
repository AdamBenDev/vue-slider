// Palette comune a tutte le scene. Ogni colore ha un ruolo preciso:
// blu (notte, cobalto) per ambienti e ombre, avorio/pergamena per carta e luci,
// bordeaux per tessuti e accenti forti, ambra per la luce calda, turchese per i dettagli.
export const C = {
  notte900: '#0B1428',
  notte800: '#101C38',
  notte700: '#172848',
  notte600: '#1E335C',
  cobalto700: '#1B3F86',
  cobalto600: '#2350A6',
  cobalto500: '#2F63C2',
  cobalto400: '#4A7FD6',
  cobalto300: '#7EA6E6',

  avorio: '#F7F0E1',
  pergamena100: '#F1E4C6',
  pergamena200: '#E8D5AC',
  pergamena300: '#D9BF8C',
  pergamena400: '#C3A06A',
  pergamena500: '#9E7C4C',

  bordeaux800: '#4A0F1B',
  bordeaux700: '#62172A',
  bordeaux600: '#7D1F33',
  bordeaux500: '#9A2B41',
  bordeaux400: '#B84459',

  ambra600: '#C77A1E',
  ambra500: '#E39A33',
  ambra400: '#F2B652',
  ambra300: '#FFD27E',
  ambra200: '#FFE6B0',

  turchese600: '#15857E',
  turchese500: '#23A89D',
  turchese400: '#43C7B8',
  turchese300: '#86E0D3',

  inchiostro: '#2B1D18',
  legno800: '#3A1E17',
  legno700: '#51291D',
  legno600: '#6B3825',
  legno500: '#8A4B2F',

  pelle: '#F2C6A2',
  pelleOmbra: '#D9997A',
  pelleLuce: '#FFE0C4',
  guance: '#E88C82',

  bianco: '#FFFFFF',
} as const;

export const FONT_SERIF = '"EB Garamond", Garamond, serif';
export const FONT_SANS = '"Montserrat", Arial, sans-serif';

export const VIDEO = {width: 1080, height: 1920, fps: 30} as const;
