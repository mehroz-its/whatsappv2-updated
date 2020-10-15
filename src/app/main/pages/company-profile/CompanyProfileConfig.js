import React from 'react';
const CompanyProfileConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/company-forms',
            component: React.lazy(() => import('./customerForms/companyProfile.js'))
        },
    	{
			path: '/apps/company-profile',
			component: React.lazy(() => import('./customerAccounts/customerAccounts.js'))
        },
       
    	{
			path: '/apps/company-details',
			component: React.lazy(() => import('./customerAccountDetails/CustomerAccountDetails.js'))
        },
        {
			path: '/apps/company-details/Profile',
			component: React.lazy(() => import('./customerAccountDetails/SideNavigationPages/Profile/Index.js'))
        },
        {
			path: '/apps/company-details/Contact',
			component: React.lazy(() => import('./customerAccountDetails/SideNavigationPages/contact/Contact.js'))
        },
        {
			path: '/apps/company-details/configration',
			component: React.lazy(() => import('./customerAccountDetails/SideNavigationPages/configration/config.js'))
        },
        {
			path: '/apps/company-details/Agents',
			component: React.lazy(() => import('./customerAccountDetails/SideNavigationPages/agents/AgentTable.js'))
        },
    ]
};

export default CompanyProfileConfig;