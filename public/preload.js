const {ipcRenderer,contextBridge} = require("electron")

// Exposing APIs for Filesystem operations
contextBridge.exposeInMainWorld('api',{
    // Present file open dialog box and return file contents
    getFileContents: () => {
        return ipcRenderer.sendSync('getFileContentsReq')
    },

    // Get file contents from a specified file
    getSpecificFileContents: (filepath) => {
        return ipcRenderer.sendSync('getFileContentsReq',filepath)
    },

    // Present file save dialog box and write text to file
    chooseAndWriteToFile: (text) => {
        return ipcRenderer.sendSync('chooseAndWriteToFileReq',text)
    },

    // Write text to file
    writeToFile: (text, filepath) => {
        return ipcRenderer.sendSync('writeToFileReq',text,filepath)
    },

    // Display error box
    displayErrorBox: (title,content) => {
        return ipcRenderer.sendSync('displayErrorBoxReq',title,content)
    },

    // Display save prompt
    displaySavePrompt: () => {
        return ipcRenderer.sendSync('displaySavePromptReq')
    },

    // Exit app
    exitApp: () => {
        return ipcRenderer.sendSync('exitAppReq')
    },

    // Get current directory listing
    getDirectoryListing: () => {
        return ipcRenderer.sendSync('getDirectoryListing')
    },

    // Change current directory
    changeCurrentDirectory: () => {
        return ipcRenderer.sendSync('changeCurrentDirectoryReq')
    },

    // Get current directory
    getCurrentDirectory: () => {
        return ipcRenderer.sendSync('getCurrentDirectoryReq')
    },

    // Show about request
    showAboutRequest: () => {
        return ipcRenderer.sendSync('showAboutRequest')
    }
})
