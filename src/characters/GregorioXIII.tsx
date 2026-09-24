import React from 'react';
import {C} from '../theme/palette';
import {Shaded} from '../components/svg';

// Gregorio XIII (Ugo Boncompagni, papa 1572-1585) in versione illustrata.
// Riferimenti iconografici: ritratti di Lavinia Fontana e Scipione Pulzone
// (mozzetta e camauro di velluto rosso bordati d'ermellino, rocchetto bianco,
// lunga barba bianca, naso aquilino). Luce calda da sinistra (candela),
// luce fredda di contorno da destra (finestra).

export type GregorioPose = {
  /** 0 = occhi aperti, 1 = chiusi */
  blink?: number;
  /** sollevamento sopracciglia in px */
  brow?: number;
  /** respiro: spostamento verticale del busto in px */
  breath?: number;
  /** rotazione del braccio col dito alzato (gradi) */
  fingerTilt?: number;
  /** 0 = sorriso leggero, 1 = bocca aperta (parla) */
  talk?: number;
};

const ERMINE_SPOTS = [
  [318, 1206], [372, 1222], [430, 1232], [490, 1238], [548, 1240], [606, 1238], [664, 1233], [722, 1223], [776, 1208],
];

const Ermine: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <path
    d={`M${x},${y - 7 * s} C${x + 4 * s},${y - 2 * s} ${x + 4 * s},${y + 5 * s} ${x},${y + 9 * s} C${x - 4 * s},${y + 5 * s} ${x - 4 * s},${y - 2 * s} ${x},${y - 7 * s} Z`}
    fill={C.inchiostro}
  />
);

