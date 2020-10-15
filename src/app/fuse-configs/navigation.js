module.exports = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'Navigation',
        type: 'group',
        icon: 'apps',
        children: [
           
            {
                id: 'dashboards',
                title: 'Intelligence',
                translate: 'Intelligence',
                type: 'item',
                icon: 'dashboard',
                url: '/dashboard',
                exact: true

            },
           
            

            {
                id: 'Chat',
                title: 'Chat',
                translate: 'Chat',
                type: 'collapse',
                icon: 'chat',
                // url: '/apps/groups/group',
                children: [
                    {
                        id: 'Conversation',
                        title: 'Conversation',
                        translate: 'Conversation',
                        type: 'item',
                        url: '/apps/chat',
                        exact: true

                        },
                        {
                            id: 'History',
                            title: 'History',
                            translate: 'History',
                            type: 'item',
                            url: '/apps/history',
                            exact: true

                    },
                ]
            },
          
            {
                id: 'Template',
                title: 'Template',
                translate: 'Template',
                type: 'collapse',
                icon: 'chrome_reader_mode',
                // url: '/apps/groups/group',
                children: [
                    {
                        id: 'Campaigns',
                        title: 'Campaigns',
                        translate: 'Campaigns',
                        type: 'item',
                        url: '/apps/campaign',
                        exact: true
                        // badge: {
                        // 	title: 25,
                        // 	bg: '#F44336',
                        // 	fg: '#FFFFFF'
                        // }
                    },
                    {
                        id: 'Template List',
                        title: 'Template List',
                        type: 'item',
                        translate: 'Template List',
                        url: '/apps/whatsapp-template',
                        exact: true
                    },

                ]
            },
          
            {
                id: 'Contact Book',
                title: 'Contact Book',
                translate: 'Contact Book',
                type: 'item',
                icon: 'contact_phone',
                url: '/apps/contacts/all',
                exact: true
            },
            {
                id: 'Reports',
                title: 'Reports',
                translate: 'Reports',
                type: 'collapse',
                icon: 'assessment',
                children: [
                    {
                        id: 'Chat',
                        title: 'Chat',
                        type: 'item',
                        url: '/report/chat',
                        exact: true
                    },
                    {
                        id: 'Agent',
                        title: 'Agent',
                        type: 'item',
                        url: '/report/agent-report',
                        exact: true
                    },
                    {
                        id: 'Agent_Conversation',
                        title: 'Ongoing Chats',
                        type: 'item',
                        url: '/apps/agent',
                        exact: true
                    },


                    ]
                },
                {
                    id: 'Settings',
                    title: 'Settings',
                    translate: 'Settings',
                    type: 'collapse',
                    icon: 'settings',
                    children: [
                        {
                            id: 'Canned Replies',
                            title: 'Canned Replies',
                            type: 'item',
                            url: '/apps/canned-messages',
                            exact: true,
                        },
                        {
                            id: 'Roles',
                            title: 'Roles',
                            type: 'item',
                            url: '/apps/roles',
                            exact: true
                        },
                        {
                            id: 'Permissions',
                            title: 'Permissions',
                            type: 'item',
                            url: '/apps/permissions',
                            exact: true
                        },
                        {
                            id: 'Users',
                            title: 'Users',
                            type: 'item',
                            url: '/apps/users',
                            exact: true
                        },



                ]
            },
            {
                id: 'companyprofile',
                title: 'Company Profile',
                translate: 'Business',
                type: 'item',
                icon: 'dashboard',
                url: '/apps/company-profile',
                exact: true

            },
            
           
        ]
    },
]