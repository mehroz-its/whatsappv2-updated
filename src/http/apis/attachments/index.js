class APIS {
    apis() {
        return {
            get: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/message/attachment/:attachment_id'
            }
        }
    }
}

export default new APIS;