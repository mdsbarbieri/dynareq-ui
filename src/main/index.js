import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import fs from 'fs';
import jsonfile from 'jsonfile';
import { update } from '../renderer/scripts/Data';

var open = require("open");

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.webContents.on('new-window', function(event, url) {
        event.preventDefault();
        open(url);
    });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})


ipcMain.on('exportData', function(event, exportFolder, data) {
    const win = BrowserWindow.fromWebContents(event.sender)
    dialog.showSaveDialog(win, {
        title: 'dynarequi-data.json',
        defaultPath: exportFolder + '/dynarequi-data.json'
    }, function(result) {
        fs.writeFileSync(result, JSON.stringify(data));
    });
});

ipcMain.on('importData', function(event, exportFolder, data) {
    const win = BrowserWindow.fromWebContents(event.sender)
    dialog.showOpenDialog(win, {
            defaultPath: 'c:/',
            filters: [
                { name: 'All Files', extensions: ['json'] },
            ]
        },
        function(result) {
            var file = jsonfile.readFileSync(result[0]);
            if (file && file.environments && file.actions) {
                update(file);
                win.reload()
            }
        });
});