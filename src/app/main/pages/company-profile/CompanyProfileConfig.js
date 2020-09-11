import React from 'react';
import { Redirect } from 'react-router-dom';

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
			path: '/apps/company-detailsProfile',
			component: React.lazy(() => import('./customerAccountDetails/SideNavigationPages/Profile/Index.js'))
		},
        
    ]
};

export default CompanyProfileConfig;