import React from 'react';
import {interpolate, Easing} from 'remotion';
import {C, FONT_SERIF} from '../theme/palette';

// Infografica: il foglio di calendario di ottobre 1582 (settimana che inizia di lunedì).
// Dati verificati: lunedì 1 ottobre 1582; a giovedì 4 seguì venerdì 15;
// i giorni dal 5 al 14 non esistettero nei Paesi che adottarono subito la riforma.
// La sequenza dei giorni della settimana non si interruppe.

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
// Griglia gregoriana finale: [colonna, riga, giorno]
const GRID: [number, number, number][] = [
  [0, 0, 1], [1, 0, 2], [2, 0, 3], [3, 0, 4], [4, 0, 15], [5, 0, 16], [6, 0, 17],
  ...[18, 19, 20, 21, 22, 23, 24].map((d, i) => [i, 1, d] as [number, number, number]),
  ...[25, 26, 27, 28, 29, 30, 31].map((d, i) => [i, 2, d] as [number, number, number]),
];
const SALTATI = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const SHEET = {x: 70, y: 240, w: 880, h: 710};
const COL0 = SHEET.x + 40;
const COLW = (SHEET.w - 80) / 7;
const ROW_Y = [590, 718, 846];
const cx = (col: number) => COL0 + COLW * (col + 0.5);

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

type Props = {
  /** tempo locale in frame (per le animazioni interne) */
  frame: number;
  /** frame da cui parte l'uscita dei 10 giorni */
  jumpAt?: number;
};

