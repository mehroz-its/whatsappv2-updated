class APIS {
    apis() {
        return {
            clientAuth: {
                headers: {
                    'xt-api-key':
                        '704952ded8eba109c4f242c6796d1ba7d23f01eaa4ca9b6166c55506f497e828',
                    //'xt-api-key': '797526a6e491ec43bbe290a54193f25f5ea15f7514e84a853d8d501009b0ba11'
                },
                method: 'get',
                path: '/authenticate',
            },
            userAuth: {
                headers: {
                    'xt-client-token': null,
                },
                method: 'post',
                path: '/auth/user',
            },
            userLogout: {
                headers: {
                    'xt-user-token': null,
                },
                method: 'get',
                path: '/logout',
            },
            clientSettings: {
                headers: {
                    'xt-client-token': null,
                },
                method: 'get',
                path: '/client/settings'
            },
            online: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/agent/online'
            },
            offline: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/agent/offline'
            },
            audit_logs: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/activity/logs'
            },
            autoreply_handles: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/list/autoreply/handles',
            }
        }
    }
}

export default new APIS();
