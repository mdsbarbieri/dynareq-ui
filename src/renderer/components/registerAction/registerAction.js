import _ from 'lodash';
import { removeSpecialChar } from '../../scripts/Util';
import { update } from '../../scripts/Data';

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
        'register.action.value': 'isValid'
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

            if (_.isEqual(this.register.action.actionType, 'setValue') && !this.register.action.property) {
                isValid = false;
            }

            this.register.action.isValid = isValid;
        },
        setMessage(message) {
            this.register.action.message = message;
            var aux = this.removeErrorMessage;
            setTimeout(function() {
                aux();
            }, 3000);
        },
        removeErrorMessage() {
            this.register.action.message = '';
        },
        addAction() {
            if (!this.register.action.isValid) {
                return;
            }

            if (!this.register.action.editId) {
                var generatedId = removeSpecialChar(this.register.action.name).toLowerCase();
                if (!!_.find(this.actions, { id: generatedId }) || !!_.find(this.actions, { name: this.register.environment.name })) {
                    this.setMessage('This action is already registered.');
                    return;
                }

                let action = {
                    id: generatedId,
                    name: this.register.action.name,
                    type: this.register.action.actionType,
                    path: this.register.action.path,
                    actionType: this.register.action.actionType,
                    method: (_.isEqual(this.register.action.actionType, 'invokeMethod')) ? this.register.action.method : '',
                    property: (_.isEqual(this.register.action.actionType, 'setValue')) ? this.register.action.property : '',
                    value: (_.isEqual(this.register.action.actionType, 'setValue')) ? this.register.action.value : ''
                };

                this.actions.push(action);
            } else {
                let action = _.find(this.actions, { id: this.register.action.editId });
                if (action) {
                    action.name = this.register.action.name;
                    action.type = this.register.action.actionType;
                    action.path = this.register.action.path;
                    action.method = (_.isEqual(this.register.action.actionType, 'invokeMethod')) ? this.register.action.method : '';
                    action.property = (_.isEqual(this.register.action.actionType, 'setValue')) ? this.register.action.property : '';
                    action.actionType = this.register.action.actionType;
                    action.value = (_.isEqual(this.register.action.actionType, 'setValue')) ? this.register.action.value : '';
                }
            }
            this.register.action.editId = null;
            this.register.action.name = '';
            this.register.action.actionType = '';
            this.register.action.path = '';
            this.register.action.method = '';
            this.register.action.property = '';
            this.register.action.value = '';
            update({ actions: this.actions });
            this.$forceUpdate();
        },
        removeAction(id) {
            this.$store.actions.forEach((act, idx, elem) => {
                if (_.isEqual(act.id, id)) {
                    _.remove(elem, { id: act.id });
                    update({ actions: this.actions });
                    this.$forceUpdate();
                }
            });
        },
        toogleExpand(id) {
            this.register.action.expanded[id] = !this.register.action.expanded[id];
            this.$forceUpdate();
        },
        editAction(id) {
            var action = _.find(this.actions, { id: id });
            if (!action) {
                return;
            }

            this.register.action.editId = id;
            this.register.action.name = action.name;
            this.register.action.actionType = action.actionType;
            this.register.action.path = action.path;
            this.register.action.method = action.method;
            this.register.action.property = action.property;
            this.register.action.value = action.value;
            this.$forceUpdate();
        }
    }
};