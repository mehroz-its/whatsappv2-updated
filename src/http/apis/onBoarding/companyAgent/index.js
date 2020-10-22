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
            get_paginated: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/client/agents-paginated'
            },
            update: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/users/update/:id'
            },
            update_partial: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/users/update-partial/:id'
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