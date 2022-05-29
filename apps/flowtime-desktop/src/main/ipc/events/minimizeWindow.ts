import { IpcMainEvent } from 'electron';
import { getWindow } from '../helpers';

export const minimizeWindowEvent = 'minimizeWindow';
export function minimizeWindow(event: IpcMainEvent) {
  const win = getWindow(event);
  win.minimize();
}
