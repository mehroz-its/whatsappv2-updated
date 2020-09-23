import React from 'react';
const CampaignConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/block-list',
			component: React.lazy(() => import('./blocklist/BlockList.js'))
		}
	]
};

export default CampaignConfig;
