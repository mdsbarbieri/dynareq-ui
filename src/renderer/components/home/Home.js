import _ from "lodash";
import { update } from "../../scripts/Data";

export default {
    name: 'register-component',
    store: ['global', 'request', 'environments', 'actions'],
    watch: {
        'request.environment.id': 'setEnvironment',
        'request.action': 'setCurrentAction',
        'request.actionObj.method': 'isValid',
        'request.actionObj.property': 'isValid',
        'request.actionObj.value': 'isValid',
    },
    methods: {
        isValid() {
            var isValid = true;
            if (_.isEqual(this.request.actionObj.actionType, 'invokeMethod') && !this.request.actionObj.method) {
                isValid = false;
            }

            if (_.isEqual(this.request.actionObj.actionType, 'setValue') && !this.request.actionObj.property) {
                isValid = false;
            }

            this.request.actionObj.isValid = isValid;
            this.$forceUpdate();
        },
        setEnvironment() {
            this.$store.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, this.request.environment.id)) {
                    this.request.environment.isProduction = env.isProduction
                    this.$forceUpdate();
                }
            })
        },
        setCurrentAction() {
            this.request.actionObj = _.find(this.actions, { id: this.request.action })
        },
        saveRequestAction() {
            var action = _.find(this.actions, { id: this.request.actionObj.id });
            if (action) {
                action.method = (_.isEqual(this.request.actionObj.actionType, 'invokeMethod')) ? this.request.actionObj.method : '';
                action.property = (_.isEqual(this.request.actionObj.actionType, 'setValue')) ? this.request.actionObj.property : '';
                action.value = (_.isEqual(this.request.actionObj.actionType, 'setValue')) ? this.request.actionObj.value : '';
            }
            update({ actions: this.actions });
            this.$forceUpdate();
        }
    }
}