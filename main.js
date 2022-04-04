const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
process.env.NODE_ENV = "development";
const isDev = process.env.NODE_ENV !== "production" ? true : false;
console.log(process.platform);
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: `{$__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
    backgroundColor: "white",
  });
  //   mainWindow.loadURL("https://generator-paskow.pl");
  //   mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile("./app/index.html");
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
    role: "fileMenu",
  },
];

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

console.log("Hello!");
