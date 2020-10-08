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
            },
            updateProfile: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/client/update'
            }
        }
    }
}

export default new APIS;