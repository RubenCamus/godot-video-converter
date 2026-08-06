// See the Electron documentation for details on how to use preload scripts:
import { shell } from "electron/common";
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  openOutputFolder: () => {
    ipcRenderer.invoke("open-output-folder");
  }
});
