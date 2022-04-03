const { app, BrowserWindow } = require("electron");
process.env.NODE_ENV = "development";
const isDev = process.env.NODE_ENV !== "production" ? true : false;
console.log(process.platform);

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: `{$__dirname}/assets/icons/Icon_256x256.png`,
    resizable: false,
  });
  //   mainWindow.loadURL("https://generator-paskow.pl");
  //   mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

console.log("Hello!");
