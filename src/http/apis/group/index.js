class APIS {
    apis() {
        return {
            names: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/fetch/list/customer/names'
            },
            groups: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/fetch/list/agent/groups'
            },
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/list/wt_groups'
            },
            group_details: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/groups/info/id'
            },
            update_group_icon: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/groups/update/id'
            },
            create_group: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/group/create'
            },
            conversations: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/messages/groups/conversations/:group_id'
            },
            send_text: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/messages/group/send/text/:group_id',
            },
        }
    }
}

export default new APIS;