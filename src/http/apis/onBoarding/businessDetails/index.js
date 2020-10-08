class APIS {
    apis() {
        return {
            get: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/backend/fetch/client/:client_id'
            },
         
        }
    }
}

export default new APIS;