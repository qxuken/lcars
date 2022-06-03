import { IpcMainEvent } from 'electron';
import { getWindow } from '../helpers';

export const setPinEvent = 'setPin';
export function setPin(event: IpcMainEvent, shouldPin: boolean) {
  const win = getWindow(event);
  if (shouldPin) {
    win.setAlwaysOnTop(true);
    if (process.platform === 'darwin') {
      win.setVisibleOnAllWorkspaces(true, {
        visibleOnFullScreen: true,
      });
    }
  } else {
    win.setAlwaysOnTop(false);
    if (process.platform === 'darwin') {
      win.setVisibleOnAllWorkspaces(false);
    }
  }
}
