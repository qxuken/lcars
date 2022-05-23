export interface IElectronAPI {
  closeWindow: () => Promise<void>;
  minimizeWindow: () => Promise<void>;
  setSize: (width: number, height: number) => Promise<void>;
  setPin: (shouldPin: boolean) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
