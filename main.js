require('dotenv').config(); // đọc file .env

const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;
let backendProcess;

const PORT = process.env.PORT || 3003;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Load giao diện từ backend
  mainWindow.loadURL(`http://localhost:${PORT}/admin/account/create`);

  // Mở console để debug (giúp xử lý trắng trang)
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startBackend() {
  backendProcess = spawn('node', ['index.js'], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  startBackend();

  // Đợi server khởi động rồi mới tạo cửa sổ Electron
  setTimeout(createWindow, 3000); // chờ 3 giây cho chắc ăn
});

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
