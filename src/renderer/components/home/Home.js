import dynReq from 'dynamo-request';
import _ from "lodash";
import { update } from "../../scripts/Data";

export default {
    name: 'home-component',
    store: ['request', 'environments', 'actions'],
    data() {
        return {
            logs: [],
            serverTotal: 0,
            serverDone: 0,
            inProcess: false,
            auxActionId: '',
            auxEnvId: '',
        };
    },
    watch: {
        'auxEnvId': 'setEnvironment',
        'auxActionId': 'setCurrentAction',
        'request.action.method': 'isValid',
        'request.action.property': 'isValid',
        'request.action.value': 'isValid',
    },
    computed: {
        progressPercent() {
            if (this.serverTotal === 0) {
                return 0;
            }
            return (this.serverDone * 100) / this.serverTotal;
        }
    },
    methods: {
        isValid() {
            var isValid = true;
            if (_.isEqual(this.request.action.actionType, 'invokeMethod') && !this.request.action.method) {
                isValid = false;
            }

            if (_.isEqual(this.request.action.actionType, 'setValue') && !this.request.action.property) {
                isValid = false;
            }

            this.request.action.isValid = isValid;
            this.$forceUpdate();
        },
        setCurrentAction() {
            const getAction = _.find(this.actions, { id: this.auxActionId });
            this.request.action = (getAction) ? getAction : {};
            this.$forceUpdate();
        },
        setEnvironment() {
            const getEnv = _.find(this.environments, { id: this.auxEnvId });
            this.request.environment = (getEnv) ? getEnv : {};
            this.$forceUpdate();
        },
        saveRequestAction() {
            let action = _.find(this.actions, { id: this.auxActionId });
            if (action) {
                action.method = (_.isEqual(this.request.action.actionType, 'invokeMethod')) ? this.request.action.method : '';
                action.property = (_.isEqual(this.request.action.actionType, 'setValue')) ? this.request.action.property : '';
                action.value = (_.isEqual(this.request.action.actionType, 'setValue')) ? this.request.action.value : '';
            }
            update({ actions: this.actions });
            this.$forceUpdate();
        },
        makeRequest() {
            if (!this.request.action || !this.request.environment.id) {
                return;
            }

            const requestData = Object.assign({}, this.request.action);
            const requestServer = this.request.environment.hosts.slice();
            const auth = this.request.environment.user + ':' + this.request.environment.password;
            this.logs.push({
                message: `Execute action ${requestData.name} in environment ${this.request.environment.name}`
            });
            // progress bar
            this.serverTotal = requestServer.length;
            this.serverDone = 0;
            let vm = this;
            const useMethod = requestData.type === 'setValue' ? 'updateProperty' : 'invokeMethod';
            requestServer.forEach(server => {
                let finalHost = (server.ip.startsWith('http') ? '' : 'http://') + server.ip;
                dynReq[useMethod](finalHost, requestData, auth, (error, requestData) => {
                    let log = {
                        message: requestData.host,
                        withStatus: true
                    };
                    console.log('Request data', requestData);
                    if (error) {
                        console.log('Error on execute operation', error);
                        log.error = error.message;
                    }
                    vm.logs.push(log);
                    vm.serverDone++;
                });
            });
        }
    }
};