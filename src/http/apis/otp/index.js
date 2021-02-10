class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/otp/report'
            },
            statusChange: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/update/redeem/:id'
            },
            optReport: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/redeem/stats'
            },
        }
    }
}

export default new APIS;