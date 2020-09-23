import React from 'react';
const TemplateConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/agent',
			component: React.lazy(() => import('./agent/Agent'))
		}
	]
};

export default TemplateConfig;
