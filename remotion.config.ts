import {Config} from '@remotion/cli/config';

// Chromium headless preinstallato nell'ambiente (evita il download di Remotion).
const HEADLESS_SHELL =
  process.env.REMOTION_BROWSER ??
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';

Config.setBrowserExecutable(HEADLESS_SHELL);
Config.setVideoImageFormat('png');
Config.setPixelFormat('yuv420p');
Config.setCodec('h264');
Config.setCrf(16);
Config.setConcurrency(3);
