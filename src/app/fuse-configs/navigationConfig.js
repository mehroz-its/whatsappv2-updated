import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import Alert from '@material-ui/lab/Alert';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

let user_token = localStorage.getItem('user_token')
if (user_token !== null) {
    var user_routes = []
    let userAcl = localStorage.getItem('user_acl');
    let _routes = JSON.parse(userAcl)
    _routes = Object.keys(_routes)
    _routes.map((i, v) => {
        let val = i.split('FRONT:')
        user_routes.push(val[1])
    })

    console.log("user_routes", user_routes)
} else {
    console.log("user_token null")

}
let userAcl = localStorage.getItem('user_acl');

if (userAcl !== null) userAcl = JSON.parse(userAcl);

const navigationConfig = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'BI Board',
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
];
let NewNav = navigationConfig
if (userAcl !== null) {
    let it = Object.keys(userAcl)
    var itv;
    NewNav.map((item, ii) => {
        if (item.children) {
            var i;
            for (i = 0; i < item.children.length; i++) {
                console.log("item.children : ", item.children[i]);
                if (item.children[i].url) {
                    if (!userAcl.hasOwnProperty([`FRONT:${item.children[i].url}`])) {
                        item.children.splice(i, item.children.length);
                    }
                }
                else {
                    if (item.children[i].children.length > 0) {
                        console.log("item.children[i].children :", item.children[i].children);
                        if (item.children[i].children.length > 0) {
                            item.children[i].children.map((child, childIndex) => {
                                if (child.url) {
                                    if (!userAcl.hasOwnProperty(`FRONT:${child.url}`)) {
                                        item.children[i].children.splice(childIndex, item.children[i].children.length);
                                    }
                                }
                            })
                        }

                    }

                }
            }

        }
    })
}
let uzair = NewNav;
console.log("uzair : ", uzair);
uzair.map((uzairitem, uzairii) => {
    if (uzairitem.children.length > 0) {
    uzairitem.children.map((uzairitemCh, uzairitemChInc) => {
        console.log("uzairitemCh : ", uzairitemCh);
        if (uzairitemCh.children <= 0) {
            uzairitem.children.splice(uzairitemChInc, 1);
        }
    })
    
    }
})
console.log("NewNav :", NewNav);

export default uzair;