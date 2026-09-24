import React from 'react';
import {C} from '../theme/palette';

// Studio di Gregorio XIII di notte (Frascati, 1582): finestra ad arco sui Colli Albani,
// tenda, scaffale, scrivania con candela, libri e sfera armillare.
// I livelli sono separati (sfondo / scrivania) per costruire la profondità.

type Props = {frame: number};

const WIN = 'M300,1190 L300,690 A240,240 0 0 1 780,690 L780,1190 Z';

const Star: React.FC<{x: number; y: number; r: number; o: number}> = ({x, y, r, o}) => (
  <path
    d={`M${x},${y - r} Q${x + r * 0.18},${y - r * 0.18} ${x + r},${y} Q${x + r * 0.18},${y + r * 0.18} ${x},${y + r} Q${x - r * 0.18},${y + r * 0.18} ${x - r},${y} Q${x - r * 0.18},${y - r * 0.18} ${x},${y - r} Z`}
    fill={C.avorio}
    opacity={o}
  />
);

export const StudioSfondo: React.FC<Props> = ({frame}) => {
  const tw = (seed: number) => 0.55 + 0.45 * Math.sin(frame / 11 + seed * 1.7);
  return (
    <g>
      <defs>
        <linearGradient id="wall-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.notte800} />
          <stop offset="0.55" stopColor={C.notte700} />
          <stop offset="1" stopColor={C.notte800} />
        </linearGradient>
        <linearGradient id="sky-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.notte900} />
          <stop offset="0.55" stopColor={C.cobalto700} />
          <stop offset="0.8" stopColor={C.cobalto500} />
          <stop offset="1" stopColor={C.turchese600} />
        </linearGradient>
        <radialGradient id="moon-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.cobalto300} stopOpacity={0.55} />
          <stop offset="1" stopColor={C.cobalto300} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="curtain-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.bordeaux700} />
          <stop offset="0.18" stopColor={C.bordeaux500} />
          <stop offset="0.36" stopColor={C.bordeaux700} />
          <stop offset="0.55" stopColor={C.bordeaux400} />
          <stop offset="0.75" stopColor={C.bordeaux600} />
          <stop offset="1" stopColor={C.bordeaux800} />
        </linearGradient>
        <clipPath id="win-clip">
          <path d={WIN} />
        </clipPath>
      </defs>

      {/* parete */}
      <rect width={1080} height={1920} fill="url(#wall-g)" />
      {/* cornice alta della stanza e pannelli */}
      <rect x={0} y={180} width={1080} height={26} fill={C.notte600} />
      <rect x={0} y={206} width={1080} height={10} fill={C.notte900} opacity={0.6} />

      {/* cielo nella finestra */}
      <g clipPath="url(#win-clip)">
        <rect x={300} y={440} width={480} height={760} fill="url(#sky-g)" />
        <circle cx={660} cy={575} r={120} fill="url(#moon-glow)" />
        {/* luna crescente */}
        <mask id="moon-mask">
          <rect x={560} y={470} width={200} height={200} fill="white" />
          <circle cx={684} cy={562} r={42} fill="black" />
        </mask>
        <circle cx={660} cy={576} r={46} fill={C.avorio} mask="url(#moon-mask)" />
        <Star x={400} y={560} r={9} o={tw(1)} />
        <Star x={470} y={505} r={6} o={tw(2)} />
        <Star x={560} y={470} r={7} o={tw(3)} />
        <Star x={735} y={690} r={6} o={tw(4)} />
        <Star x={360} y={680} r={5} o={tw(5)} />
        <Star x={600} y={610} r={4} o={tw(6)} />
        <Star x={455} y={640} r={4} o={tw(7)} />
        {/* colli lontani */}
        <path d="M300,985 C360,950 420,930 480,945 C540,960 580,925 640,915 C700,905 745,930 780,950 L780,1200 L300,1200 Z" fill={C.cobalto600} opacity={0.85} />
        <path d="M300,1035 C350,1010 410,1000 470,1015 C520,1028 570,1000 630,995 C690,990 740,1010 780,1025 L780,1200 L300,1200 Z" fill={C.notte600} />
        {/* piccolo borgo sul colle, finestre accese */}
        <g fill={C.notte700}>
          <rect x={672} y={968} width={34} height={34} />
          <path d="M668,970 L689,952 L710,970 Z" />
          <rect x={712} y={978} width={26} height={26} />
          <path d="M708,980 L725,966 L742,980 Z" />
          <rect x={650} y={982} width={22} height={22} />
          <rect x={690} y={930} width={10} height={40} />
        </g>
        <rect x={680} y={980} width={6} height={8} fill={C.ambra400} />
        <rect x={694} y={986} width={6} height={8} fill={C.ambra400} opacity={0.8} />
        <rect x={721} y={988} width={6} height={8} fill={C.ambra400} />
        {/* cipressi */}
        <g fill={C.notte800}>
          <path d="M338,1060 C326,1010 334,960 345,930 C356,960 364,1010 352,1060 Z" />
          <path d="M366,1062 C356,1020 362,985 371,962 C380,985 386,1020 376,1062 Z" />
          <path d="M748,1060 C738,1016 744,978 753,952 C762,978 768,1016 758,1060 Z" />
        </g>
      </g>

      {/* strombo della finestra (spessore del muro) e cornice in pietra */}
      <path d={WIN} fill="none" stroke={C.notte900} strokeWidth={16} opacity={0.5} />
      <path d="M268,1200 L268,690 A272,272 0 0 1 812,690 L812,1200" fill="none" stroke={C.pergamena500} strokeWidth={30} opacity={0.9} />
      <path d="M268,1200 L268,690 A272,272 0 0 1 812,690 L812,1200" fill="none" stroke={C.cobalto300} strokeWidth={30} opacity={0.18} />
      <path d="M285,1200 L285,690 A255,255 0 0 1 795,690 L795,1200" fill="none" stroke={C.notte900} strokeWidth={4} opacity={0.5} />
      <path d="M252,1200 L252,690 A288,288 0 0 1 828,690 L828,1200" fill="none" stroke={C.notte900} strokeWidth={4} opacity={0.4} />
      {/* chiave d'arco */}
      <path d="M520,404 L560,404 L553,436 L527,436 Z" fill={C.pergamena400} />

      {/* tenda bordeaux a sinistra */}
      <path d="M150,440 C200,440 290,440 340,440 C330,600 300,740 312,860 C318,930 300,980 330,1240 L190,1240 C205,1060 212,960 205,880 C190,720 170,600 150,440 Z" fill="url(#curtain-g)" />
      <path d="M206,880 C230,870 290,868 314,862" stroke={C.ambra500} strokeWidth={10} strokeLinecap="round" fill="none" />
      <circle cx={318} cy={862} r={12} fill={C.ambra400} />
      <rect x={120} y={426} width={260} height={18} rx={9} fill={C.ambra600} />
      <circle cx={122} cy={435} r={14} fill={C.ambra500} />
      <circle cx={378} cy={435} r={14} fill={C.ambra500} />

      {/* mensola con libri a destra */}
      <rect x={846} y={860} width={234} height={16} fill={C.legno600} />
      <rect x={846} y={876} width={234} height={8} fill={C.legno800} />
      <g>
        <rect x={866} y={750} width={30} height={110} rx={3} fill={C.cobalto600} />
        <rect x={898} y={770} width={24} height={90} rx={3} fill={C.bordeaux600} />
        <rect x={924} y={740} width={34} height={120} rx={3} fill={C.pergamena400} />
        <rect x={960} y={780} width={22} height={80} rx={3} fill={C.turchese600} />
        <path d="M986,860 L1030,772 L1052,782 L1010,860 Z" fill={C.bordeaux700} />
        <rect x={870} y={770} width={22} height={5} fill={C.ambra400} opacity={0.8} />
        <rect x={870} y={835} width={22} height={5} fill={C.ambra400} opacity={0.8} />
        <rect x={928} y={760} width={26} height={5} fill={C.bordeaux600} opacity={0.8} />
      </g>
    </g>
  );
};

