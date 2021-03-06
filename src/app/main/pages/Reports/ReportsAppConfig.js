import React from 'react';

const ReportsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/report/chat',
			component: React.lazy(() => import('./Chat/ChatApp'))
		},
		{
			path: '/report/agent-report',
			component: React.lazy(() => import('./agent/AgentApp'))
		},
		{
			path: '/report/compaigns',
			component: React.lazy(() => import('./compaigns/CompaignsApp'))
		},
		{
			path: '/report/surveyReport',
			component: React.lazy(() => import('./surveyReport/SurveyReport'))
		},
		{
			path: '/report/chat-hourly',
			component: React.lazy(() => import('./ChatHourly/ChatHourly'))
		}
	]
};

export default ReportsAppConfig;
