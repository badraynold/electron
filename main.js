// import { app, BrowserWindow } from "electron";
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "ImageShrink",
    width: 500,
    height: 600,
  });
}

app.on("ready", createWindow);

console.log("Hello!");
