import React from 'react';
import { Redirect } from 'react-router-dom';

const CustomerAccountConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/company-profile',
			component: React.lazy(() => import('./customerAccounts.js'))
		},
		
	]
};

export default CustomerAccountConfig;
