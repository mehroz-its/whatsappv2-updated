import React from 'react';

const ChatAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/group-chat',
			component: React.lazy(() => import('./GroupChatApp'))
		}
	]
};

export default ChatAppConfig;
