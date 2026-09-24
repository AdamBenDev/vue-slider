import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {FONT_SANS} from '../theme/palette';

// Sottotitoli: bianco, sans serif grassetto, bordo scuro, poche parole per volta.
// La fascia verticale (y 1290-1480) resta sopra l'area occupata da didascalie
// e pulsanti di TikTok/Instagram.
export const SUB_TOP = 1300;

type Props = {
  text: string;
  /** frame di ingresso relativo alla Sequence */
  from?: number;
};

export const Subtitle: React.FC<Props> = ({text, from = 0}) => {
  const frame = useCurrentFrame();
  const t = frame - from;
  const opacity = interpolate(t, [0, 4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(t, [0, 6], [14, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        top: SUB_TOP,
        left: 90,
        width: 840,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_SANS,
          fontWeight: 800,
          fontSize: 66,
          lineHeight: 1.12,
          letterSpacing: 0.5,
          color: '#FFFFFF',
          textAlign: 'center',
          textWrap: 'balance',
          WebkitTextStroke: '14px #0B1020',
          paintOrder: 'stroke fill',
          textShadow: '0 6px 14px rgba(5, 8, 20, 0.55)',
        }}
      >
        {text}
      </div>
    </div>
  );
};
