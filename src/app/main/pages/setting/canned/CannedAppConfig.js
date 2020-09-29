import React from 'react';

const CannedAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/canned-messages',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedAppConfig;
