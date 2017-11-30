export default {
    global: {
        environment: {
            name: "Production",
            isProduction: true
        }
    },
    register: {
        action: {
            message: "",
            actionType: ""
        },
        environment: {
            message: "",
            host: {},
            hostArr: {}
        }
    },
    request: {
        environment: "",
        action: ""
    },
    actions: {},
    environments: {}
};