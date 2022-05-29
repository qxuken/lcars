import { BrowserWindow, IpcMainEvent } from 'electron';

export function getWindow(event: IpcMainEvent): BrowserWindow {
  const webContents = event.sender;
  return BrowserWindow.fromWebContents(webContents);
}
