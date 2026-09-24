import React from 'react';

// Sovrapposizione di controllo: aree coperte dall'interfaccia di TikTok e Instagram Reels.
// Usata solo in verifica, mai nel video esportato.
export const SafeZones: React.FC = () => {
  const zone = {position: 'absolute' as const, background: 'rgba(255, 40, 60, 0.28)', border: '2px dashed rgba(255,255,255,0.8)'};
  return (
    <>
      <div style={{...zone, left: 0, top: 0, width: 1080, height: 210}} />
      <div style={{...zone, left: 0, top: 1500, width: 1080, height: 420}} />
      <div style={{...zone, left: 950, top: 700, width: 130, height: 800}} />
    </>
  );
};
