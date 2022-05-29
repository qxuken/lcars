import { IpcMainEvent } from 'electron';
import { getWindow } from '../helpers';

export const setSizeEvent = 'setSize';
export function setSize(event: IpcMainEvent, { width, height }: { width: number; height: number }) {
  const win = getWindow(event);
  win.setSize(width, height);
}
