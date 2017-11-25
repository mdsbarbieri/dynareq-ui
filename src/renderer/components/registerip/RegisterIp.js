import { setInterval } from "timers";

export default {
    name: 'register-component',
    components: {},
    data() {
        return {
            name: "Juao",
        }
    },
    created() {
        this.fetchData();
    },
    watch: {
        'name': 'fetchData'
    },
    methods: {
        fetchData() {
            this.$store.global.environment = "Local";
            console.log('enter');
        }
    }
}