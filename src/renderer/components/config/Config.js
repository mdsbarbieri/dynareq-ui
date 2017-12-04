import { ipcRenderer } from 'electron';
import { exportFolder } from '../../scripts/Data';

export default {
    name: 'register-component',
    store: ['global', 'request', 'environments', 'actions'],
    watch: {
        'request.environment.id': 'setEnvironment'
    },
    methods: {
        importData() {
            ipcRenderer.send('importData');
        },
        exportData() {
            var data = {
                environments: this.environments,
                actions: this.actions
            };

            ipcRenderer.send('exportData', exportFolder, data);
        },
        mergeData() {
            var data = {
                environments: this.environments,
                actions: this.actions
            };

            ipcRenderer.send('mergeData', data);
        }
    }
};