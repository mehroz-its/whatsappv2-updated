class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/list/campaigns'
            },
            create_message: {
                headers: {
                    'xt-user-token': null,
                    "Content-Type" : "application/json"
                },
                method: 'post',
                path: '/backend/campaign/create'
            },
            update_message: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/campaign/update/id'
            },
        }
    }
}

export default new APIS;