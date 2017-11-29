import { Actions } from "../../assets/js/Core";

export default {
    name: 'register-component',
    data() {
        return {
            actions: Actions
        }
    },
    computed: {
        actionType: {
            get() {
                console.log('get', this.$store.action.values)
                return this.$store.action.values;
            },
            set(v) {
                console.log('set', this.$store.actionType, v)
                this.$store.commit('setaction', v)
            }
        }
    },
    mutations: {
        values: function(state, q) {
            this.actionType = q
        }
    }
}