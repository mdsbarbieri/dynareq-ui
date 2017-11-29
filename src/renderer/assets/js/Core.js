var Environments = [{
        id: new Date().getTime(),
        name: "Production",
        isProduction: true,
        hosts: [
            '172.26.13.204:9000',
            '172.26.13.204:9901',
            '172.26.13.204:9902',
            '172.26.13.41:9001',
            '172.26.13.41:9002'
        ]
    },
    {
        id: new Date().getTime(),
        name: "HML",
        isProduction: false,
        hosts: [
            '172.26.13.204:9000',
            '172.26.13.204:9901',
            '172.26.13.204:9902',
            '172.26.13.41:9001',
            '172.26.13.41:9002'
        ]
    }
]

var Actions = [{
        id: new Date().getTime(),
        name: 'Invalidate orderRepository cache',
        type: 'invokeMethod',
        path: '/atg/commerce/order/OrderRepository/',
        method: 'invalidateCaches'
    },
    {
        id: new Date().getTime(),
        name: 'Alter static content version',
        type: 'setValue',
        path: '/atg/store/StoreConfiguration/',
        property: 'staticContentVersion',
        value: '1213232',
    }
]

export { Environments };
export { Actions };