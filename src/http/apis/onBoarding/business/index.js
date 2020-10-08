class APIS {
    apis() {
        return {
            get: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/backend/fetch/clients'
            }
        }
    }
}

export default new APIS;