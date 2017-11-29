import { Environments } from "../../assets/js/Core";

export default {
    name: 'register-component',
    components: {},
    data() {
        return {
            environments: Environments
        }
    },
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