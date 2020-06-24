class APIS {
    apis() {
        return {
            gettoken: {
                headers: {
                    'xt-client-token': null,
                },
                method: 'post',
                path: '/backend/send/email',
            },
            setpassword: {
                headers: {
                    'xt-client-token': null,
                },
                method: 'put',
                path: '/backend/password/reset',
            },
        };
    }
}

export default new APIS();
