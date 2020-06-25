class APIS {
    apis() {
        return {
            upload: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/upload'
            },
            fetch: {
                headers: {
                    'Authorization': null
                },
                method: 'get',
            }
            
        }
    }
}

export default new APIS;