import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, Easing} from 'remotion';
import {SharedDefs} from '../components/svg';
import {StudioPrimoPiano, StudioSfondo} from '../scenes/StudioNotturno';
import {GregorioXIII} from '../characters/GregorioXIII';
import {Subtitle} from '../components/Subtitle';
import {Title} from '../components/Title';
import {Grain} from '../components/Grain';
import {SafeZones} from '../components/SafeZones';

// Fotogramma di stile n. 1: personaggio in ambiente.
export const FramePersonaggio: React.FC<{safeZones?: boolean}> = ({safeZones = false}) => {
  const frame = useCurrentFrame();
  const blinkAt = [48, 118];
  const blink = Math.max(...blinkAt.map((b) => interpolate(frame, [b - 3, b, b + 3], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
  const brow = interpolate(frame, [20, 34, 90, 104], [0, 8, 8, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.ease)});
  const fingerTilt = 3 * Math.sin(frame / 7) * interpolate(frame, [20, 30, 70, 80], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const breath = 2.5 * Math.sin(frame / 22);
  const talk = frame > 24 && frame < 84 ? Math.abs(Math.sin(frame / 3.2)) * 0.8 : 0;

  return (
    <AbsoluteFill style={{background: '#0B1428'}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', inset: 0}}>
        <SharedDefs />
        <StudioSfondo frame={frame} />
        <GregorioXIII pose={{blink, brow, fingerTilt, breath, talk}} />
        <StudioPrimoPiano frame={frame} />
      </svg>
      <Grain />
      <Title kicker="Papa Gregorio XIII" title="24 febbraio 1582" />
      <Subtitle text="Il papa cambia il calendario" />
      {safeZones ? <SafeZones /> : null}
    </AbsoluteFill>
  );
};
