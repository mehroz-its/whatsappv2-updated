import React from 'react';
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
