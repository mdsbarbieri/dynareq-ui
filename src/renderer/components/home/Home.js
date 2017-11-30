import _ from "lodash";
export default {
    name: 'register-component',
    store: ['global', 'request', 'environments', 'actions'],
    watch: {
        'request.environment.id': 'setEnvironment',
    },
    methods: {
        setEnvironment() {
            this.$store.environments.forEach((env, idx, elem) => {
                if (_.isEqual(env.id, this.request.environment.id)) {
                    this.request.environment.isProduction = env.isProduction
                    this.$forceUpdate();
                }
            })
        }
    }
}