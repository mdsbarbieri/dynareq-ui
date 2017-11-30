const fs = require('fs');
const path = require('path');

const dataFolder = 'C:/projetos/Github/dynareq-ui/data';

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
    fs.readdirSync(dataFolder).forEach(fileName => {
        console.log(fileName);
        let fullPath = path.join(dataFolder, fileName);
        console.log(fullPath);
        let fileInfo = path.parse(fullPath);
        console.log(fileInfo);
        if (fileInfo.ext === '.json') {
            if (fileInfo.name.startsWith(envPrefix)) {
                let envData = require(fullPath);
                envData.id = fileInfo.name.replace(envPrefix, '');
                environments.push(envData);
            } else if (fileInfo.name === actionsFileName) {
                actions = require(fullPath);
            }
        }
    });
    console.log(environments);
    console.log(actions);
    return {
        environments: environments,
        actions: actions
    };
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
            //id is file name
            delete env.id;
            fs.writeFileSync(path.join(dataFolder, fileName), JSON.stringify(env));
        });
    }
    if (data.actions) {
        let fileName = path.join(dataFolder, actionsFileName + fileExt);
        fs.writeFileSync(fileName,  JSON.stringify(data.actions));
    }

}

module.exports = {
    get : get,
    update : update
};