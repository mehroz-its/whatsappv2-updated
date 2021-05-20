import React from 'react';
const ServiceLevelConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/serviceLevel',
			component: React.lazy(() => import('./ServiceLevel.js'))
		}
	]
};

export default ServiceLevelConfig;
