import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {SharedDefs} from '../components/svg';
import {StudioPrimoPiano, StudioSfondo} from '../scenes/StudioNotturno';
import {CalendarioOttobre1582} from '../infographics/CalendarioOttobre1582';
import {Subtitle} from '../components/Subtitle';
import {Grain} from '../components/Grain';
import {SafeZones} from '../components/SafeZones';
import {C} from '../theme/palette';

// Fotogramma di stile n. 2: infografica nello stesso mondo illustrato.
// Lo studio resta sullo sfondo, sfocato e scurito; il foglio di calendario è in primo piano.
export const FrameInfografica: React.FC<{safeZones?: boolean}> = ({safeZones = false}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: C.notte900}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
        <SharedDefs />
        <defs>
          <filter id="depth-blur" x="0" y="0" width="100%" height="100%">
            <feGaussianBlur stdDeviation={7} />
          </filter>
        </defs>
        <g filter="url(#depth-blur)">
          <StudioSfondo frame={frame} />
        </g>
        <rect width={1080} height={1920} fill={C.notte900} opacity={0.5} />
        <StudioPrimoPiano frame={frame} candleX={985} props={false} deskY={1236} />
        <CalendarioOttobre1582 frame={frame} jumpAt={20} />
      </svg>
      <Grain />
      <Subtitle text="Dopo giovedì 4 venne venerdì 15" />
      {safeZones ? <SafeZones /> : null}
    </AbsoluteFill>
  );
};
