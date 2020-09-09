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
			path: '/customer-account',
			component: React.lazy(() => import('./customerAccounts.js'))
		},
		
	]
};

export default CustomerAccountConfig;
