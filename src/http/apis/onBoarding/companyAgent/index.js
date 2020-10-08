class APIS {
    apis() {
        return {
            get: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/client/agents/:client_id'
            }
        }
    }
}

export default new APIS;