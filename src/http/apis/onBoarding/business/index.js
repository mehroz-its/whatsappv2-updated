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
            get_meta: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/backend/fetch/clients-meta'
            },
            get_pagination: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/clients-pagination'
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