import React from 'react';
import { Redirect } from 'react-router-dom';

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
