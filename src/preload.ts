// See the Electron documentation for details on how to use preload scripts:
import { shell } from "electron/common";
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  openOutputFolder: () => {
    console.log("preload");
    ipcRenderer.invoke("open-output-folder");
  }
});
