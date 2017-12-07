import { app, BrowserWindow, ipcMain, dialog, autoUpdater } from 'electron';
import fs from 'fs';
import jsonfile from 'jsonfile';
import _ from 'lodash';
import { update } from '../renderer/scripts/Data';
import packageJson from '../../package.json';

var open = require('open');
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden-inset'
    });

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('new-window', function(event, url) {
        event.preventDefault();
        open(url);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});


const server = 'https://github.com/mdsbarbieri/dynareq-ui/releases'
const feed = `${server}/tag/${packageJson.version}`

autoUpdater.setFeedURL(feed)

app.on('ready', () => {
    if (process.env.NODE_ENV !== 'development') {
        autoUpdater.checkForUpdates();
    }
})

setInterval(() => {
    autoUpdater.checkForUpdates()
}, 60000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts, (response) => {
        if (response === 0) autoUpdater.quitAndInstall()
    })
})

autoUpdater.on('error', message => {
    console.error('There was a problem updating the application')
    console.error(message)
})

ipcMain.on('importData', function(event, exportFolder, data) {
    const win = BrowserWindow.fromWebContents(event.sender);
    dialog.showOpenDialog(win, {
            defaultPath: 'c:/',
            filters: [
                { name: 'All Files', extensions: ['json'] }
            ]
        },
        function(result) {
            if (result) {
                var file = jsonfile.readFileSync(result[0]);
                if (file && file.environments && file.actions) {
                    update(file);
                    win.reload();
                }
            }
        });
});

ipcMain.on('mergeData', function(event, data) {
    const win = BrowserWindow.fromWebContents(event.sender);
    dialog.showOpenDialog(win, {
            defaultPath: 'c:/',
            filters: [
                { name: 'All Files', extensions: ['json'] }
            ]
        },
        function(result) {
            if (result) {
                var file = jsonfile.readFileSync(result[0]);
                if (file && file.environments && file.actions) {
                    _.forEach(file.environments, (environemnt) => {
                        let existingData = _.find(data.environments, { id: environemnt.id });
                        if (!existingData) {
                            data.environments.push(environemnt);
                        } else {
                            _.forEach(environemnt.hosts, (host) => {
                                if (!_.find(existingData.hosts, { id: host.id })) {
                                    existingData.hosts.push(host);
                                }
                            });
                        }
                    });
                    _.forEach(file.actions, (action) => {
                        let existingData = _.find(data.actions, { id: action.id });
                        if (!existingData) {
                            data.actions.push(action);
                        }
                    });
                    update(data);
                    win.reload();
                }
            }
        });
});

ipcMain.on('exportData', function(event, exportFolder, data) {
    const win = BrowserWindow.fromWebContents(event.sender);
    dialog.showSaveDialog(win, {
        title: 'dynarequi-data.json',
        defaultPath: exportFolder + '/dynarequi-data.json'
    }, function(result) {
        if (result) {
            fs.writeFileSync(result, JSON.stringify(data));
        }
    });
});