const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  ipcMain,
} = require("electron");
process.env.NODE_ENV = "development";
const isDev = process.env.NODE_ENV !== "production" ? true : false;
console.log(process.platform);
let mainWindow;
let aboutWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 1200,
    height: 600,
    icon: `{$__dirname}/assets/icons/Icon_256x256.png`,
    resizable: true,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadFile("./app/index.html");
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About ImageShrink",
    width: 300,
    height: 300,
    icon: `{$__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: "white",
  });
  aboutWindow.loadFile("./app/about.html");
}

app.on("ready", () => {
  createWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  globalShortcut.register("CmdOrCtrl+R", () => {
    mainWindow.reload();
  });
  globalShortcut.register("Ctrl+Shift+I", () => {
    mainWindow.toggleDevTools();
  });
  mainWindow.on("closed", () => (mainWindow = null));
});

const menu = [
  {
    label: "test",
    click: createAboutWindow,
  },
  {
    role: "fileMenu",
  },
];

ipcMain.on("image:minimize", (e, options) => {
  console.log(options);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

console.log("Hello!");
