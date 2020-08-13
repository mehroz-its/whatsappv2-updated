class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/list/permissions'
            },
            permission_details: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/detail/permissions/id'
            },
            permission_roles: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/backend/permission/roles/:permission_id'
            },
            rule_set: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/fetch/list/rule_sets',
            },
            create: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/permissions/create',
            },
            update: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/permissions/update/:id',
            },
            delete: {
                headers: {
                    'xt-user-token': null
                },
                method: 'delete',
                path: '/backend/permissions/delete/:id'
            },
        }
    }
}

export default new APIS;