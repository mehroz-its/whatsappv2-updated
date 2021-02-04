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
        }
    }
}

export default new APIS;