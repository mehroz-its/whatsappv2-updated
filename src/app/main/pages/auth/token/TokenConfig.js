import React from 'react';

const TokenConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/auth/token',
			component: React.lazy(() => import('./Token'))
		}
	]
};

export default TokenConfig;
