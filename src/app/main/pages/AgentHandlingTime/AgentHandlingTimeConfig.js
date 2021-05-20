import React from 'react';
import AgentHandlingTime from './Test';
const AgentHandlingTimeConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/aht',
			component: React.lazy(() => import('./AgentHandlingTime.js'))
		}
	]
};

export default AgentHandlingTimeConfig;
