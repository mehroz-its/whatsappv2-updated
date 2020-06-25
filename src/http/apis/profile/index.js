class APIS {
    apis() {
        return {
            get_profile: {
                headers: {
                    'xt-user-token': null,
                },
                method: 'get',
                path: '/backend/user/attribute',
            },
            update: {
                headers: {
                    'xt-user-token': null,
                },
                method: 'put',
                path: '/backend/users/:id/attributes',
            },
        };
    }
}

export default new APIS();
