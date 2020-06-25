class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/groups/list'
            },
            create: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/group/contact/create'
            },
            update: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/group/contact/:id'
            },
            fetch: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/backend/groups/contact/:id'
            }
        }
    }
};

export default new APIS;