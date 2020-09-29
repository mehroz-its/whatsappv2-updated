import React from 'react';

const ReportsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/dashboard',
			component: React.lazy(() => import('./DashboardApp'))
		},
		
	]
};

export default ReportsAppConfig;
