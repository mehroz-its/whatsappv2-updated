class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/contacts'
            },
            update: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/user/:id/attributes'
            },
            fetch: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/fetch/customer/:number'
            }
        }
    }
};

export default new APIS;