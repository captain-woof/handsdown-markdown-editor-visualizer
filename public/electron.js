const path = require("path");
const electron_is_dev = require("electron-is-dev")
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");

if (require('electron-squirrel-startup')) return app.quit();

// Hot reload
require('electron-reload')(__dirname,{
  electron: path.join("../", 'node_modules', '.bin', 'electron')
});

// All windows below

// Mainscreen window -> Open, New, etc
function createMainscreenWindow() {
  const mainscreenWindow = new BrowserWindow({
    width: 1000,
    height: 650,
    minHeight: 650,
    webPreferences: {
      'preload': electron_is_dev
        ? path.join(__dirname, "../public", "preload.js")
        : path.join(__dirname, "../build", "preload.js"),
      'contextIsolation': true
    },
    frame: true,
    title: "Handsdown - Loading...",
    icon: path.join(__dirname,"icons","png","64x64.png")
  });
  mainscreenWindow.setMenu(null)

  mainscreenWindow.loadURL(
    electron_is_dev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (electron_is_dev) {
    mainscreenWindow.webContents.openDevTools()
  }
}

// Create About window
function createAboutWindow(){
  const aboutWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      'contextIsolation': true
    },
    frame: true,
    title: "About",
    resizable: false,
    icon: path.join(__dirname,"icons","png","64x64.png")
  });
  aboutWindow.setMenu(null)

  aboutWindow.loadURL(
    electron_is_dev
      ? `file://${path.join(__dirname, "../public/about.html")}`
      : `file://${path.join(__dirname, "../build/about.html")}`
  );
}

// MAIN CODE
// Create main window
app.whenReady().then(createMainscreenWindow);

// For imitating behaviour on Mac
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainscreenWindow();
  }
});

// IPC Call Handlers
// Load file contents
ipcMain.on('getFileContentsReq', (event, filepath) => {
  var filePath = [filepath]
  // If there's no filename specified
  if (!filepath) {
    // Show file explorer
    filePath = dialog.showOpenDialogSync({
      title: "Open file",
      defaultPath: __dirname,
      filters: [
        { name: 'Markdown', extensions: ['md'] },
        { name: 'All files', extensions: ['*'] },
      ],
      properties: ['openFile', 'showHiddenFiles', 'createDirectory']
    })
  }

  // If cancelled
  if (!filePath) {
    event.returnValue = undefined
  } else { // If not cancelled
    // Read and return file contents
    if (filePath[0]) {
      event.returnValue = {
        filepath: filePath[0],
        text: fs.readFileSync(filePath[0]).toString()
      }
    }
  }
})

// Choose file and write text to it (Save as)
ipcMain.on('chooseAndWriteToFileReq', (event, text) => {
  // Show file explorer
  var filePath = dialog.showSaveDialogSync({
    title: "Save to file",
    defaultPath: __dirname,
    filters: [
      { name: 'Markdown', extensions: ['md'] },
      { name: 'All files', extensions: ['*'] },
    ],
    properties: ['showHiddenFiles', 'createDirectory', 'showOverwriteConfirmation']
  })

  // Return if cancelled
  if (!filePath) {
    event.returnValue = undefined
  } else { // If not cancelled
    // Add .md extension if needed
    if (!filePath.toLowerCase().endsWith("md")) {
      filePath += ".md"
    }
    // Write contents to file from text
    fs.writeFileSync(filePath, text)
    event.returnValue = {
      isSuccess: true,
      filepath: filePath
    }
  }
})

// Write text to file (Save)
ipcMain.on('writeToFileReq', (event, text, filepath) => {
  // Write contents from text to filepath
  if (text) {
    fs.writeFileSync(filepath, text)
    event.returnValue = true
  }
})

// Display error box
ipcMain.on('displayErrorBoxReq', (event, title, content) => {
  dialog.showErrorBox(title, content)
  event.returnValue = true
})

// Display save prompt
ipcMain.on('displaySavePromptReq', (event) => {
  event.returnValue = dialog.showMessageBoxSync({
    message: "The current file is not saved yet!",
    type: "question",
    buttons: ["Continue without saving", "Save and continue", "Cancel"],
    defaultId: 1,
    title: "File not saved",
    cancelId: 2,
    noLink: true
  })
})

// Exit app
ipcMain.on('exitAppReq', (event) => {
  event.returnValue = null
  app.quit()
})

// On inquiring for current directory
ipcMain.on("getCurrentDirectoryReq", (event) => {
  event.returnValue = process.cwd()
})

// On changing current directory
ipcMain.on("changeCurrentDirectoryReq", (event) => {
  try {
    // Show file explorer and get desired current directory
    var newCurrentDirectory = dialog.showOpenDialogSync({
      title: "Change current directory",
      defaultPath: process.cwd(),
      properties: ["openDirectory", "createDirectory"]
    })

    // If a choice was made, change directory
    if (newCurrentDirectory) {
      process.chdir(newCurrentDirectory[0])
      event.returnValue = newCurrentDirectory
    } else {
      event.returnValue = null
    }
  } catch (err) {
    event.returnValue = null
  }
})

// Get current directory listing
ipcMain.on("getDirectoryListing", (event) => {
  var directoryListingAll = fs.readdirSync(process.cwd(), { withFileTypes: true })
  var directoryListingRequired = [] // Each element (object) is {name:"",filepath:""}
  directoryListingAll.forEach((entry) => {
    if (entry.isFile && entry.name.toLowerCase().endsWith(".md")) {
      directoryListingRequired.push({
        name: entry.name,
        filepath: path.join(process.cwd(), entry.name)
      })
    }
  })
  event.returnValue = directoryListingRequired
})

// Show about
ipcMain.on("showAboutRequest",(event) => {
  event.returnValue = null
  createAboutWindow()  
})