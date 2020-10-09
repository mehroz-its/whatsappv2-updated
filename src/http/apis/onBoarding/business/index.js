class APIS {
    apis() {
        return {
            get: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/backend/fetch/clients'
            },
            changeStatus: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/client/toggle'
            }
        }
    }
}

export default new APIS;