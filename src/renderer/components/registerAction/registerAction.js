import _ from "lodash";
import { removeSpecialChar } from "../../scripts/Util";
import { update, remove } from "../../scripts/Data";

export default {
    name: 'register-component',
    store: ['actions', 'register'],
    created() {
        this.isValid();
    },
    watch: {
        'register.action.name': 'isValid',
        'register.action.actionType': 'isValid',
        'register.action.path': 'isValid',
        'register.action.method': 'isValid',
        'register.action.property': 'isValid',
        'register.action.value': 'isValid',
    },
    methods: {
        isValid() {
            var isValid = true;
            if (!this.register.action.name || !this.register.action.actionType || !this.register.action.path) {
                isValid = false;
            }

            if (_.isEqual(this.register.action.actionType, 'invokeMethod') && !this.register.action.method) {
                isValid = false;
            }

            if (_.isEqual(this.register.action.actionType, 'setValue') && (!this.register.action.property || !this.register.action.value)) {
                isValid = false;
            }

            this.register.action.isValid = isValid;
        },
        setMessage(message) {
            this.register.action.message = message;
            var aux = this.removeErrorMessage;
            setTimeout(function() {
                aux();
            }, 3000)
        },
        removeErrorMessage() {
            this.register.action.message = ""
        },
        addAction() {
            if (!this.register.action.isValid) {
                return;
            }

            var generatedId = removeSpecialChar(this.register.action.name).toLowerCase()
            if (!!_.find(this.actions, { id: generatedId }) || !!_.find(this.actions, { name: this.register.environment.name })) {
                this.setMessage('This action is already registered.');
                return;
            }

            var action = {
                id: generatedId,
                name: this.register.action.name,
                type: this.register.action.actionType,
                path: this.register.action.path,
                property: this.register.action.method,
                value: this.register.action.property,
                method: this.register.action.value
            }

            this.actions.push(action)
            this.register.action.name = "";
            this.register.action.actionType = "";
            this.register.action.path = "";
            this.register.action.method = "";
            this.register.action.property = "";
            this.register.action.value = "";
            update({ actions: this.actions });
            this.$forceUpdate();

        },
        removeAction(id) {
            this.$store.actions.forEach((act, idx, elem) => {
                if (_.isEqual(act.id, id)) {
                    _.remove(elem, { id: act.id });
                    update({ actions: this.actions })
                    this.$forceUpdate();
                }
            })
        }
    }
}