const path = require("path");
const os = require("os");
const log = require("electron-log");

const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  ipcMain,
  shell,
} = require("electron");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

const slash = require("slash");

process.env.NODE_ENV = "production";
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
  options.dest = path.join(os.homedir(), "imageshrink");
  shringImage(options);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

console.log("Hello!");

const shringImage = async ({ imgPath, quality, dest }) => {
  try {
    const files = await imagemin([slash(imgPath)], {
      destination: dest,
      plugins: [
        imageminMozjpeg({
          quality,
        }),
        imageminPngquant({
          quality: [quality / 100, quality / 100],
        }),
      ],
    });
    log.info(files);
    shell.openPath(dest);
    mainWindow.webContents.send("image:done");
  } catch (err) {
    log.error(err);
  }
};
