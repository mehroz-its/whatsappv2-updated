import React from 'react';

const CampaignConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/permissions',
			component: React.lazy(() => import('./Permission'))
		}
	]
};

export default CampaignConfig;
