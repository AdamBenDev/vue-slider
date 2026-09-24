import React from 'react';

// Filtri e helper SVG condivisi: ombre morbide dentro la forma (clip + blur),
// così i volumi restano semplici ma leggibili.
export const SharedDefs: React.FC = () => (
  <defs>
    <filter id="blur-s" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation={4} />
    </filter>
    <filter id="blur-m" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation={9} />
    </filter>
    <filter id="blur-l" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation={22} />
    </filter>
    <filter id="blur-xl" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation={48} />
    </filter>
  </defs>
);

type ShadedProps = {
  id: string;
  d: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  /** ombre (percorsi) disegnate dentro la forma e sfumate */
  shadows?: {d: string; fill: string; opacity?: number; blur?: 's' | 'm' | 'l'}[];
  children?: React.ReactNode;
};

export const Shaded: React.FC<ShadedProps> = ({id, d, fill, stroke, strokeWidth = 3, shadows = [], children}) => (
  <g>
    <clipPath id={`clip-${id}`}>
      <path d={d} />
    </clipPath>
    <path d={d} fill={fill} />
    <g clipPath={`url(#clip-${id})`}>
      {shadows.map((s, i) => (
        <path key={i} d={s.d} fill={s.fill} opacity={s.opacity ?? 1} filter={`url(#blur-${s.blur ?? 'm'})`} />
      ))}
      {children}
    </g>
    {stroke ? <path d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" /> : null}
  </g>
);