export const GregorioXIII: React.FC<{pose?: GregorioPose}> = ({pose = {}}) => {
  const {blink = 0, brow = 0, breath = 0, fingerTilt = 0, talk = 0} = pose;
  const eyeScale = Math.max(0.08, 1 - blink);

  return (
    <g>
      {/* schienale della sedia in velluto rosso con pomoli dorati */}
      <g>
        <rect x={352} y={880} width={376} height={380} rx={34} fill={C.bordeaux700} />
        <rect x={352} y={880} width={376} height={380} rx={34} fill="none" stroke={C.ambra600} strokeWidth={10} />
        <rect x={372} y={900} width={336} height={340} rx={24} fill={C.bordeaux800} opacity={0.5} />
        <circle cx={362} cy={872} r={24} fill={C.ambra500} />
        <circle cx={718} cy={872} r={24} fill={C.ambra600} />
        <circle cx={355} cy={864} r={8} fill={C.ambra200} opacity={0.8} />
        <circle cx={711} cy={864} r={7} fill={C.ambra300} opacity={0.6} />
      </g>

      <g transform={`translate(0 ${breath})`}>
        {/* mozzetta rossa */}
        <Shaded
          id="mozzetta"
          d="M545,930 C470,930 410,945 375,970 C330,1000 305,1050 296,1110 L285,1215 C380,1245 460,1252 545,1252 C630,1252 710,1245 800,1215 L790,1110 C782,1050 758,1000 715,970 C680,945 620,930 545,930 Z"
          fill={C.bordeaux500}
          stroke={C.bordeaux800}
          shadows={[
            {d: 'M620,930 C700,940 760,990 790,1080 L805,1260 L610,1260 C650,1150 650,1030 620,930 Z', fill: C.bordeaux700, opacity: 0.95, blur: 'l'},
            {d: 'M720,960 C780,1000 800,1100 805,1240 L770,1240 C770,1120 760,1030 720,960 Z', fill: C.cobalto400, opacity: 0.45, blur: 'm'},
            {d: 'M330,1000 C360,975 400,960 430,958 C400,1000 380,1080 380,1200 L300,1200 C300,1100 310,1040 330,1000 Z', fill: C.bordeaux400, opacity: 0.8, blur: 'l'},
            {d: 'M470,1010 C480,1080 470,1160 455,1240', fill: 'none', opacity: 1},
          ]}
        >
          {/* pieghe */}
          <path d="M455,1060 C462,1110 458,1170 440,1235" stroke={C.bordeaux700} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.7} filter="url(#blur-s)" />
          <path d="M640,1060 C632,1110 640,1170 660,1235" stroke={C.bordeaux800} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.6} filter="url(#blur-s)" />
        </Shaded>
        {/* bottoni della mozzetta */}
        {[1080, 1116, 1152, 1188].map((y) => (
          <g key={y}>
            <circle cx={545} cy={y} r={7} fill={C.bordeaux800} />
            <circle cx={543} cy={y - 2} r={2.5} fill={C.bordeaux400} />
          </g>
        ))}
        {/* bordo d'ermellino */}
        <path
          d="M285,1215 C380,1245 460,1252 545,1252 C630,1252 710,1245 800,1215 L797,1186 C708,1216 630,1224 545,1224 C460,1224 382,1216 288,1186 Z"
          fill={C.avorio}
          stroke={C.pergamena400}
          strokeWidth={3}
        />
        <path d="M640,1220 C700,1218 760,1206 798,1192 L800,1215 C760,1230 700,1244 640,1248 Z" fill={C.cobalto300} opacity={0.35} />
        {ERMINE_SPOTS.map(([x, y]) => (
          <Ermine key={x} x={x} y={y - 4} s={1} />
        ))}

        {/* TESTA */}
        <g>
          {/* camauro: calotta di velluto rosso */}
          <Shaded
            id="camauro"
            d="M458,712 C446,642 490,602 545,600 C604,600 648,642 632,712 C588,698 502,698 458,712 Z"
            fill={C.bordeaux600}
            stroke={C.bordeaux800}
            shadows={[
              {d: 'M580,590 C640,600 670,650 650,720 L592,720 C610,670 602,625 580,590 Z', fill: C.bordeaux800, opacity: 0.9, blur: 'm'},
              {d: 'M478,626 C494,610 520,604 540,606 C512,620 496,642 490,672 Z', fill: C.bordeaux400, opacity: 0.9, blur: 'm'},
            ]}
          />
          {/* viso: allungato e asciutto, da uomo anziano */}
          <Shaded
            id="face"
            d="M462,716 C456,800 462,870 496,916 C518,944 566,944 590,916 C624,872 632,800 626,716 Z"
            fill={C.pelle}
            shadows={[
              {d: 'M594,716 C640,740 640,860 604,930 L650,930 L650,716 Z', fill: C.pelleOmbra, opacity: 0.95, blur: 'm'},
              {d: 'M462,712 L628,712 L628,744 C584,736 504,736 462,744 Z', fill: C.pelleOmbra, opacity: 0.7, blur: 'm'},
              {d: 'M464,790 C476,778 494,782 496,806 C492,834 476,850 464,846 Z', fill: C.pelleLuce, opacity: 0.8, blur: 'm'},
            ]}
          >
            <circle cx={478} cy={846} r={20} fill={C.guance} opacity={0.28} filter="url(#blur-s)" />
            <circle cx={598} cy={842} r={20} fill={C.guance} opacity={0.24} filter="url(#blur-s)" />
          </Shaded>
          {/* bordo d'ermellino del camauro, scende sulle orecchie */}
          <Shaded
            id="camauro-band"
            d="M440,852 C430,774 436,720 462,704 C506,688 588,688 628,702 C654,718 660,774 650,852 L630,852 C636,788 630,742 610,730 C572,716 514,716 482,730 C460,742 454,788 460,852 Z"
            fill={C.avorio}
            stroke={C.pergamena400}
            shadows={[{d: 'M622,690 C670,720 680,800 662,860 L626,860 Z', fill: C.cobalto300, opacity: 0.7, blur: 'm'}]}
          />
          <Ermine x={450} y={800} s={0.7} />
          <Ermine x={545} y={703} s={0.7} />
          <Ermine x={640} y={800} s={0.7} />

          {/* sopracciglia folte */}
          <g transform={`translate(0 ${-brow})`}>
            <path d="M458,778 C462,758 482,746 506,752 C516,754 522,760 522,766 C508,760 490,762 474,770 C466,774 460,780 458,778 Z" fill={C.avorio} stroke={C.pergamena400} strokeWidth={2.5} />
            <path d="M552,764 C558,748 580,740 602,744 C618,748 628,760 624,774 C614,764 598,758 584,758 C570,758 560,760 552,764 Z" fill={C.avorio} stroke={C.pergamena400} strokeWidth={2.5} />
          </g>
          {/* occhi */}
          <g transform={`translate(486 797) scale(1 ${eyeScale}) translate(-486 -797)`}>
            <ellipse cx={486} cy={797} rx={9} ry={12} fill={C.inchiostro} />
            <circle cx={483} cy={792} r={3.3} fill={C.bianco} />
          </g>
          <g transform={`translate(579 795) scale(1 ${eyeScale}) translate(-579 -795)`}>
            <ellipse cx={579} cy={795} rx={10.5} ry={13} fill={C.inchiostro} />
            <circle cx={575} cy={790} r={3.8} fill={C.bianco} />
          </g>
          {/* palpebre inferiori e rughe d'espressione */}
          <path d="M473,815 C481,821 494,821 501,813" stroke={C.pelleOmbra} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <path d="M564,813 C573,820 588,820 596,811" stroke={C.pelleOmbra} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <path d="M604,790 L614,784 M605,800 L616,800" stroke={C.pelleOmbra} strokeWidth={2.5} fill="none" strokeLinecap="round" />

          {/* barba lunga, a punta morbida */}
          <Shaded
            id="beard"
            d="M462,818 C472,852 490,874 512,884 L576,882 C600,872 616,852 626,816 C644,866 648,930 636,980 C626,1024 604,1056 584,1080 C574,1094 560,1106 546,1114 C538,1104 530,1104 520,1110 C504,1100 492,1086 486,1070 C468,1050 454,1020 450,982 C444,930 446,864 462,818 Z"
            fill={C.avorio}
            stroke={C.pergamena400}
            shadows={[
              {d: 'M596,860 C654,880 660,1000 600,1090 L680,1090 L680,850 Z', fill: C.cobalto300, opacity: 0.7, blur: 'm'},
              {d: 'M480,884 C510,904 580,904 612,884 C596,928 500,930 480,884 Z', fill: C.pergamena300, opacity: 0.85, blur: 'm'},
            ]}
          >
            <path d="M482,930 C488,974 498,1010 516,1046" stroke={C.pergamena300} strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M534,944 C532,990 536,1030 544,1080" stroke={C.pergamena300} strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M590,930 C592,972 588,1010 574,1050" stroke={C.pergamena300} strokeWidth={4} fill="none" strokeLinecap="round" />
            <path d="M462,900 C462,944 470,980 486,1016" stroke={C.pergamena300} strokeWidth={3} fill="none" strokeLinecap="round" />
            <path d="M620,900 C624,944 616,980 604,1014" stroke={C.pergamena300} strokeWidth={3} fill="none" strokeLinecap="round" />
          </Shaded>
          {/* bocca */}
          <path
            d={`M526,903 C536,${911 + talk * 13} 552,${911 + talk * 13} 562,902 C552,${907 + talk * 4} 536,${907 + talk * 4} 526,903 Z`}
            fill={C.bordeaux700}
            stroke={C.bordeaux800}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          {/* baffi spioventi */}
          <path
            d="M542,876 C518,868 492,874 474,898 C490,892 508,896 520,890 C530,886 538,884 544,886 C552,884 562,886 572,890 C586,896 604,894 616,900 C602,872 570,866 542,876 Z"
            fill={C.avorio}
            stroke={C.pergamena400}
            strokeWidth={2.5}
          />
          {/* naso aquilino (tratto distintivo nei ritratti) */}
          <Shaded
            id="nose"
            d="M531,786 C531,802 523,814 513,828 C503,843 495,858 500,870 C505,881 521,881 531,875 C541,881 555,877 557,865 C559,853 549,847 545,841 C541,825 541,806 541,788 Z"
            fill={C.pelle}
            shadows={[
              {d: 'M536,796 C546,826 566,846 556,884 L580,884 L580,790 Z', fill: '#C27C60', opacity: 0.95, blur: 's'},
              {d: 'M498,862 C510,874 526,874 540,866 L540,890 L498,890 Z', fill: '#C27C60', opacity: 0.8, blur: 's'},
              {d: 'M521,812 C512,830 504,846 505,860 C512,850 520,834 526,818 Z', fill: C.pelleLuce, opacity: 0.9, blur: 's'},
            ]}
          />
          <path d="M541,800 C542,822 546,838 554,848" stroke="#B87258" strokeWidth={3} fill="none" strokeLinecap="round" />
          <ellipse cx={510} cy={856} rx={6} ry={4} fill={C.pelleLuce} opacity={0.9} />
          <path d="M500,868 C506,881 521,881 531,875 C537,879 546,879 552,874" stroke="#B87258" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>

        {/* braccio destro alzato con l'indice: "attenzione!" */}
        <g transform={`rotate(${fingerTilt} 330 1160)`}>
          <Shaded
            id="arm-l"
            d="M292,1196 C284,1130 296,1076 314,1048 L378,1054 C376,1094 378,1146 368,1196 Z"
            fill={C.avorio}
            stroke={C.pergamena400}
            shadows={[{d: 'M350,1040 L392,1040 L392,1200 L356,1200 Z', fill: C.pergamena300, opacity: 0.9, blur: 's'}]}
          >
            <path d="M318,1100 C330,1120 334,1150 330,1190" stroke={C.pergamena300} strokeWidth={4} fill="none" strokeLinecap="round" />
          </Shaded>
          {/* mano */}
          <Shaded
            id="hand-l"
            d="M318,1034 C308,1016 310,992 322,980 C326,976 330,974 332,974 L331,926 C331,912 353,912 353,926 L354,972 C368,972 380,982 383,996 C387,1016 381,1034 368,1042 C352,1050 330,1048 318,1034 Z"
            fill={C.pelle}
            stroke={C.pelleOmbra}
            strokeWidth={2.5}
            shadows={[{d: 'M364,972 C392,992 390,1036 362,1050 L396,1050 L396,960 Z', fill: C.pelleOmbra, opacity: 0.9, blur: 's'}]}
          />
          <path d="M354,992 C362,990 372,994 379,1002" stroke={C.pelleOmbra} strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M354,1010 C362,1008 372,1012 380,1019" stroke={C.pelleOmbra} strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M340,946 C344,944 348,946 350,948" stroke={C.pelleOmbra} strokeWidth={2.5} fill="none" strokeLinecap="round" />
          {/* pollice ripiegato */}
          <path d="M316,1010 C326,1000 344,1002 356,1016 C348,1026 330,1028 318,1020 Z" fill={C.pelleLuce} stroke={C.pelleOmbra} strokeWidth={2.5} />
          {/* anello del pescatore */}
          <rect x={329} y={966} width={27} height={9} rx={4.5} fill={C.ambra500} />
          {/* polsino di pizzo */}
          <path
            d="M306,1056 C310,1040 318,1034 330,1038 C338,1030 350,1030 356,1040 C364,1034 376,1038 380,1050 C384,1062 376,1070 366,1068 C358,1076 346,1076 340,1068 C330,1076 318,1074 314,1066 C306,1068 302,1062 306,1056 Z"
            fill={C.bianco}
            stroke={C.pergamena400}
            strokeWidth={2.5}
          />
        </g>

        {/* avambraccio sinistro (a destra nell'immagine) che regge la bolla */}
        <Shaded
          id="arm-r"
          d="M786,1196 C782,1140 786,1070 796,1012 L846,1018 C850,1080 848,1140 842,1196 Z"
          fill={C.avorio}
          stroke={C.pergamena400}
          shadows={[{d: 'M826,1000 L870,1000 L870,1210 L830,1210 Z', fill: C.cobalto300, opacity: 0.6}]}
        />

        {/* la bolla Inter gravissimas, con il sigillo di piombo */}
        <g transform="rotate(4 690 1040)">
          <path d="M598,950 L792,950 L795,1130 L601,1130 Z" fill={C.pergamena100} stroke={C.pergamena400} strokeWidth={3} />
          <path d="M764,950 L792,950 L795,1130 L767,1130 Z" fill={C.pergamena300} opacity={0.5} />
          <rect x={590} y={936} width={212} height={26} rx={13} fill={C.pergamena200} stroke={C.pergamena400} strokeWidth={3} />
          <text x={694} y={1000} textAnchor="middle" fontFamily="EB Garamond" fontWeight={700} fontSize={31} fill={C.bordeaux600}>
            Inter
          </text>
          <text x={694} y={1032} textAnchor="middle" fontFamily="EB Garamond" fontWeight={700} fontSize={31} fill={C.bordeaux600}>
            gravissimas
          </text>
          {[1058, 1076, 1094, 1112].map((y, i) => (
            <rect key={y} x={620} y={y} width={i % 2 ? 132 : 148} height={5} rx={2.5} fill={C.pergamena400} opacity={0.75} />
          ))}
          {/* cordoncini di seta rossa e gialla */}
          <path d="M684,1130 C680,1144 678,1154 676,1164" stroke={C.bordeaux500} strokeWidth={4} fill="none" />
          <path d="M702,1130 C704,1144 702,1154 696,1164" stroke={C.ambra400} strokeWidth={4} fill="none" />
        </g>
        {/* bulla di piombo */}
        <g>
          <circle cx={680} cy={1180} r={21} fill="#8C93A3" stroke="#555C6B" strokeWidth={3} />
          <circle cx={675} cy={1175} r={8} fill="#B8BFCC" opacity={0.7} />
        </g>
        {/* mano che regge la bolla: dita davanti al bordo */}
        <g>
          <path d="M800,1010 L846,1016 L848,1034 L802,1030 Z" fill={C.bianco} stroke={C.pergamena400} strokeWidth={2.5} />
          <Shaded
            id="hand-r"
            d="M804,1012 C794,1002 790,980 792,960 C794,944 808,936 822,940 C838,944 846,960 846,980 C846,996 840,1010 830,1016 C822,1020 810,1018 804,1012 Z"
            fill={C.pelle}
            stroke={C.pelleOmbra}
            strokeWidth={2.5}
            shadows={[{d: 'M832,940 C856,960 856,1004 832,1020 L860,1020 L860,940 Z', fill: C.pelleOmbra, opacity: 0.9, blur: 's'}]}
          />
          <path d="M806,1006 C790,1006 778,996 778,982 L778,960 C778,944 790,934 806,934 L826,936 C840,938 846,950 846,966" fill="none" stroke="none" />
          <Shaded
            id="fingers-r"
            d="M780,958 C776,942 786,930 802,932 L822,934 C838,938 844,956 840,976 C836,996 824,1008 806,1008 L794,1006 C780,1004 774,990 778,976 Z"
            fill={C.pelle}
            stroke={C.pelleOmbra}
            strokeWidth={2.5}
            shadows={[{d: 'M820,930 C850,950 848,1004 818,1016 L860,1016 L860,930 Z', fill: C.pelleOmbra, opacity: 0.9, blur: 's'}]}
          />
          <path d="M779,956 C786,954 794,955 800,958 M778,974 C785,972 793,973 800,976 M780,991 C787,990 794,991 800,994" stroke={C.pelleOmbra} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
};
