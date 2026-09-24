import React from 'react';
import {Composition} from 'remotion';
import {VIDEO} from './theme/palette';
import {loadAllFonts} from './theme/fonts';
import {FramePersonaggio} from './style-frames/FramePersonaggio';
import {FrameInfografica} from './style-frames/FrameInfografica';

loadAllFonts();

// Fotogrammi di stile da approvare prima del video completo.
// Ogni composizione è anche una breve clip animata (5-6 s) per giudicare il movimento.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="StyleFrame-Personaggio"
      component={FramePersonaggio}
      durationInFrames={150}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
      defaultProps={{safeZones: false}}
    />
    <Composition
      id="StyleFrame-Infografica"
      component={FrameInfografica}
      durationInFrames={180}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
      defaultProps={{safeZones: false}}
    />
  </>
);
