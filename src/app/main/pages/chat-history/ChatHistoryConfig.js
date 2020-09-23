import React from 'react';
const ChatHistoryConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/history',
			component: React.lazy(() => import('./ChatHistory'))
		}
	]
};

export default ChatHistoryConfig;
