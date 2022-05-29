import { IpcMainEvent } from 'electron';
import { getWindow } from '../helpers';

export const closeWindowEvent = 'closeWindow';
export function closeWindow(event: IpcMainEvent) {
  const win = getWindow(event);
  win.close();
}