export const CalendarioOttobre1582: React.FC<Props> = ({frame, jumpAt = 20}) => {
  const t = frame - jumpAt;
  // anello e freccia del salto 4 -> 15
  const hop = interpolate(t, [18, 36], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const label = interpolate(t, [30, 42], [0, 1], clamp);

  return (
    <g>
      <defs>
        <linearGradient id="sheet-g" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor={C.pergamena100} />
          <stop offset="1" stopColor={C.pergamena200} />
        </linearGradient>
        <radialGradient id="sheet-edge" cx="0.5" cy="0.45" r="0.72">
          <stop offset="0.7" stopColor={C.pergamena400} stopOpacity={0} />
          <stop offset="1" stopColor={C.pergamena500} stopOpacity={0.55} />
        </radialGradient>
        <radialGradient id="warm-light" cx="0.85" cy="1" r="0.9">
          <stop offset="0" stopColor={C.ambra300} stopOpacity={0.35} />
          <stop offset="1" stopColor={C.ambra300} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* ombra del foglio */}
      <rect x={SHEET.x + 10} y={SHEET.y + 22} width={SHEET.w} height={SHEET.h} rx={10} fill={C.notte900} opacity={0.55} filter="url(#blur-l)" />
      {/* foglio di pergamena */}
      <path
        d={`M${SHEET.x},${SHEET.y + 6} C${SHEET.x + 200},${SHEET.y - 4} ${SHEET.x + 600},${SHEET.y + 8} ${SHEET.x + SHEET.w},${SHEET.y} L${SHEET.x + SHEET.w + 4},${SHEET.y + SHEET.h - 6} C${SHEET.x + 600},${SHEET.y + SHEET.h + 6} ${SHEET.x + 260},${SHEET.y + SHEET.h - 4} ${SHEET.x - 3},${SHEET.y + SHEET.h + 2} Z`}
        fill="url(#sheet-g)"
      />
      <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} fill="url(#sheet-edge)" />
      <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} fill="url(#warm-light)" />
      <rect x={SHEET.x + 22} y={SHEET.y + 22} width={SHEET.w - 44} height={SHEET.h - 44} rx={4} fill="none" stroke={C.bordeaux500} strokeWidth={3} opacity={0.55} />

      {/* intestazione */}
      <text x={540} y={SHEET.y + 128} textAnchor="middle" fontFamily={FONT_SERIF} fontWeight={700} fontSize={96} fill={C.bordeaux600} style={{fontVariantNumeric: 'lining-nums'}}>
        Ottobre 1582
      </text>
      <line x1={SHEET.x + 150} x2={SHEET.x + SHEET.w - 150} y1={SHEET.y + 162} y2={SHEET.y + 162} stroke={C.bordeaux500} strokeWidth={3} opacity={0.6} />
      {WEEKDAYS.map((d, i) => (
        <text key={d} x={cx(i)} y={466} textAnchor="middle" fontFamily={FONT_SERIF} fontWeight={600} fontSize={36} fill={i === 6 ? C.bordeaux500 : C.legno500}>
          {d}
        </text>
      ))}

      {/* evidenza: giovedì 4 e venerdì 15 sono giorni consecutivi */}
      <g opacity={hop}>
        <circle cx={cx(3)} cy={ROW_Y[0] - 2} r={50} fill={C.ambra400} opacity={0.35} />
        <circle cx={cx(3)} cy={ROW_Y[0] - 2} r={50} fill="none" stroke={C.ambra600} strokeWidth={5} />
        <circle cx={cx(4)} cy={ROW_Y[0] - 2} r={50} fill={C.ambra400} opacity={0.35} />
        <circle cx={cx(4)} cy={ROW_Y[0] - 2} r={50} fill="none" stroke={C.ambra600} strokeWidth={5} />
      </g>
      <path
        d={`M${cx(3) + 24},${ROW_Y[0] - 58} C${cx(3) + 44},${ROW_Y[0] - 92} ${cx(4) - 44},${ROW_Y[0] - 92} ${cx(4) - 24},${ROW_Y[0] - 58}`}
        fill="none"
        stroke={C.bordeaux500}
        strokeWidth={6}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - hop}
      />
      <path
        d={`M${cx(4) - 40},${ROW_Y[0] - 70} L${cx(4) - 23},${ROW_Y[0] - 56} L${cx(4) - 18},${ROW_Y[0] - 78}`}
        fill="none"
        stroke={C.bordeaux500}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={hop > 0.95 ? 1 : 0}
      />

      {/* giorni del calendario gregoriano.
          Prima del salto si vede solo la prima settimana (1-7, come nel calendario giuliano):
          le righe 18-24 e 25-31 compaiono solo dopo, per non mostrare mai una griglia inesatta. */}
      {GRID.map(([col, row, day]) => {
        const lateInRow = row === 0 && col >= 4;
        // 15, 16, 17 entrano da destra dopo l'uscita dei giorni saltati
        const slide = lateInRow ? interpolate(t, [4, 20], [1, 0], {...clamp, easing: Easing.out(Easing.cubic)}) : 0;
        const rowIn = row === 0 ? 1 : interpolate(t, [20 + row * 4, 32 + row * 4], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
        if (rowIn <= 0) return null;
        return (
          <text
            key={day}
            x={cx(col) + slide * 120}
            y={ROW_Y[row] + 22 + (1 - rowIn) * 16}
            textAnchor="middle"
            fontFamily={FONT_SERIF}
            fontWeight={700}
            fontSize={66}
            fill={col === 6 ? C.bordeaux600 : C.inchiostro}
            opacity={(1 - slide) * rowIn}
            style={{fontVariantNumeric: 'lining-nums'}}
          >
            {day}
          </text>
        );
      })}

      {/* i 10 giorni saltati: foglietti che volano fuori dal calendario */}
      <g opacity={label}>
        <text x={540} y={1036} textAnchor="middle" fontFamily={FONT_SERIF} fontWeight={700} fontSize={62} fill={C.ambra300} style={{fontVariantNumeric: 'lining-nums'}}>
          10 giorni saltati
        </text>
      </g>
      {SALTATI.map((d, i) => {
        const delay = i * 1.2;
        const p = interpolate(t, [delay, delay + 26], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
        const endX = 96 + i * 84 + 36;
        const endY = 1118 + 14 * Math.sin(i * 1.1);
        // partenza: la posizione che avrebbero avuto nella prima settimana (dal venerdì in poi)
        const startX = cx(4) + Math.min(i, 2) * COLW;
        const startY = ROW_Y[0];
        const x = interpolate(p, [0, 1], [startX, endX]);
        const y = interpolate(p, [0, 1], [startY, endY]) - Math.sin(p * Math.PI) * 60;
        const rot = interpolate(p, [0, 1], [0, (i % 2 ? 1 : -1) * (5 + (i % 3) * 3)]);
        const floatY = p >= 1 ? 4 * Math.sin((frame + i * 9) / 14) : 0;
        // 5, 6, 7 sono visibili nella prima settimana (calendario giuliano) prima del salto;
        // dall'8 al 14 compaiono solo mentre escono.
        const visibleBefore = i < 3;
        const opacity = visibleBefore ? interpolate(p, [0, 1], [1, 0.9]) : interpolate(p, [0, 0.2, 1], [0, 1, 0.9]);
        const scale = visibleBefore ? interpolate(p, [0, 0.4], [1.55, 1], clamp) : 1;
        // prima del salto il 7 è una domenica: stesso colore della colonna Dom
        const inkColor = visibleBefore && p < 0.3 ? (i === 2 ? C.bordeaux600 : C.inchiostro) : C.pergamena500;
        return (
          <g key={d} transform={`translate(${x} ${y + floatY}) rotate(${rot}) scale(${scale})`} opacity={opacity}>
            <path
              d="M-34,-44 L34,-44 L34,34 L26,42 L18,36 L10,44 L2,37 L-6,44 L-14,37 L-22,44 L-30,37 L-34,40 Z"
              fill={C.pergamena200}
              stroke={C.pergamena400}
              strokeWidth={2.5}
              opacity={visibleBefore ? interpolate(p, [0.1, 0.4], [0, 1], clamp) : 1}
            />
            <text x={0} y={14} textAnchor="middle" fontFamily={FONT_SERIF} fontWeight={700} fontSize={42} fill={inkColor} style={{fontVariantNumeric: 'lining-nums'}}>
              {d}
            </text>
            <line x1={-24} y1={-2} x2={24} y2={-2} stroke={C.bordeaux500} strokeWidth={4} opacity={interpolate(p, [0.6, 1], [0, 0.75], clamp)} strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
};
