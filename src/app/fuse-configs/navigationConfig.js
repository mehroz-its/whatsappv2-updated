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

} else {
}
let userAcl = localStorage.getItem('user_acl');

let CustomNavigation = []
if (userAcl !== null) {
    userAcl = JSON.parse(userAcl);
    const navigationConfig = [
        {
            id: 'applications',
            title: 'Applications',
            translate: 'Super Admin',
            type: 'group',
            icon: 'apps',
            children: [
                {
                    id: 'companyProfile',
                    title: 'Company Profile',
                    translate: 'Customers',
                    type: 'item',
                    icon: 'dashboard',
                    url: '/apps/company-profile',
                    exact: true

                },


            ]
        },

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
                // {
                //     id: 'Template',
                //     title: 'Template',
                //     translate: 'Template',
                //     type: 'collapse',
                //     icon: 'chrome_reader_mode',
                //     // url: '/apps/groups/group',
                //     children: [
                //         {
                //             id: 'Campaigns',
                //             title: 'Campaigns',
                //             translate: 'Campaigns',
                //             type: 'item',
                //             url: '/apps/campaign',
                //             exact: true
                //             // badge: {
                //             //  title: 25,
                //             //  bg: '#F44336',
                //             //  fg: '#FFFFFF'
                //             // }
                //         },
                //         {
                //             id: 'Template List',
                //             title: 'Template List',
                //             type: 'item',
                //             translate: 'Template List',
                //             url: '/apps/whatsapp-template',
                //             exact: true
                //         },

                //     ]
                // },
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
                }

            ]
        },

        // {
        //  id: 'applicationss',
        //  title: 'Applicationss',
        //  translate: 'Super Admins',
        //  type: 'group',
        //  icon: 'apps',
        //  children: [
        //      {
        //          id: 'companyProfile',
        //          title: 'Company Profile',
        //          translate: 'Company Profile',
        //          type: 'item',
        //          icon: 'dashboard',
        //          url: '/company-profile',
        //          exact: true

        //      },
        //      {
        //          id: 'companyProfilee',
        //          title: 'Company Profilee',
        //          translate: 'Company Profilee',
        //          type: 'item',
        //          icon: 'dashboard',
        //          url: '/company-profilee',
        //          exact: true

        //      },
        //  ]
        // },   
    ];
    let NewNav = navigationConfig
    // console.log("NAV =>", NewNav);
    if (userAcl !== null) {

        NewNav.map((item) => {
            if (item.children) {
                // console.log("ITEM  =>", item.children);
                var i;
                for (i = 0; i < item.children.length; i++) {
                    // console.log("item.children : ", item.children[i]);
                    if (item.children[i].url) {
                        if (!userAcl.hasOwnProperty([`FRONT:${item.children[i].url}`])) {
                            item.children.splice(i, item.children.length);
                        }
                    }
                    else {
                        if (item.children[i].children.length > 0) {
                            // console.log("item.children[i].children :", item.children[i].children);
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
    CustomNavigation = NewNav;
    // console.log("CustomNavigation : ", CustomNavigation);
    CustomNavigation.map((CustomNavigationitem, CustomNavigationii) => {
        if (CustomNavigationitem.children.length > 0) {
            CustomNavigationitem.children.map((CustomNavigationitemCh, CustomNavigationitemChInc) => {
                // console.log("CustomNavigationitemCh : ", CustomNavigationitemCh);
                if (CustomNavigationitemCh.children <= 0) {
                    CustomNavigationitem.children.splice(CustomNavigationitemChInc, 1);
                }
            })

        }
        else {
            CustomNavigation.splice(CustomNavigationitem, 1);
        }
    })

}

export default CustomNavigation;