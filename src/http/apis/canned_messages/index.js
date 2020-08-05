class APIS {
    apis() {
        return {
            type_listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/canned/messages/:type'
            },
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/list/canned_messages'
            },
            create_message: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/canned/messages/create'
            },
            update_message: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/canned/messages/update/id'
            },
        }
    }
}

export default new APIS;