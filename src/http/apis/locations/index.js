class APIS {
    apis() {
        return {
            get_countries: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/list/countries'
            },
            get_cities: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                // path: '/fetch/cities'
                path: '/backend/fetch/list/cities'
            },
            create_country: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/create/country'
            },
            update_country: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/update/country/id'
            },          
            create_city: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/create/city'
            },
            update_city: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/update/city/id'
            }
           
        }
    }
}

export default new APIS;