import os from 'os';
import fs from 'fs';
import path from 'path';
import jsonfile from 'jsonfile';

const dataFolder = os.homedir() + '/dynareq-ui/data';

const envPrefix = "env-";
const actionsFileName = "actions";
const fileExt = ".json";

function createFolderIfNotExist(destFile) {
    const targetDir = path.parse(destFile).dir;
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

    return { actions, environments }
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

            delete env.id;
            fs.writeFileSync(path.join(dataFolder, fileName), JSON.stringify(env));
        });
    }

    if (data.actions) {
        let fileName = path.join(dataFolder, actionsFileName + fileExt);
        fs.writeFileSync(fileName, JSON.stringify(data.actions));
    }

}

export { get };
export { update };