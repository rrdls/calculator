const { app, BrowserWindow, ipcMain } = require('electron')
require('electron-reload')(__dirname)

function createWindow() {
  let win = new BrowserWindow({
    width: 335,
    height: 500,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.maximizable = false
  win.resizable = false
  win.setMenu(null)

}

app.on('ready', createWindow)

ipcMain.on('close', (evt, arg) => {
  app.quit()
})

ipcMain.on('minimize', (evt, arg) => {
  BrowserWindow.getFocusedWindow().minimize()
})

