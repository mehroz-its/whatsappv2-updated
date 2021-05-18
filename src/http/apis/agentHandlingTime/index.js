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
          
        }
    }
}

export default new APIS;