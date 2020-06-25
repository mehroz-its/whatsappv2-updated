class APIS {
    apis() {
        return {
            listing: {
                headers: {
                    'xt-user-token': null
                },
                method: 'post',
                path: '/backend/fetch/list/conversation_templates'
            },
            create_template : {
                headers: {
                    'xt-user-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiIxIiwiYWN0b3IiOiIxIiwidGltZSI6MTU4MTc4MDQ3NjU1MSwiaWF0IjoxNTgxNzgwNDc2fQ.wyHnDSwtkPecdSVO_fdMw5F63VCcQ4A7ULoXWJlK_V0"
                },
                method: 'post',
                path: '/backend/conversation/templates/create'
            },
            update_template: {
                headers: {
                    'xt-user-token': null
                },
                method: 'put',
                path: '/backend/conversation/templates/update/id'
            },
           
        }
    }
}

export default new APIS;