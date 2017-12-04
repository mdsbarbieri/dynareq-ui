import _ from 'lodash';
import { removeSpecialChar } from '../../scripts/Util';
import { update, remove } from '../../scripts/Data';

export default {
    name: 'register-component',
    store: ['global', 'environments', 'register'],
    components: {},
    created() {
        this.isValid();
    },
    watch: {
        'register.environment.password': 'isValid',
        'register.environment.user': 'isValid',
        'register.environment.description': 'isValid'
    },
    methods: {
        isValid() {
            this.register.environment.isValid = (this.register.environment.password && this.register.environment.user && this.register.environment.name);
        },
        setMessage(message) {
            this.register.environment.message = message;
            var aux = this.removeErrorMessage;
            setTimeout(function() {
                aux();
            }, 3000);
        },
        removeErrorMessage() {
            this.register.environment.message = '';
        },
        addEnvironment() {
            if (!this.register.environment.isValid) {
                return;
            }

            var generatedId = removeSpecialChar(this.register.environment.name).toLowerCase();
            if (!!_.find(this.environments, { id: generatedId }) || !!_.find(this.environments, { name: this.register.environment.name })) {
                this.setMessage('This environment is already registered.');
                return;
            }

            var environment = {
                'id': generatedId,
                'name': this.register.environment.name,
                'user': this.register.environment.user,
                'password': this.register.environment.password,
                'isProduction': this.register.environment.isProduction,
                'hosts': []
            };

            this.environments.push(environment);
            this.register.environment.password = '';
            this.register.environment.user = '';
            this.register.environment.name = '';
            update({ environments: this.environments });
            this.$forceUpdate();
        },
        addHostArr(id) {
            var value = this.register.environment.hostArr[id];
            if (!value) {
                return;
            }

            var splitted = value.split(',');

            if (!splitted) {
                return;
            }
            var ref = this;
            this.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, id)) {
                    splitted.forEach(function(elemValue, index, array) {
                        if (elemValue) {
                            var host = {
                                'id': removeSpecialChar(elemValue),
                                'ip': elemValue.trim()
                            };
                            env.hosts.push(host);

                            if (_.isEqual(index, splitted.length - 1)) {
                                ref.register.environment.hostArr[id] = '';
                                update({ environments: elem });
                                ref.$forceUpdate();
                            }
                        }
                    });
                }
            });
        },
        removeHost(environmentId, id) {
            if (!id) {
                return;
            }
            this.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, environmentId)) {
                    env.hosts.forEach((host, index, hElem) => {
                        if (_.isEqual(host.id, id)) {
                            _.remove(hElem, { id: host.id });
                            update({ environments: this.environments });
                            this.$forceUpdate();
                        }
                    });
                }
            });
        },
        removeEnvironment(id) {
            this.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, id)) {
                    _.remove(elem, { id: env.id });
                    remove(env.id);
                    this.$forceUpdate();
                }
            });
        },
        toogleExpand(id) {
            this.register.environment.expanded[id] = !this.register.environment.expanded[id];
            this.$forceUpdate();
        }
    }
};