import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT_SERIF} from '../theme/palette';

// Titolo di scena: serif classico, grande, solo quando aiuta a capire (luogo, data, nome).
type Props = {
  kicker?: string;
  title: string;
  top?: number;
  from?: number;
  color?: string;
  size?: number;
};

export const Title: React.FC<Props> = ({kicker, title, top = 236, from = 0, color = C.avorio, size = 92}) => {
  const frame = useCurrentFrame();
  const t = frame - from;
  const o = interpolate(t, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(t, [0, 14], [18, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top, left: 60, width: 880, textAlign: 'center', opacity: o, transform: `translateY(${y}px)`}}>
      {kicker ? (
        <div
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: C.ambra300,
            textShadow: '0 3px 10px rgba(5,8,20,0.7)',
            marginBottom: 2,
          }}
        >
          {kicker}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.02,
          color,
          fontVariantNumeric: 'lining-nums',
          textShadow: '0 4px 16px rgba(5,8,20,0.75)',
        }}
      >
        {title}
      </div>
    </div>
  );
};
