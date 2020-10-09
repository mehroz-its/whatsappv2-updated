class APIS {
    apis() {
        return {
            get: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/client/agents/:client_id'
            },
            update: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/users/update/:id'
            },
            create: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/users/create'
            }
        }
    }
}

export default new APIS;