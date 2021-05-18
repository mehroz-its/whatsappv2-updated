import React from 'react';
import AgentHandlingTime from './Test';
const AgentHandlingTimeConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/chat',
			component: React.lazy(() => import('./Test'))
		}
	]
};

export default AgentHandlingTimeConfig;
