import { Actions, Environments } from "../../assets/js/Core";

export default {
    name: 'register-component',
    store: ['global', 'request'],
    data() {
        return {
            actions: Actions,
            environments: Environments,
        }
    }
}