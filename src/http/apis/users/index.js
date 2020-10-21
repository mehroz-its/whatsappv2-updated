class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/fetch/list/users'
            },
            update_user: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/users/update-own/id'
            },
            create_user: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/users/create-own-user'
            },
            delete: {
                headers: {
                    'xt-user-token': null
                },
                method: 'delete',
                path: '/backend/users/delete/:id'
            },
        }
    }
}

export default new APIS;