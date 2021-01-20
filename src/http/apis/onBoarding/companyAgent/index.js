class APIS {
    apis() {
        return {
            get: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/client/agents/:client_id'
            },
            get_paginated: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/client/agents-paginated'
            },
            update: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/users/update/:id'
            },
            update_partial: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/users/update-partial/:id'
            },
            create: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/users/create'
            },


            
            get_chatbot: {
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/get/autoreply/:id'
            },


            add_chatbot:{
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/create/autoreply'
            },
            update_chatbot:{
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/update/autoreply'
            },

            update_chatbot_attribute:{
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/update/attribute/autoreply'
            },


            get_self_chatbot:{
                
                headers: {
                    'xt-user-token': null
                },
                method: 'get',
                path: '/get/autoreply'
            },

            update_self_chatbot_attribute:{
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/update/attribute/self/autoreply'
            },
            add_self_chatbot:{
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/create/self/autoreply'
            },

            update_self_chatbot:{
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/update/self/autoreply'
            },
        }
    }
}

export default new APIS;