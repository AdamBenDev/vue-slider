import React from 'react';

// Grana leggera da carta e vignettatura: unifica scene e infografiche.
export const Grain: React.FC<{opacity?: number}> = ({opacity = 0.09}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
    <defs>
      <filter id="grain-f" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} result="n" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <radialGradient id="vignette-g" cx="50%" cy="46%" r="75%">
        <stop offset="55%" stopColor="#050A18" stopOpacity={0} />
        <stop offset="100%" stopColor="#050A18" stopOpacity={0.55} />
      </radialGradient>
    </defs>
    <rect width={1080} height={1920} filter="url(#grain-f)" opacity={opacity} style={{mixBlendMode: 'overlay'}} />
    <rect width={1080} height={1920} fill="url(#vignette-g)" />
  </svg>
);
