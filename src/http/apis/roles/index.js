class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/list/roles'
            },
            create_role: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/roles/create'
            },
            update_role: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/roles/update/id'
            },
        }
    }
}

export default new APIS;