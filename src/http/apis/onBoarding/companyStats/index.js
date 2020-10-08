class APIS {
    apis() {
        return {
            get: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/client/stats/:client_id'
            },
            postStats: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/client/stats'
            }
        }
    }
}

export default new APIS;