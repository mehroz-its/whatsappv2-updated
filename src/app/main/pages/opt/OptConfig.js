import React from 'react';
const OptConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/opt',
			component: React.lazy(() => import('./Opt'))
		}
	]
};

export default OptConfig;
