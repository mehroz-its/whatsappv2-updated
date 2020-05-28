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
			path: '/report/chats',
			component: React.lazy(() => import('./Chat/ChatApp'))
		},
		{
			path: '/report/agent',
			component: React.lazy(() => import('./Chat/AgentApp'))
		},
		{
			path: '/report/compaigns',
			component: React.lazy(() => import('./Chat/CompaignsApp'))
		}
	]
};

export default ReportsAppConfig;
