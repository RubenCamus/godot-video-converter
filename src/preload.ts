import { shell } from "electron/common";
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  // Here wo api call "connection" to main.ts
  openOutputFolder: () =>  ipcRenderer.invoke("open-output-folder"),
  openLink: (url: string) => ipcRenderer.invoke('open-link', url),
});
// contextBridge.expo('browserManager', {
//   openLink: () => {
//     ipcRenderer.invoke('open-link');
//  }
// })
