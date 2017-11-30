import { Environments } from "../../scripts/Core";

export default {
    name: 'register-component',
    store: ['global', 'environments'],
    components: {},
    created() {
        // this.fetchData();
    },
    watch: {
        // 'name': 'fetchData'
    },
    methods: {
        fetchData() {
            // this.$store.global.environment = "Local";
        }
    }
}