// Primo piano: scrivania coperta da un panno di velluto blu, candela, libri,
// calamaio con penna d'oca, sfera armillare.
export const DESK_Y = 1190;

export const StudioPrimoPiano: React.FC<Props & {candleX?: number; props?: boolean; deskY?: number}> = ({
  frame,
  candleX = 150,
  props = true,
  deskY = DESK_Y,
}) => {
  const flick = 1 + 0.06 * Math.sin(frame / 2.3) + 0.04 * Math.sin(frame / 1.3 + 1);
  const cx = candleX;
  const y0 = deskY;
  const folds = [40, 150, 270, 400, 520, 640, 760, 880, 1000];
  return (
    <g>
      <defs>
        <linearGradient id="cloth-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.notte600} />
          <stop offset="1" stopColor={C.cobalto700} />
        </linearGradient>
        <linearGradient id="cloth-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.cobalto700} />
          <stop offset="0.55" stopColor={C.notte600} />
          <stop offset="1" stopColor={C.notte700} />
        </linearGradient>
        <linearGradient id="floor-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.notte800} />
          <stop offset="1" stopColor={C.notte900} />
        </linearGradient>
        <radialGradient id="candle-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.ambra300} stopOpacity={0.6} />
          <stop offset="0.35" stopColor={C.ambra500} stopOpacity={0.22} />
          <stop offset="1" stopColor={C.ambra500} stopOpacity={0} />
        </radialGradient>
        <radialGradient id="flame-g" cx="0.5" cy="0.7" r="0.6">
          <stop offset="0" stopColor={C.avorio} />
          <stop offset="0.5" stopColor={C.ambra300} />
          <stop offset="1" stopColor={C.ambra500} />
        </radialGradient>
      </defs>

      {/* pavimento */}
      <rect x={0} y={1680} width={1080} height={240} fill="url(#floor-g)" />
      {/* panno: piano */}
      <rect x={0} y={y0} width={1080} height={74} fill="url(#cloth-top)" />
      <rect x={0} y={y0} width={1080} height={5} fill={C.cobalto400} opacity={0.5} />
      {/* panno: parte che ricade, con pieghe morbide */}
      <path d={`M0,${y0 + 70} L1080,${y0 + 70} L1080,1690 C940,1704 820,1686 700,1700 C580,1712 470,1688 350,1702 C230,1714 110,1690 0,1704 Z`} fill="url(#cloth-front)" />
      <clipPath id="cloth-clip">
        <path d={`M0,${y0 + 70} L1080,${y0 + 70} L1080,1690 C940,1704 820,1686 700,1700 C580,1712 470,1688 350,1702 C230,1714 110,1690 0,1704 Z`} />
      </clipPath>
      <g clipPath="url(#cloth-clip)">
        {folds.map((x, i) => (
          <rect key={x} x={x} y={y0 + 60} width={i % 2 ? 46 : 64} height={520} fill={i % 2 ? C.cobalto500 : C.notte700} opacity={i % 2 ? 0.28 : 0.5} filter="url(#blur-m)" />
        ))}
        <rect x={0} y={y0 + 66} width={1080} height={26} fill={C.notte800} opacity={0.35} filter="url(#blur-s)" />
      </g>
      {/* bordo ricamato e frangia dorata */}
      <path d="M0,1660 C110,1646 230,1670 350,1658 C470,1644 580,1668 700,1656 C820,1642 940,1660 1080,1646" stroke={C.ambra500} strokeWidth={10} fill="none" />
      <path d="M0,1678 C110,1664 230,1688 350,1676 C470,1662 580,1686 700,1674 C820,1660 940,1678 1080,1664" stroke={C.ambra600} strokeWidth={4} fill="none" />
      <g stroke={C.ambra500} strokeWidth={4} strokeLinecap="round">
        {Array.from({length: 54}, (_, i) => {
          const x = 10 + i * 20;
          const yb = 1692 + 8 * Math.sin(i * 0.55);
          return <line key={i} x1={x} y1={yb - 4} x2={x + 1} y2={yb + 22} />;
        })}
      </g>

      {props ? (
        <>
          {/* libri impilati a destra */}
          <g transform={`translate(0 ${y0 - 1228})`}>
            <rect x={790} y={1196} width={250} height={36} rx={6} fill={C.bordeaux600} />
            <rect x={790} y={1196} width={250} height={8} rx={4} fill={C.bordeaux400} opacity={0.6} />
            <rect x={1010} y={1200} width={22} height={28} fill={C.pergamena200} />
            <rect x={805} y={1164} width={220} height={34} rx={6} fill={C.cobalto500} />
            <rect x={805} y={1164} width={220} height={7} rx={4} fill={C.cobalto400} opacity={0.6} />
            <rect x={998} y={1168} width={20} height={26} fill={C.pergamena200} />
            <rect x={840} y={1172} width={10} height={24} fill={C.ambra400} />
            <rect x={870} y={1172} width={10} height={24} fill={C.ambra400} />
          </g>

          {/* sfera armillare (ottone e anello dello zodiaco turchese) */}
          <g transform={`translate(905 ${y0 - 198})`}>
            <path d="M-36,132 L36,132 L22,118 L-22,118 Z" fill={C.ambra600} />
            <rect x={-6} y={70} width={12} height={50} fill={C.ambra600} />
            <g transform={`rotate(${(frame * 0.35) % 360} 0 0)`}>
              <ellipse cx={0} cy={0} rx={78} ry={78} fill="none" stroke={C.ambra500} strokeWidth={7} />
              <ellipse cx={0} cy={0} rx={78} ry={24} fill="none" stroke={C.ambra400} strokeWidth={6} />
              <ellipse cx={0} cy={0} rx={24} ry={78} fill="none" stroke={C.ambra600} strokeWidth={5} />
            </g>
            <ellipse cx={0} cy={0} rx={82} ry={30} transform="rotate(-23)" fill="none" stroke={C.turchese400} strokeWidth={9} />
            <circle cx={0} cy={0} r={13} fill={C.ambra300} />
          </g>

          {/* calamaio e penna d'oca */}
          <g>
            <path d={`M232,${y0 + 6} C230,${y0 - 14} 236,${y0 - 30} 262,${y0 - 30} C288,${y0 - 30} 294,${y0 - 14} 292,${y0 + 6} Z`} fill={C.notte600} />
            <rect x={246} y={y0 - 40} width={32} height={12} rx={4} fill={C.ambra600} />
            <path d={`M256,${y0 - 34} C246,${y0 - 90} 226,${y0 - 150} 196,${y0 - 196} C214,${y0 - 170} 236,${y0 - 150} 244,${y0 - 118} C252,${y0 - 150} 244,${y0 - 184} 214,${y0 - 214} C246,${y0 - 190} 262,${y0 - 140} 262,${y0 - 34} Z`} fill={C.avorio} />
            <path d={`M259,${y0 - 34} C252,${y0 - 100} 232,${y0 - 160} 205,${y0 - 205}`} stroke={C.pergamena400} strokeWidth={3} fill="none" />
            <ellipse cx={262} cy={y0 + 6} rx={34} ry={6} fill={C.notte900} opacity={0.4} />
          </g>
        </>
      ) : null}

      {/* candela */}
      <circle cx={cx} cy={y0 - 214} r={430 * flick} fill="url(#candle-glow)" />
      <g transform={`translate(0 ${y0 - 1228})`}>
        <ellipse cx={cx} cy={1236} rx={62} ry={14} fill={C.ambra600} />
        <path d={`M${cx - 58},1232 C${cx - 50},1210 ${cx + 50},1210 ${cx + 58},1232 Z`} fill={C.ambra500} />
        <rect x={cx - 9} y={1150} width={18} height={70} fill={C.ambra600} />
        <ellipse cx={cx} cy={1150} rx={36} ry={9} fill={C.ambra500} />
        <rect x={cx - 17} y={1045} width={34} height={105} rx={4} fill={C.avorio} />
        <rect x={cx + 4} y={1045} width={13} height={105} fill={C.pergamena300} opacity={0.7} />
        <path d={`M${cx - 17},1052 C${cx - 10},1060 ${cx - 12},1080 ${cx - 6},1088 C${cx - 2},1076 ${cx + 2},1060 ${cx + 17},1052 Z`} fill={C.avorio} />
        <rect x={cx - 1.5} y={1030} width={3} height={16} fill={C.inchiostro} />
        <g transform={`translate(${cx} 1036) scale(1 ${flick})`}>
          <path d="M0,-58 C10,-40 17,-22 13,-6 C10,6 -10,6 -13,-6 C-17,-22 -8,-40 0,-58 Z" fill="url(#flame-g)" />
          <ellipse cx={0} cy={-8} rx={5} ry={9} fill={C.cobalto300} opacity={0.6} />
        </g>
      </g>
    </g>
  );
};
