class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/conversation/aht'
            },
            serviceLevel: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/service/level'
            },
          
        }
    }
}

export default new APIS;