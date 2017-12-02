import os from 'os';
import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';
import _ from 'lodash';

let dataFolder = os.homedir() + '\\dynareq-ui\\data';
let exportFolder = os.homedir() + '\\dynareq-ui\\export';

if (!_.isEqual(os.platform(), 'win32')) {
    dataFolder = dataFolder.replace(/\\/g, '/');
    exportFolder = exportFolder.replace(/\\/g, '/');
}

const envPrefix = 'env-';
const actionsFileName = 'actions';
const fileExt = '.json';
const jsonRegex = /.json/;

function createFolderIfNotExist(destFile) {
    let targetDir = destFile;

    if (jsonRegex.test(destFile)) {
        targetDir = path.parse(destFile).dir;
    }
    const initParent = path.isAbsolute(targetDir) ? '/' : '';
    // Use `path.sep`, to avoid cross-platform issues.
    targetDir.split(path.sep).reduce((parentDir, childDir) => {
        // Resolving an absolute path to the current working directory. To resolve to
        // the current script dir, use `__dirname` for `path.resolve()` as 1st param.
        // Use `path.resolve()`, don't '/' concate, also to avoid cross-platform issues.
        const curDir = path.resolve(parentDir, childDir);
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(curDir);
        }

        return curDir;
    }, initParent);
}

function get() {
    let environments = [];
    let actions = [];
    let fullPath;
    let fileInfo;

    try {
        fs.readdirSync(dataFolder).forEach(fileName => {
            fullPath = path.join(dataFolder, fileName);
            fileInfo = path.parse(fullPath);
            if (fileInfo.name.startsWith(envPrefix)) {
                let envData = jsonfile.readFileSync(fullPath);
                envData.id = fileInfo.name.replace(envPrefix, '');
                environments.push(envData);
            } else if (fileInfo.ext === '.json' && fileInfo.name === actionsFileName) {
                actions = jsonfile.readFileSync(fullPath);
            }
        });
        return { actions, environments };
    } catch (error) {
        createFolderIfNotExist(dataFolder);
        createFolderIfNotExist(exportFolder);
        return { actions: [], environments: [] };
    }
}

function update(data) {
    createFolderIfNotExist(dataFolder);
    if (data.environments) {
        data.environments.forEach(env => {
            let fileName = '';
            if (env.id) {
                fileName = envPrefix + env.id + fileExt;
            } else {
                fileName = envPrefix + env.name.toLowerCase().replace(/ /g, '_') + fileExt;
            }

            fs.writeFileSync(path.join(dataFolder, fileName), JSON.stringify(env));
        });
    }
    if (data.actions) {
        let fileName = path.join(dataFolder, actionsFileName + fileExt);
        fs.writeFileSync(fileName, JSON.stringify(data.actions));
    }
}

function remove(id) {
    let fileName = '';
    if (!id) {
        return;
    }
    fileName = envPrefix + id + fileExt;
    fs.unlinkSync(path.join(dataFolder, fileName));
}

export { get };
export { update };
export { remove };
export { exportFolder };
