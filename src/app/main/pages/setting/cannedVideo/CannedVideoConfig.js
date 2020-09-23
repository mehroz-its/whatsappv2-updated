import React from 'react';

const CannedVideoConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/canned-videos',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedVideoConfig;
