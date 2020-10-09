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
            },
            updateSubject: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/client/update/subject'
            },
            getSubject: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/backend/fetch/subject/:client_id'
            }

        }
    }
}

export default new APIS;