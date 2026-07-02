const { contextBridge, ipcRenderer } = require("electron/renderer");
contextBridge.exposeInMainWorld("postAPI", postAPI());
async function postAPI(url, formData) {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return response;
}
