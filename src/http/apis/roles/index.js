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
            delete: {
                headers: {
                    'xt-user-token': null
                },
                method: 'delete',
                path: '/backend/roles/delete/:id'
            },
        }
    }
}

export default new APIS;