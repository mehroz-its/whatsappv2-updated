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
			component: React.lazy(() => import('./chat/ChatApp'))
		},
		{
			path: '/report/agent',
			component: React.lazy(() => import('./agent/AgentApp'))
		},
		{
			path: '/report/compaigns',
			component: React.lazy(() => import('./compaigns/CompaignsApp'))
		}
	]
};

export default ReportsAppConfig;
