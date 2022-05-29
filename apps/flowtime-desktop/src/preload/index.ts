import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.send('closeWindow'),
  minimizeWindow: () => ipcRenderer.send('minimizeWindow'),
  setSize: (width: number, height: number) => ipcRenderer.send('setSize', { width, height }),
  setPin: (shouldPin: boolean) => ipcRenderer.send('setPin', shouldPin),
});
