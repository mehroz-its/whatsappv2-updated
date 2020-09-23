import React from 'react';
const CampaignConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/canned-messages',
			component: React.lazy(() => import('./cannedmessage/Canned.js'))
		}
	]
};

export default CampaignConfig;
