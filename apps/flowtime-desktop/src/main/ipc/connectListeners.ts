import { ipcMain } from 'electron';
import {
  minimizeWindow,
  minimizeWindowEvent,
  closeWindow,
  closeWindowEvent,
  setPin,
  setPinEvent,
  setSize,
  setSizeEvent,
} from './events';

export function connectListeners(): void {
  ipcMain.on(minimizeWindowEvent, minimizeWindow);
  ipcMain.on(closeWindowEvent, closeWindow);
  ipcMain.on(setPinEvent, setPin);
  ipcMain.on(setSizeEvent, setSize);
}
