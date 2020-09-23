import React from 'react';
const CampaignConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/whatsapp-templates',
			component: React.lazy(() => import('./whatsapptemplate/Template'))
		}
	]
};

export default CampaignConfig;
