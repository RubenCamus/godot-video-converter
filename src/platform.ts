import path from "path";
import { app } from "electron";
export function getPythonExecutable() {
  if (process.platform === "win32") {
    return path.join(getBackendPath(), ".venv", 'Scripts', 'python.exe');
  } else {
    return path.join(getBackendPath(), ".venv", 'bin', 'python');
  }
}
export function getBackendPath() {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, "backend");
    }
    return path.join(__dirname, "../../backend");
  }
