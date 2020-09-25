class APIS {
    apis() {
        return {
            getCountries: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/fetch/countries'
            },
            submitForm: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/register'
            }
        }
    }
}

export default new APIS;