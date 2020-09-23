import React from 'react';

const CannedTextConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
	
		{
			path: '/apps/canned-text',
			component: React.lazy(() => import('./Canned'))
	}
	]
};

export default CannedTextConfig;
