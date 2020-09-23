import React from 'react';
const BlockAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/blocklist',
			component: React.lazy(() => import('./BlockContactApp'))
	}
	]
};

export default BlockAppConfig;
