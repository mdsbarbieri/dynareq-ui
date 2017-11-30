import _ from "lodash";
import { removeSpecialChar } from "../../scripts/Util";
import { update, remove } from "../../scripts/Data";

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
        'register.environment.description': 'isValid',
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
            }, 3000)
        },
        removeErrorMessage() {
            this.register.environment.message = ""
        },
        addEnvironment() {
            if (!this.register.environment.password || !this.register.environment.user || !this.register.environment.name) {
                return;
            }

            var generatedId = removeSpecialChar(this.register.environment.name).toLowerCase()
            if (!!_.find(this.environments, { id: generatedId }) || !!_.find(this.environments, { name: this.register.environment.name })) {
                this.setMessage('This environment is already registered.');
                return;
            }

            var environment = {
                "id": generatedId,
                "name": this.register.environment.name,
                "user": this.register.environment.user,
                "password": this.register.environment.password,
                "isProduction": this.register.environment.isProduction,
                "hosts": []
            }

            this.environments.push(environment)
            update({ environments: this.environments })
            this.register.environment.password = '';
            this.register.environment.user = '';
            this.register.environment.name = ''
        },
        addHost(id) {
            var value = this.register.environment.host[id];
            if (!value) {
                return;
            }
            var environment = _.find(this.environments, { id: id });

            if (!environment) {
                return;
            }

            var host = {
                "id": removeSpecialChar(value),
                "ip": value
            }

            environment.hosts.push(host)
            this.register.environment.host[id] = "";
            this.$forceUpdate()
            update({ environments: this.environments });
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
            this.$store.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, id)) {
                    splitted.forEach(function(elemValue, index, array) {
                        var host = {
                            "id": removeSpecialChar(elemValue),
                            "ip": elemValue
                        }
                        env.hosts.push(host);

                        if (_.isEqual(index, splitted.length - 1)) {
                            ref.$forceUpdate();
                            ref.register.environment.host[id] = "";
                            update({ environments: elem });
                        }
                    });
                }
            })
        },
        removeHost(environmentId, id) {
            if (!id) {
                return;
            }
            this.$store.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, environmentId)) {
                    env.hosts.forEach((host, index, hElem) => {
                        if (_.isEqual(host.id, id)) {
                            _.remove(hElem, { id: host.id });
                            this.$forceUpdate();
                        }
                    })
                }
            })
            update({ environments: this.$store.environments });
        },
        removeEnvironment(id) {
            this.$store.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, id)) {
                    _.remove(elem, { id: env.id });
                    remove(env.id);
                    this.$forceUpdate();
                }
            })
        }
    }
}