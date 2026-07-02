const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("node:child_process");

const path = require("node:path");
let backendProcess;
async function uploadVideo(video) {}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  initBackend();
  // ipcMain.handle("upload");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

async function initBackend() {
  const apiDir = path.join(__dirname, "api");
  const pythonExe = path.join(apiDir, ".venv", "Scripts", "python.exe");

  backendProcess = spawn(
    pythonExe,
    ["-m", "uvicorn", "main:app", "--port", "8000"],
    {
      cwd: apiDir,
    },
  );
}
