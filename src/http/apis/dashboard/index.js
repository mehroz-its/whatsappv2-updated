class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/info/boxes'
            },
            messagestate: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/message/stats'
            },
           
        }
    }
}

export default new APIS;