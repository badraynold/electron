// import { app, BrowserWindow } from "electron";
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
    icon: './assets/icons/Icon_256x256.png'
  });
  //   mainWindow.loadURL("https://generator-paskow.pl");
  //   mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", createWindow);

console.log("Hello!");
